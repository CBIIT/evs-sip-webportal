const cache = require('../../components/cache');
const config = require('../../config');
const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const $RefParser = require("@apidevtools/json-schema-ref-parser");

const folderPath = path.join(__dirname, '..', '..', 'data');
const dataFilesPath = path.join(__dirname, '..', '..', 'data_files');
const dataFilesDir = path.join(__dirname, '..', '..', 'data_files');

const readNCItDetails = () => {
    let content = fs.readFileSync(dataFilesDir + "/ncit_details.js").toString();
	content = content.replace(/}{/g, ",");
	return JSON.parse(content);
}

const readGDCValues = () => {
    let content = fs.readFileSync(dataFilesDir + "/gdc_values.js").toString();
	return JSON.parse(content);
}

const readConceptCode = () => {
    let content = fs.readFileSync(dataFilesDir + "/conceptCode.js").toString();
	return JSON.parse(content);
}

const readCDEData = () => {
    let content = fs.readFileSync(dataFilesDir + "/cdeData.js").toString();
	content = content.replace(/}{/g, ",");
	return JSON.parse(content);
}

const readCDEDataType = () => {
    let content = fs.readFileSync(dataFilesDir + "/cdeDataType.js").toString();
	content = content.replace(/}{/g, ",");
	return JSON.parse(content);
}

const readSynonyms = () => {
    let content = fs.readFileSync(dataFilesDir + "/synonyms.js").toString();
	content = content.replace(/}{/g, ",");
	return JSON.parse(content);
}

const readSynonymsCtcae = () => {
    let content = fs.readFileSync(dataFilesDir + "/synonyms_ctcae.js").toString();
    return content;
}

const readSynonymsNcit = () => {
    let content = fs.readFileSync(dataFilesDir +  "/synonyms_ncit.js").toString();
    return content;
}

const readGdcDictionaryVersion = () => {
    let content = fs.readFileSync(dataFilesDir +  "/VERSION").toString();
    return content;
}

const sortSynonyms = (synonyms) => {
    const mapped = { PT: 1, BR: 2, FB: 3, CN: 4, AB: 5, SY: 6, SN: 7, AD: 8, AQ: 9, AQS: 10 };
    synonyms.forEach((e, i) => {
        if (e.termSource !== 'NCI') synonyms.splice(i, 1);
    });
    synonyms.sort((a, b) => (mapped[a.termGroup] > mapped[b.termGroup]) ? 1 : (a.termGroup === b.termGroup) ? ((a.termName.toLowerCase() > b.termName.toLowerCase()) ? 1 : -1) : -1);
    return synonyms;
}

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

const generateGDCData = async function(schema) {
  let dict = {};  
  for (let [key, value] of Object.entries(schema)) {
    dict[key.slice(0, -5)] = value;
    
  }
  
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

  return newDict;
}

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

const getGraphicalGDCDictionary = async function() {
    let result = cache.getValue("gdc_dict");
    if(result == undefined){
        let jsonData = {};
        var termsJson = yaml.load(folderPath + '/_terms.yaml');
        jsonData["_terms.yaml"] = termsJson;
        var defJson = yaml.load(folderPath + '/_definitions.yaml');
        jsonData["_definitions.yaml"] = defJson;
        // let bulkBody = [];
        fs.readdirSync(folderPath).forEach(file => {
            if (file.indexOf('_') !== 0) {
              let fileJson = yaml.load(folderPath + '/' + file);
              jsonData[file] = fileJson;
            }
        });
        result = await generateGDCData(jsonData);
        cache.setValue("gdc_dict", result, config.item_ttl);
    }

    return result;
}

const getGraphicalICDCDictionary = () => {

    let result = cache.getValue("icdc_dict");
    if(result == undefined){
        let jsonData = {};
        var mpJson = yaml.load(dataFilesPath + '/ICDC/icdc-model-props.yml');
        jsonData.mpData = mpJson;
        var mJson = yaml.load(dataFilesPath + '/ICDC/icdc-model.yml');
        jsonData.mData = mJson;
        result = generateICDCorCTDCData(jsonData);
        cache.setValue("icdc_dict", result, config.item_ttl);
    }
    return result;
}

const getGraphicalCTDCDictionary = () => {
    
    let result = cache.getValue("ctdc_dict");
    if(result == undefined){
        let jsonData = {};
        var mpJson = yaml.load(dataFilesPath + '/CTDC/ctdc_model_properties_file.yaml');
        jsonData.mpData = mpJson;
        var mJson = yaml.load(dataFilesPath + '/CTDC/ctdc_model_file.yaml');
        jsonData.mData = mJson;
        result = generateICDCorCTDCData(jsonData);
        cache.setValue("ctdc_dict", result, config.item_ttl);
    }
    return result;
}

module.exports = {
    readNCItDetails,
    readGDCValues,
    readConceptCode,
    readCDEData,
    readSynonyms,
    readCDEDataType,
    readSynonymsCtcae,
    readSynonymsNcit,
    readGdcDictionaryVersion,
    sortSynonyms,
    getGraphicalGDCDictionary,
    getGraphicalICDCDictionary,
    getGraphicalCTDCDictionary
};
