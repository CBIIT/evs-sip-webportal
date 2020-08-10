import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import ReduxDataDictionary from './pages/Search/DataDictionary';
import reducers from './pages/Search/reducers'
import $RefParser from "@apidevtools/json-schema-ref-parser";
import jsonData_sample from './pages/Search/schema_sample.json';
import _terms_yaml from './pages/Search/DataFiles/GDC/_terms.yaml';
import _definitions_yaml from './pages/Search/DataFiles/GDC/_definitions.yaml';
import program_yaml from './pages/Search/DataFiles/GDC/program.yaml';
import project_yaml from './pages/Search/DataFiles/GDC/project.yaml';
import case_yaml from './pages/Search/DataFiles/GDC/case.yaml';
import aggregated_somatic_mutation_yaml from './pages/Search/DataFiles/GDC/aggregated_somatic_mutation.yaml';
import aligned_reads_yaml from './pages/Search/DataFiles/GDC/aligned_reads.yaml';
import aligned_reads_index from './pages/Search/DataFiles/GDC/aligned_reads_index.yaml';
import aliquot_yaml from './pages/Search/DataFiles/GDC/aliquot.yaml';
import analyte_yaml from './pages/Search/DataFiles/GDC/analyte.yaml';
import archive_yaml from './pages/Search/DataFiles/GDC/archive.yaml';
import center_yaml from './pages/Search/DataFiles/GDC/center.yaml';
import clinical_yaml from './pages/Search/DataFiles/GDC/clinical.yaml';
import demographic_yaml from './pages/Search/DataFiles/GDC/demographic.yaml';
import diagnosis_yaml from './pages/Search/DataFiles/GDC/diagnosis.yaml';
import exposure_yaml from './pages/Search/DataFiles/GDC/exposure.yaml';
import sample_yaml from './pages/Search/DataFiles/GDC/sample.yaml';
import tissue_source_site_yaml from './pages/Search/DataFiles/GDC/tissue_source_site.yaml';
import axios from 'axios';
import yaml from 'js-yaml';

// you can change to use bento data in here
//import icdcModel from './bento_model_file.yaml';
//import icdcModelProps from './bento_model_properties.yaml'; 
import icdcModel from './pages/Search/icdc-model.yml';
import icdcModelProps from './pages/Search/icdc-model-props.yml'; 


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

async function loadGDCData() {
	
  var jsonData = {};
  let tmp = await axios(_terms_yaml);
  let tmpData = yaml.safeLoad(tmp.data);
  jsonData["_terms.yaml"] = tmpData;
  tmp = await axios(_definitions_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["_definitions.yaml"] = tmpData;
  tmp = await axios(program_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["program.yaml"] = tmpData;
  tmp = await axios(project_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["project.yaml"] = tmpData;
  
  tmp = await axios(case_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["case.yaml"] = tmpData;

  tmp = await axios(aggregated_somatic_mutation_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["aggregated_somatic_mutation.yaml"] = tmpData;

  tmp = await axios(aligned_reads_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["aligned_reads.yaml"] = tmpData;

  tmp = await axios(aligned_reads_index);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["aligned_reads.yaml"] = tmpData;

  tmp = await axios(aliquot_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["aliquot.yaml"] = tmpData;

  tmp = await axios(analyte_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["analyte.yaml"] = tmpData;

  tmp = await axios(archive_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["archive.yaml"] = tmpData;

  tmp = await axios(center_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["center.yaml"] = tmpData;

  tmp = await axios(clinical_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["clinical.yaml"] = tmpData;

  tmp = await axios(demographic_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["demographic.yaml"] = tmpData;

  tmp = await axios(diagnosis_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["diagnosis.yaml"] = tmpData;

  tmp = await axios(exposure_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["exposure.yaml"] = tmpData;

  tmp = await axios(sample_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["sample.yaml"] = tmpData;

  tmp = await axios(tissue_source_site_yaml);
  tmpData = yaml.safeLoad(tmp.data);
  jsonData["tissue_source_site.yaml"] = tmpData;

  //var defJson = yaml.load(_definitions_yaml);
  //jsonData["_definitions.yaml"] = defJson;
  //let fileJson = yaml.load(case_yaml);
  //jsonData["case.yaml"] = fileJson;
  return jsonData;
};

async function init() {
  const store = createStore(reducers);

  /*
  const icdcM = await axios(icdcModel);
  const icdcMData = yaml.safeLoad(icdcM.data);
  const icdcMP = await axios(icdcModelProps);
  const icdcMPData = yaml.safeLoad(icdcMP.data);

  const dataList={};
 
  for (let [key, value] of Object.entries(icdcMData.Nodes)) {
    //console.log(key);
    //console.log(value.Category);
    const item = {}
    item["$schema"] = "http://json-schema.org/draft-06/schema#";
    item["id"] = key;
    item["title"]=key;
    if("Category" in value){
      item["category"]=value.Category;
  }else{
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
    
    if (icdcMData.Nodes[key].Props != null ) {
     
      for(var i=0;i<icdcMData.Nodes[key].Props.length;i++){
        //console.log(icdcMData.Nodes[key].Props[i]);
        const nodeP=icdcMData.Nodes[key].Props[i];
        const propertiesItem={};
        for(var propertyName in icdcMPData.PropDefinitions){
          
          if(propertyName==nodeP){
            
            propertiesItem["description"]=icdcMPData.PropDefinitions[propertyName].Desc;
            propertiesItem["type"]=icdcMPData.PropDefinitions[propertyName].Type;
            propertiesItem["src"]=icdcMPData.PropDefinitions[propertyName].Src;
            
            if(icdcMPData.PropDefinitions[propertyName].Req==true){
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
    
    
    for (var propertyName in icdcMData.Relationships) {
      const linkItem={};
      //console.log(propertyName);
      //console.log(icdcMData.Relationships[propertyName]);
      //console.log(icdcMData.Relationships[propertyName].Ends);
      const label=propertyName;
      const multiplicity=icdcMData.Relationships[propertyName].Mul;
      const required=false;
      for(var i=0;i<icdcMData.Relationships[propertyName].Ends.length;i++){
        
        if(icdcMData.Relationships[propertyName].Ends[i].Src==key){
          const backref=icdcMData.Relationships[propertyName].Ends[i].Src;
          const name=icdcMData.Relationships[propertyName].Ends[i].Dst;
          const target=icdcMData.Relationships[propertyName].Ends[i].Dst;

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
 
  //console.log(newDict);
  const newDataList=dataList;
  console.log(newDataList);
  */

  //let schema =jsonData_sample;
  let schema = await loadGDCData();

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

  console.log(newDict);


  await Promise.all(
    [
      store.dispatch({
        type: 'RECEIVE_DICTIONARY',
        data: newDict
        //data: newDataList
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
