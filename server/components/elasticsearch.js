/**
 * Client for elasticsearch
 */
const fs = require('fs');
const path = require('path');
const elasticsearch = require('elasticsearch');
const yaml = require('yamljs');
const config = require('../config');
const config_dev = require('../config/dev');
const logger = require('./logger');
const caDSR = require('./caDSR');
const cache = require('./cache');
const extend = require('util')._extend;
const _ = require('lodash');
const gdc_searchable_nodes = require('../config').gdc_searchable_nodes;
const drugs_properties = require('../config').drugs_properties;
const shared = require('../service/search/shared');
const folderPath = path.join(__dirname, '..', 'data_files','GDC', 'model');
var allTerm = {};
var icdo_mapping = shared.getICDOMapping();
var gdc_values = {};
var allProperties = [];

var esClient = new elasticsearch.Client({
  host: config_dev.elasticsearch.host,
  log: config_dev.elasticsearch.log,
  requestTimeout: config_dev.elasticsearch.timeout
});

const helper_gdc = (fileJson, conceptCode, syns) => {
  let properties = fileJson.properties;

  for (var prop in properties) {
    let entry = {};
    let p = {};
    let entryRaw = properties[prop];

    p.source = "gdc";
    p.category = fileJson.category;
    p.node = fileJson.id;
    p.node_desc = fileJson.description;
    p.prop = prop;
    p.prop_desc = entryRaw.description;
    p.id = p.prop + "/" + p.node + "/" + p.category;
    p.type = entryRaw.type;

    entry.enum = extend([], entryRaw.enum);
    entry.enumDef = entryRaw.enumDef? entryRaw.enumDef : [];
    entry.termDef = extend({}, entryRaw.termDef);

    if (entry.termDef !== undefined && entry.termDef.cde_id !== undefined && entry.termDef.cde_id !== null) {
      entry.termDef.cde_id = '' + entry.termDef.cde_id;
      if (entry.termDef.source === 'caDSR') {
        p.cde = {};
        p.cde.id = entry.termDef.cde_id;
        //p.cde.v = entry.termDef.cde_version;
        p.cde.url = entry.termDef.term_url;
        p.cde.src = 'CDE ID';
      }
      else if(entry.termDef.source === 'NCIt'){
        p.cde = {};
        p.cde.id = entry.termDef.cde_id;
        //p.cde.v = entry.termDef.cde_version;
        p.cde.url = entry.termDef.term_url;
        p.cde.src = 'NCIt';
      }
    }

    //generate p.enum, need to consolidate values in entry.enum, conceptCode and gdc_values
    //p.enum should have the following format:
    //enum:[
    //  {
    //    n: "Abdomen, NOS",
    //    icdo: {
    //        c: "C76.2", 
    //        have: ["C76", "C76.2"],
    //        s: [
    //          {n: "Abdomen, NOS", t: "PT"},
    //          {n: "Abdominal wall, NOS", t: "RT"},
    //          ...
    //        ]
    //      },
    //    ncit: [
    //      {
    //        c: "C12664", 
    //        s: [
    //          {n: "ABDOMINAL CAVITY", t: "PT", src: "CDISC"},
    //          ...
    //        ]
    //      },
    //      ...
    //    ]
    //  },
    //  ...
    //]
    let values = [];
    let values_ncit_mapping = {};
    let values_icdo_mapping = {};
    // 1. work on entry.enum and entry.enumDef
    entry.enum.forEach(v => {
      values.push(v);
      values_ncit_mapping[v.toLowerCase()] = [];
    });

    for(let key in entry.enumDef){
      let obj = entry.enumDef[key];
      let v = key.toLowerCase();
      if(!(v in values_ncit_mapping)){
        values.push(key);
        values_ncit_mapping[v] = [];
      }
      values_ncit_mapping[v].push(obj.termDef.term_id);
    }

    // 2. work on conceptCode to further combind the ncit code
    let prop_full_name = p.category + '.' + p.node + '.' + p.prop;
    if (prop_full_name in conceptCode) {
      let cc = conceptCode[prop_full_name];
      // add additionalProperties
      for (var s in cc) {
        let v = s.toLowerCase();
        if(!(v in values_ncit_mapping)){
          values.push(s);
          values_ncit_mapping[v] = [];
        }
        
        if (Array.isArray(cc[s])) {
          cc[s].forEach(code => {
            if(values_ncit_mapping[v].indexOf(code) == -1){
              values_ncit_mapping[v].push(code);
            }
          });
        } 
        else {
          if(values_ncit_mapping[v].indexOf(cc[s]) == -1){
            values_ncit_mapping[v].push(cc[s]);
          }
        }
      }
    }

    // 3. work on gdc_values to pull out icd-o-3 code and ncit code for all the values saved in the previous 3 steps
    if(prop_full_name in gdc_values){
      let enums = [];
      let obj = gdc_values[prop_full_name];
      obj.forEach(v => {
        let pv = v.nm.toLowerCase();
        let icdo = v.i_c;
        if(pv in values_ncit_mapping){
          values_icdo_mapping[pv] = icdo;
          icdo_mapping[icdo].ncits.forEach(n => {
            if(values_ncit_mapping[pv].indexOf(n) == -1){
              values_ncit_mapping[pv].push(n);
            }
          });
        }
      });
    }

    //generate p.enum
    if(values.length > 0){
      p.enum = [];
      values.forEach(function(v){
        let tmp = {};
        tmp.n = v;
        let v_lowcase = v.toLowerCase();
        if(v_lowcase in values_icdo_mapping){
          tmp.icdo = {};
          tmp.icdo.c = values_icdo_mapping[v_lowcase];
          tmp.icdo.have = shared.generateICDOHaveWords(tmp.icdo.c),
          tmp.icdo.s = icdo_mapping[tmp.icdo.c].s;
        }
        if(v_lowcase in values_ncit_mapping){
          tmp.ncit = [];
          let ncits = values_ncit_mapping[v_lowcase];
          ncits.forEach(n => {
            if(n == undefined || n == '') return;
            let dict = {};
            dict.c = n;
            let synonyms = (n !== '' && syns[n] ? syns[n].synonyms : []);
            if(synonyms.length > 0){
              dict.s = [];
              synonyms.forEach(s => {
                dict.s.push({
                  n: s.termName,
                  t: s.termGroup,
                  src: s.termSource
                });
              });
            }
            tmp.ncit.push(dict);
          });
        }
        p.enum.push(tmp);
      });
    }

    //building typeahead index, need to collect from properties, CDE ID, values, ICDO3 codes and NCIt codes
    //collect properties
    if (p.prop in allTerm) {
      // if exist, then check if have the same type
      let t = allTerm[p.prop];
      if (t.indexOf('property') === -1) {
        t.push('property');
      }
    } else {
      let t = [];
      t.push('property');
      allTerm[p.prop] = t;
    }

    // collect CDE ID
    if (p.cde) {
      let em = p.cde.id.toString().trim().toLowerCase();
      if (em in allTerm) {
        // if exist, then check if have the same type
        let t = allTerm[em];
        if(p.cde.src == 'CDE ID'){
          if (t.indexOf('cde id') === -1) {
            t.push('cde id');
          }
        }
        else if(p.cde.src == 'NCIt'){
          if (t.indexOf('ncit code') === -1) {
            t.push('ncit code');
          }
        }
        
      } else {
        let t = [];
        if(p.cde.src == 'NCIt'){
          t.push('ncit code');
        }
        else{
          t.push('cde id');
        }
        allTerm[em] = t;
      }
    }

    //collect values
    if(values.length > 0){
      values.forEach(function(v){
        let em = v.toString().trim().toLowerCase();
        if (em in allTerm) {
          // if exist, then check if have the same type
          let t = allTerm[em];
          if (t.indexOf("value") == -1) {
            t.push("value");
          }
        } else {
          let t = [];
          t.push("value");
          allTerm[em] = t;
        }
      });
    }

    //collect ICDO3 codes
    if (Object.keys(values_icdo_mapping).length > 0) {
      for (let key in values_icdo_mapping) {
        let em = values_icdo_mapping[key].toString().trim().toLowerCase();
        if (em in allTerm) {
          // if exist, then check if have the same type
          let t = allTerm[em];
          if (t.indexOf("icdo3 code") == -1) {
            t.push("icdo3 code");
          }
        } else {
          let t = [];
          t.push("icdo3 code");
          allTerm[em] = t;
        }
      }
    }

    //collect NCIt codes
    if (Object.keys(values_ncit_mapping).length > 0) {
      for (let key in values_ncit_mapping) {
        let ncits = values_ncit_mapping[key];
        ncits.forEach(n => {
          if(n == undefined || n == '') return;
          let em = n.toString().trim().toLowerCase();
          if (em in allTerm) {
            //if exist, then check if have the same type
            let t = allTerm[em];
            if (t.indexOf("ncit code") == -1) {
              t.push("ncit code");
            }
          } else {
            let t = [];
            t.push("ncit code");
            allTerm[em] = t;
          }
        });
      }
    }



    // property type
    if (p.enum !== undefined && p.enum.length > 0) {
      p.type = 'enum';
    }
    allProperties.push(p);
  }

}

