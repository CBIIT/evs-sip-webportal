import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { apiGetGDCDictionary, apiGetICDCDictionary, apiGetCTDCDictionary  } from './api';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './pages/Search/reducers'
import $RefParser from "@apidevtools/json-schema-ref-parser";

const version = {"commit":"913161064b02bcef024d072873e77c8c79cc1a68","dictionary":{"commit":"520a25999fd183f6c5b7ddef2980f3e839517da5","version":"0.2.1-9-g520a259"},"version":"4.0.0-44-g9131610"};

const findObjectWithRef = (obj, updateFn, root_key = '', level = 0) => {
  // iterate over the properties
  for (var propertyName in obj) {

    if ( level === 0 ) root_key = propertyName;

    if ( propertyName === '$ref' ) {
      obj['$ref'] = updateFn(obj['$ref'], root_key);
    }

    // any object that is not a simple value
    if (obj[propertyName] !== null && typeof obj[propertyName] === 'object') {
      // recurse into the object and write back the result to the object graph
      obj[propertyName] = findObjectWithRef(obj[propertyName], updateFn, root_key, (level + 1));
    }
  }
  
  return obj;
};

const generateICDCorCTDCData = (dc) => {
  const dcMData = dc.mData;
  const dcMPData = dc.mpData;

  const dataList={};
 
  for (let [key, value] of Object.entries(dcMData.Nodes)) {
    //console.log(key);
    //console.log(value.Category);
    const item = {}
    item["$schema"] = "http://json-schema.org/draft-06/schema#";
    item["id"] = key;
    item["title"]=key;
    if("Category" in value){
      item["category"]=value.Category;
    }
    else{
      item["category"]="Undefined";
    }
    
    item["program"]="*";
    item["project"]="*";
    item["additionalProperties"]=false;
    item["submittable"]=true;
    item["constraints"]=null;
    //item["links"]=[];
    
    item["type"]="object";
    const link=[];
    const properties={};
    const pRequired=[];
    
    if (dcMData.Nodes[key].Props != null ) {
     
      for(var i=0;i<dcMData.Nodes[key].Props.length;i++){
        //console.log(icdcMData.Nodes[key].Props[i]);
        const nodeP=dcMData.Nodes[key].Props[i];
        const propertiesItem={};
        for(var propertyName in dcMPData.PropDefinitions){
          
          if(propertyName==nodeP){
            
            propertiesItem["description"]=dcMPData.PropDefinitions[propertyName].Desc;
            propertiesItem["type"]=dcMPData.PropDefinitions[propertyName].Type;
            propertiesItem["src"]=dcMPData.PropDefinitions[propertyName].Src;
            
            if(dcMPData.PropDefinitions[propertyName].Req==true){
              pRequired.push(nodeP);
            }


          }
        }
        properties[nodeP]=propertiesItem;

      }

      item["properties"]=properties;
      item["required"]=pRequired;

    }else{
      item["properties"]={};
    }
    
    
    for (var propertyName in dcMData.Relationships) {
      const linkItem={};
      //console.log(propertyName);
      //console.log(icdcMData.Relationships[propertyName]);
      //console.log(icdcMData.Relationships[propertyName].Ends);
      const label=propertyName;
      const multiplicity=dcMData.Relationships[propertyName].Mul;
      const required=false;
      for(var i=0;i<dcMData.Relationships[propertyName].Ends.length;i++){
        
        if(dcMData.Relationships[propertyName].Ends[i].Src==key){
          const backref=dcMData.Relationships[propertyName].Ends[i].Src;
          const name=dcMData.Relationships[propertyName].Ends[i].Dst;
          const target=dcMData.Relationships[propertyName].Ends[i].Dst;

          linkItem["name"]=name;
          linkItem["backref"]=backref;
          linkItem["label"]=label;
          linkItem["target_type"]=target;
          linkItem["required"]=required;
          
          link.push(linkItem);
        }
      }
      
    }

    //console.log(link);
    item["links"]=link;

    dataList[key]=item;
  }
 
  return dataList;
}

async function init() {
  const store = createStore(reducers);

  /*
  
  console.log(newDataList);
  */

  //let schema =jsonData_sample;
  //let schema = await loadGDCData();
  let schema = await apiGetGDCDictionary();

  // Remove .yaml extension from keys 
  let dict = {};  
  for (let [key, value] of Object.entries(schema)) {
    dict[key.slice(0, -5)] = value;
    
  }
  
  /*for (let [key, value] of Object.entries(schema)) {
    dict[key] = value;
    
  }*/

  
 

  // Recursivly fix references
  dict = findObjectWithRef(dict, (refObj, rootKey)=> { // This halts for sub objects./...

  	let tmp = "";

    if ( Array.isArray(refObj)){
    	tmp = refObj[0];
    }
    else{
    	tmp = refObj;
    }

    if (tmp.includes('.yaml') ) {

      // ABS_FIX
      // "$ref": "_definitions.yaml#/ubiquitous_properties",
      // ->
      // "$ref": "#/_definitions/ubiquitous_properties",

      tmp = "#/" + tmp.replace('.yaml#', '');
     // console.log("ABS FIX -- " + rootKey + ": " + refObj);

    } else {

      // REL FIX
      // "$ref": "#/state"
      // ->
      // "$ref": "#/{_definitions aka root key}/state"
      
      tmp = '#/' + rootKey + '/' + tmp.replace('#/', '');
      //console.log("REL FIX -- " + rootKey + ": " + refObj);
    }


    return tmp;
  });

  // Append metaschema TODO?? Doesn't seem to matter anymore

  // This is a HACK FIX ME!!@!!!
  
  dict['_terms']['file_format'] = {description: 'wut'};


  let newDict = await $RefParser.dereference(dict, {
    continueOnError: false,            // Don't throw on the first error
    dereference: {
      circular: true                 // Don't allow circular $refs
    }
  });

  let icdc_data = await apiGetICDCDictionary();

  const newDataList_icdc = generateICDCorCTDCData(icdc_data);

  let ctdc_data = await apiGetCTDCDictionary();

  const newDataList_ctdc = generateICDCorCTDCData(ctdc_data);

  await Promise.all(
    [
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_GDC',
        data: newDict
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_ICDC',
        data: newDataList_icdc
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_CTDC',
        data: newDataList_ctdc
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_GDC_READONLY',
        data: newDict
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_ICDC_READONLY',
        data: newDataList_icdc
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_CTDC_READONLY',
        data: newDataList_ctdc
      }),
      store.dispatch({
        type: 'RECEIVE_VERSION_INFO',
        data: version
      })
    ],
  );

  ReactDOM.render(
    
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


init();


serviceWorker.unregister();