const helper_icdc = (dict, icdc_mapping, syns) => {
  
    //generate p.enum, need to consolidate values in entry.enum, conceptCode and gdc_values
    //p.enum should have the following format:
    //enum:[
    //  {
    //    n: "Abdomen, NOS",
    //    icdo: {
    //        c: "C76.2", 
    //        have: ["C76", "C76.2"],
    //        s: [
    //          {n: "Abdomen, NOS", t: "PT"},
    //          {n: "Abdominal wall, NOS", t: "RT"},
    //          ...
    //        ]
    //      },
    //    ncit: [
    //      {
    //        c: "C12664", 
    //        s: [
    //          {n: "ABDOMINAL CAVITY", t: "PT", src: "CDISC"},
    //          ...
    //        ]
    //      },
    //      ...
    //    ]
    //  },
    //  ...
    //]
}

const helper_ctdc = (dict, ctdc_mapping, syns) => {
  let unloaded_ncits = [];
  for(let node_name in dict){
    let properties = dict[node_name].properties;

    let mapping_dict = {};
    if(ctdc_mapping[node_name] && ctdc_mapping[node_name].properties){
      ctdc_mapping[node_name].properties.forEach(prop => {
        mapping_dict[prop.p_name] = prop;
      });
    }
    

    for (var prop in properties) {
      let entry = {};
      let p = {};
      let values = [];
      let ncits = [];
      let entryRaw = properties[prop];
      let mappingEntryRaw = mapping_dict[prop];

      p.source = "ctdc";
      p.category = dict[node_name].category;
      p.node = dict[node_name].id;
      p.node_desc = dict[node_name].description || "";
      p.prop = prop;
      p.prop_desc = entryRaw.description;
      p.id = p.prop + "/" + p.node + "/" + p.category;

      if(["string", "number", "integer", "boolean"].indexOf(entryRaw.type) > -1){
        p.type = entryRaw.type;
      }
      else if(Array.isArray(entryRaw.type)){
        //p.enum should have the following format:
        //enum:[
        //  {
        //    n: "Abdomen, NOS",
        //    icdo: {
        //        c: "C76.2", 
        //        have: ["C76", "C76.2"],
        //        s: [
        //          {n: "Abdomen, NOS", t: "PT"},
        //          {n: "Abdominal wall, NOS", t: "RT"},
        //          ...
        //        ]
        //      },
        //    ncit: [
        //      {
        //        c: "C12664", 
        //        s: [
        //          {n: "ABDOMINAL CAVITY", t: "PT", src: "CDISC"},
        //          ...
        //        ]
        //      },
        //      ...
        //    ]
        //  },
        //  ...
        //]
        p.type = "enum";
        //add values and ncit codes
        p.enum = [];
        let values_dict = {};
        if(mappingEntryRaw && mappingEntryRaw.values){
          mappingEntryRaw.values.forEach(entry => {
            values_dict[entry.v_name.toLowerCase()] = entry;
          });
        }
        
        entryRaw.type.forEach(v => {
          let tmp = {};
          tmp.n = v;
          let v_lowcase = v.toLowerCase();
          tmp.ncit = [];
          if(values_dict[v_lowcase] && values_dict[v_lowcase].v_n_code && values_dict[v_lowcase].v_n_code != ""){
            let dict = {};
            dict.c = values_dict[v_lowcase].v_n_code.toLowerCase();
            let synonyms = (syns[values_dict[v_lowcase].v_n_code] ? syns[values_dict[v_lowcase].v_n_code].synonyms : []);
            if(syns[values_dict[v_lowcase].v_n_code] == undefined){
              console.log("Don't have the ncit data for:" + dict.c);
              unloaded_ncits.push(dict.c.toUpperCase());
            }
            if(synonyms.length > 0){
              dict.s = [];
              synonyms.forEach(s => {
                dict.s.push({
                  n: s.termName,
                  t: s.termGroup,
                  src: s.termSource
                });
              });
            }
            tmp.ncit.push(dict);
            ncits.push(dict.c);
          }
          p.enum.push(tmp);
          values.push(v_lowcase);
        });
        values = _.uniq(values.concat(Object.keys(values_dict)));
        ncits = _.uniq(ncits);
      }
      else{
        p.type = "object";
      }

      if(mappingEntryRaw && mappingEntryRaw.p_n_code){
        p.cde = {};
        p.cde.id = mappingEntryRaw.p_n_code;
        //p.cde.v = entry.termDef.cde_version;
        p.cde.url = "https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=" + p.cde.id;
        p.cde.src = 'NCIt';
      }

      //building typeahead index, need to collect from properties, CDE ID, values, NCIt codes
      //collect properties
      if (p.prop in allTerm) {
        // if exist, then check if have the same type
        let t = allTerm[p.prop];
        if (t.indexOf('property') === -1) {
          t.push('property');
        }
      } else {
        let t = [];
        t.push('property');
        allTerm[p.prop] = t;
      }

      //collect values
      if(values.length > 0){
        values.forEach(function(em){
          if (em in allTerm) {
            // if exist, then check if have the same type
            let t = allTerm[em];
            if (t.indexOf("value") == -1) {
              t.push("value");
            }
          } else {
            let t = [];
            t.push("value");
            allTerm[em] = t;
          }
        });
      }

      //collect NCIt codes
      if (ncits.length > 0) {
          ncits.forEach(em => {
            if(em == undefined || em == '') return;
            if (em in allTerm) {
              //if exist, then check if have the same type
              let t = allTerm[em];
              if (t.indexOf("ncit code") == -1) {
                t.push("ncit code");
              }
            } else {
              let t = [];
              t.push("ncit code");
              allTerm[em] = t;
            }
          });
      }

      allProperties.push(p);
    }
  }
  cache.setValue("unloaded_ncits", unloaded_ncits, config.item_ttl);
}

const bulkIndex = async function(next){

  let ccode = shared.readConceptCode();
  gdc_values = shared.readGDCValues();
  let syns = shared.readNCItDetails();


  //collect gdc data
  let jsonData = await shared.getGraphicalGDCDictionary();

  for(let node in jsonData){
    if(node !== '_terms' || node !== '_definitions' ){
      helper_gdc(jsonData[node], ccode, syns);
    }
  }

  //collect ICDC data

  let icdcData = shared.getGraphicalICDCDictionary();
  let icdc_mapping = shared.readICDCMapping();
  helper_icdc(icdcData, icdc_mapping, syns);

  //collect CTDC data

  let ctdcData = shared.getGraphicalCTDCDictionary();
  let ctdc_mapping = shared.readCTDCMapping();
  helper_ctdc(ctdcData, ctdc_mapping, syns);

  // build suggestion index
  let suggestionBody = [];

  for (var term in allTerm) {
    let doc = {};
    doc.id = term.toString();
    if(doc.id != ''){
      doc.type = allTerm[term];
      suggestionBody.push({
        index: {
          _index: config.suggestionName,
          _type: '_doc',
          _id: doc.id
        }
      });
      suggestionBody.push(doc);
    }
  }



  //build property index
  let propertyBody = [];

  allProperties.forEach(ap => {
    if (ap.cde && ap.prop_desc) { // ADD CDE ID to all property description.
      ap.prop_desc = ap.prop_desc + " (" + ap.cde.src + " - " + ap.cde.id + ")"
    }
    let doc = extend(ap, {});
    doc.id = ap.prop + "/" + ap.node + "/" + ap.category + "/" + ap.source;
    propertyBody.push({
      index: {
        _index: config.index_p,
        _type: '_doc',
        _id: doc.id
      }
    });
    propertyBody.push(doc);
  });

  esClient.bulk({body: propertyBody}, (err_p, data_p) => {
    if (err_p) {
      return next(err_p);
    }
    let errorCount_p = 0;
    data_p.items.forEach(item => {
      if (item.index && item.index.error) {
        logger.error(++errorCount_p, item.index.error);
      }
    });
    esClient.bulk({body: suggestionBody}, (err_s, data_s) => {
      if (err_s) {
        return next(err_s);
      }
      let errorCount_s = 0;
      data_s.items.forEach(itm => {
        if (itm.index && itm.index.error) {
          logger.error(++errorCount_s, itm.index.error);
        }
      });
      next({
        property_indexed: (propertyBody.length - errorCount_p),
        property_total: propertyBody.length,
        suggestion_indexed: (suggestionBody.length - errorCount_s),
        suggestion_total: suggestionBody.length
      });
    });
  });
}
exports.bulkIndex = bulkIndex;

const query = (index, dsl, highlight, next) => {
  var body = {
    size: 10000000,
    from: 0
  };
  body.query = dsl;
  if (highlight) {
    body.highlight = highlight;
  }
  body.sort = [{
    "category": "asc"
  }, {
    "node": "asc"
  }];
  esClient.search({index: index, body: body}, (err, data) => {
    if (err) {
      logger.error(err);
      next(err);
    } else {
      next(data);
    }
  });
}

exports.query = query;

const suggest = (index, suggest, next) => {
  let body = {};
  body.suggest = suggest;
  esClient.search({index: index, "_source": true, body: body}, (err, data) => {
    if (err) {
      logger.error(err);
      next(err);
    } else {
      next(data);
    }
  });
}

exports.suggest = suggest;

const createIndexes = (params, next) => {
  esClient.indices.create(params[0], (err_2, result_2) => {
    if (err_2) {
      logger.error(err_2);
      next(err_2);
    } else {
      esClient.indices.create(params[1], (err_3, result_3) => {
        if (err_3) {
          logger.error(err_3);
          next(err_3);
        } else {
          logger.debug("have built property and suggestion indexes.");
          next(result_3);
        }
      });
    }
  });
}

exports.createIndexes = createIndexes;
