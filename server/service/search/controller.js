const elastic = require('../../components/elasticsearch');
const handleError = require('../../components/handleError');
const logger = require('../../components/logger');
const cache = require('../../components/cache');
const config = require('../../config');
const readXlsxFile = require('read-excel-file/node');
const https = require('https');
const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const excel = require('node-excel-export');
const _ = require('lodash');
const shared = require('./shared');
const {
  performance
} = require('perf_hooks');
// const git = require('nodegit');
const dataFilesPath = path.join(__dirname, '..', '..', 'data_files');
var cdeData = {};
var gdcData = {};
var syns = {};

const indexing = (req, res) => {
	let configs = [];
	//config property index
	let config_property = {};
	config_property.index = config.index_p;
	/*
	config_property.body = {
		"settings": {
			"number_of_shards": 10, 
			"max_inner_result_window": 10000,
			"max_result_window": 10000,
			"analysis": {
				"analyzer": {
					"case_insensitive": {
						"tokenizer": "keyword",
						"filter": ["lowercase", "whitespace_remove"]
					},
					"my_standard": {
						"tokenizer": "standard",
						"char_filter": ["my_filter"],
						"filter": ["lowercase","whitespace_remove"]
					},
					"my_ngram": {
						"tokenizer": "ngram_tokenizer",
						"char_filter": ["my_filter"],
						"filter": ["lowercase","whitespace_remove"]
					}
				},
				"char_filter": {
					"my_filter": {
						"type": "mapping",
						"mappings": ["_=>-"]
					}
				},
				"filter": {
					"whitespace_remove": {
						"type": "pattern_replace",
						"pattern": "[_-]",
						"replacement": " "
					}
				},
				"tokenizer": {
					"ngram_tokenizer": {
						"type": "nGram",
						"min_gram": "2",
						"token_chars": ["letter", "digit", "symbol"]
					}
				}
			}
		},
		"mappings": {
			"properties": {
				"id": {
					"type": "keyword"
				},
				"source":{
					"type": "keyword"
				},
				"category": {
					"type": "keyword"
				},
				"node": {
					"type": "keyword"
				},
				"prop": {
					"type": "text",
					"fields": {
						"have": {
							"type": "text",
							"analyzer": "my_standard"
						}
					},
					"analyzer": "case_insensitive"
				},
				"enum":{
					"type": "nested",
					"properties": {
						"n": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_standard"
								}
							},
							"analyzer": "case_insensitive"
						},
						"ncit.s.n": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_standard"
								}
							},
							"analyzer": "case_insensitive"
						},
						"ncit.c": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_standard"
								}
							},
							"analyzer": "case_insensitive"
						},
						"icdo":{
							"properties": {
								"c": {
									"type": "text",
									"analyzer": "case_insensitive"
								},
								"have": {
									"type": "text",
									"analyzer": "my_standard"
								}
							}
						}
					}
				},
				"cde.id": {
					"type": "text",
					"analyzer": "case_insensitive"
				}
			}
		}
	};
	*/
	config_property.body = {
		"settings": {
			"number_of_shards": 10, 
			"max_inner_result_window": 10000,
			"max_result_window": 10000,
			"analysis": {
				"analyzer": {
					"case_insensitive": {
						"tokenizer": "keyword",
						"filter": ["lowercase", "whitespace_remove"]
					},
					"my_standard": {
						"tokenizer": "standard",
						"char_filter": ["my_filter"],
						"filter": ["lowercase","whitespace_remove"]
					},
					"my_whitespace": {
						"tokenizer": "whitespace",
						"char_filter": ["my_filter"],
						"filter": ["lowercase","whitespace_remove"]
					}
				},
				"char_filter": {
					"my_filter": {
						"type": "mapping",
						"mappings": ["_=>-"]
					}
				},
				"filter": {
					"whitespace_remove": {
						"type": "pattern_replace",
						"pattern": "[_-]",
						"replacement": " "
					}
				}
			}
		},
		"mappings": {
			"properties": {
				"id": {
					"type": "keyword"
				},
				"source":{
					"type": "keyword"
				},
				"category": {
					"type": "keyword"
				},
				"node":{
					"type": "nested",
					"properties": {
						"n": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							},
							"analyzer": "case_insensitive"
						},
						"d": {
							"type": "text",
							"analyzer": "my_whitespace"
						},
						"ncit.c": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							},
							"analyzer": "case_insensitive"
						},
						"ncit.s.n": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							},
							"analyzer": "case_insensitive"
						}
					}
				},
				"prop":{
					"type": "nested",
					"properties": {
						"n": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							},
							"analyzer": "case_insensitive"
						},
						"d": {
							"type": "text",
							"analyzer": "my_whitespace"
						},
						"ncit.c": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							},
							"analyzer": "case_insensitive"
						},
						"ncit.s.n": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							},
							"analyzer": "case_insensitive"
						},
						"cde":{
							"properties": {
								"c": {
									"type": "text",
									"analyzer": "case_insensitive"
								}
							}
						}
					}
				},
				"enum":{
					"type": "nested",
					"properties": {
						"n": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							},
							"analyzer": "case_insensitive"
						},
						"ncit.s.n": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							},
							"analyzer": "case_insensitive"
						},
						"ncit.c": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							},
							"analyzer": "case_insensitive"
						},
						"icdo":{
							"properties": {
								"c": {
									"type": "text",
									"analyzer": "case_insensitive"
								},
								"have": {
									"type": "text",
									"analyzer": "my_whitespace"
								}
							}
						}
					}
				}
			}
		}
	};
	configs.push(config_property);
	//config suggestion index
	let config_suggestion = {};
	config_suggestion.index = config.suggestionName;
	config_suggestion.body = {
		"mappings": {
			"properties": {
				"id": {
					"type": "completion",
					"max_input_length": 100,
					"analyzer": "standard",
					"search_analyzer": "standard",
					"preserve_separators": false
				}
			}
		}
	};
	configs.push(config_suggestion);
	elastic.createIndexes(configs, result => {
		if (result.acknowledged === undefined) {
			return handleError.error(res, result);
		}
		elastic.bulkIndex(data => {
			if (data.property_indexed === undefined) {
				return handleError.error(res, data);
			}
			return res.status(200).json(data);
		});
	});
};

const suggestion = (req, res) => {
  let term = req.query.keyword;
  let suggest = {
    "term_suggest": {
      "prefix": term,
      "completion": {
        "field": "id",
        "size": config.suggestion_size
      }
    }
  };
  elastic.suggest(config.suggestionName, suggest, result => {
    if (result.suggest === undefined) {
      return handleError.error(res, result);
    }
    let dt = result.suggest.term_suggest;
    let data = [];
    dt[0].options.forEach(opt => {
      data.push(opt._source);
    });
    res.json(data);
  })
};

const searchP = (req, res) => {
	//let keyword = req.query.keyword.trim().replace(/\+/g, "\\+").replace(/-/g, "\\-").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
	let keyword = req.query.keyword.trim();
	
	let option = {};
	if(req.query.options){
		option.match = req.query.options.indexOf("exact") !== -1 ? "exact" : "partial";
		option.syn = req.query.options.indexOf('syn') !== -1 ? true : false;
		option.n_syn = req.query.options.indexOf('n_syn') !== -1 ? true : false;
		option.p_syn = req.query.options.indexOf('p_syn') !== -1 ? true : false;
		option.desc = req.query.options.indexOf('desc') !== -1 ? true : false;
		option.sources = req.query.sources? req.query.sources.split(',') : [];
	}
	else{
		option = {
			match: "partial",
			syn: false,
			n_syn: false,
			p_syn: false,
			desc: false
		};
		option.sources = [];
	}
	if (keyword.trim() === '') {
		res.json([]);
	} else {
		let query = shared.generateQuery(keyword, option);
		let highlight = shared.generateHighlight();
		//console.log(JSON.stringify(query));
		elastic.query(config.index_p, query, "enum", {}, result => {
			if (result.hits === undefined) {
				res.json({total: 0, returnList: [], timedOut: true});
				//return handleError.error(res, result);
			}
			else{
				let total = result.hits.total.value;
				let data = result.hits.hits;
				data.forEach(entry => {
					delete entry.sort;
					delete entry._index;
					delete entry._score;
					delete entry._type;
					delete entry._id;
				});
				res.json({total: total, returnList: data, timedOut: false});
			}
			
		});
	}
};

const getGDCData = (req, res) => {
	let uid = req.query.id;
	let query = {};
	query.terms = {};
	query.terms.id = [];
	query.terms.id.push(uid);
	elastic.query(config.index_p, query, "", null, result => {
		if (result.hits === undefined) {
			return handleError.error(res, result);
		}
		let data = result.hits.hits;
		res.json(data);
	});
};

const getGraphicalGDCDictionary = async function(req, res) {
	let jsonData = await shared.getGraphicalGDCDictionary();
	res.json(jsonData);
}

const getGraphicalICDCDictionary = (req, res) => {

	let jsonData = shared.getGraphicalICDCDictionary();
	res.json(jsonData);
}

const getGraphicalCTDCDictionary = (req, res) => {
	
	let jsonData = shared.getGraphicalCTDCDictionary();
	res.json(jsonData);
}

const getValuesForGraphicalView = async function(req, res) {
	let uid = req.query.id;
	let result = cache.getValue("values:"+uid);
	if(result == undefined){
		let query = {};
		query.terms = {};
		query.terms.id = [];
		query.terms.id.push(uid);
		elastic.query(config.index_p, query, "", null, data => {
			if (data.hits === undefined) {
				return handleError.error(res, data);
			}
			let rs = data.hits.hits;
			result = [];
			if(rs.length > 0 && rs[0]._source.enum){
				result = rs[0]._source.enum;
			}
			cache.setValue("values:"+uid, result, config.item_ttl);
			res.json(result);
		});
	}
	else{
		res.json(result);
	}
	
}

const synchronziedLoadSynonmysfromNCIT = (ncitids, idx, next) => {
	if (idx >= ncitids.length) {
		return;
	}
	let syn = [];
	https.get(config.NCIt_url[4] + ncitids[idx], (rsp) => {
		let html = '';
		rsp.on('data', (dt) => {
			html += dt;
		});
		rsp.on('end', () => {
			if (html.trim() !== '') {
				let d = JSON.parse(html);
				if (d.synonyms !== undefined) {
					let tmp = {}
					tmp[ncitids[idx]] = {};
					tmp[ncitids[idx]].label = d.label;
					tmp[ncitids[idx]].code = d.code;
					tmp[ncitids[idx]].definitions = d.definitions;
					tmp[ncitids[idx]].synonyms = [];
					let checker_arr = [];
					d.synonyms.forEach(data => {
						if(checker_arr.indexOf((data.termName+"@#$"+data.termGroup+"@#$"+data.termSource).trim().toLowerCase()) !== -1) return;
						let obj = {};
						obj.termName = data.termName;
						obj.termGroup = data.termGroup;
						obj.termSource = data.termSource;
						//only keep NCI synonyms
						if(obj.termSource == "NCI"){
							if(obj.termGroup == "PT"){
								tmp[ncitids[idx]].synonyms.unshift(obj);
							}
							else{
								tmp[ncitids[idx]].synonyms.push(obj);
							}
						}
						checker_arr.push((data.termName+"@#$"+data.termGroup+"@#$"+data.termSource).trim().toLowerCase());
					});
					if (d.additionalProperties !== undefined) {
						tmp[ncitids[idx]].additionalProperties = [];
						d.additionalProperties.forEach(data => {
							let obj = {};
							obj.name = data.name;
							obj.value = data.value;
							tmp[ncitids[idx]].additionalProperties.push(obj);
						});
					}
					let str = {};
					str[ncitids[idx]] = syns;
					fs.appendFile(dataFilesPath + "/GDC/ncit_details.js", JSON.stringify(tmp), err => {
						if (err) return logger.error(err);
					});
				} else {
					logger.debug("!!!!!!!!!!!! no synonyms for " + ncitids[idx]);
				}

			}
			syns[ncitids[idx]] = syn;
			idx++;
			synchronziedLoadSynonmysfromNCIT(ncitids, idx, next);
			if (ncitids.length == idx) {
				return next('Success');
			} else {
				return next("NCIT finished number: " + idx + " of " + ncitids.length + " : " + ncitids[idx]+ "!\n");
			}

		});

	}).on('error', (e) => {
		logger.debug(e);
	});
};

const preloadNCItSynonyms = (req, res) => {
	let unloaded_ncits = cache.getValue("unloaded_ncits");
	if(unloaded_ncits && unloaded_ncits.length > 0){
		synchronziedLoadSynonmysfromNCIT(unloaded_ncits, 0, data => {
			if (data === "Success") {
				unloaded_ncits = [];
				res.end('Success!!');
			} else {
				res.write(data);
			}
		});
	}
	else{
		res.end('Success with no data processed!!');
	}
	
	
};

const preloadGDCDataMappings = (req, res) => {
	let file_path = path.join(__dirname, '..', '..', 'data_files', 'GDC', 'GDC_Data_Mappings.xlsx');
	let output_file_path = path.join(__dirname, '..', '..', 'data_files', 'GDC', 'gdc_values_updated.js');
	console.log(file_path);
	let mappings = {};
	readXlsxFile(file_path).then((rows) => {
		  //console.log(rows[0]);
		  //console.log(rows[1]);
		  //console.log(rows[2]);
		  rows.forEach((item, idx) => {
		  	if(idx > 0){
		  		console.log(item[2] + ":" + idx);
		  		let prop = item[0] + '.' + item[1] + '.' + item[2];
		  		if(! (prop in mappings)){
		  			mappings[prop] = [];
		  		}
		  		//"nm":"Neoplasm, benign","i_c":"8000/0","n_c":"C3677","term_type":"PT"
		  		if(item[3] != null){
		  			let tmp = {};
		  			tmp.nm = item[3];
		  			if(item[5] == null){
		  				tmp.n_c = "";
		  			}
		  			else{
		  				tmp.n_c = item[5].split('|');
		  			}
		  			tmp.i_c = item[6] == null ? "" : item[6];
		  			if(item[7] == null){
		  				tmp.i_c_s = "";
		  			}
		  			else{
		  				tmp.i_c_s = item[7].split('|');
		  			}
		  			tmp.term_type = item[8] == null ? "" : item[8];
		  			mappings[prop].push(tmp);
		  		}
		  		
		  	}
		  });

		fs.writeFileSync(output_file_path, JSON.stringify(mappings), err => {
			if (err) return logger.error(err);
		});
	  	res.json({"result": "success"});
	});
};

const processGDCDictionaryEnumData = (prop) => {
	const enums = prop.enum;
	const enumsDef = prop.enumDef;
	let result = enums ? enums.map((value) => {
		let tmp = {};
		tmp.n = value.replace(/(?:\r\n|\r|\n)/g, ' ');
		if(enumsDef && enumsDef[tmp.n] && enumsDef[tmp.n].termDef){
			let term = enumsDef[tmp.n].termDef;
			if(term.source == "NCIt" && term.term_id !== ""){
				tmp.gdc_ncit = term.term_id;
			}
			else{
				tmp.gdc_ncit = "";
			}
		}
		else{
			tmp.gdc_ncit = "";
		}
		tmp.n = tmp.n.replace(/\s+/g,' ');
		return tmp;
	}) : [];
	return result;
};

const processEVSSIPEnumData = (enums) => {
	let result = {};
	if(enums) {
		enums.map((entry) => {
			let value = entry.n.replace(/\s+/g,' ');
			result[value] = [];
			let ncits = entry.ncit;
			ncits.map((ncit) => {
				result[value].push(ncit.c);
			});
		});
	}
	return result;
};

const compareWithGDCDictionary = async function(req, res){
	const params = req.query;
	const prop = params.p;
	const node = params.node;
	const category = params.category;
	const source = params.source;
	const uid = prop + "/" + node + "/" + category + "/" + source;

	let query = {};
	query.terms = {};
	query.terms.id = [];
	query.terms.id.push(uid);
	let result = [];
	let GDCDict = await shared.getGDCDictionaryByVersion("2.3.0");
	elastic.query(config.index_p, query, "", null, data => {
		if (data.hits === undefined) {
			return handleError.error(res, data);
		}
		let rs = data.hits.hits;
		if(rs.length > 0 && rs[0]._source.enum){
			result = rs[0]._source.enum;
		}
		//compare GDC Dictionary values with EVS-SIP values
		//start to compare
		let c = {};
		//c.result = result;
		c.dict = GDCDict[node].properties[prop];
		let dict_data = processGDCDictionaryEnumData(c.dict);
		let evssip_data = processEVSSIPEnumData(result);
		let i = 0 ,j = 0, k = 0, m = 0, n = 0, conflict = 0, ok = 0;
		let groupedContent = {};
		groupedContent.i = [];
		groupedContent.j = [];
		groupedContent.k = [];
		groupedContent.m = [];
		groupedContent.n = [];
		groupedContent.conflict = [];
		groupedContent.ok = [];
		let content = dict_data.map((entry) => {
			let value = entry.n;
			if(evssip_data[value] && evssip_data[value].length > 0){
				entry.evssip_ncit = evssip_data[value].join();
			}
			else if(evssip_data[value]){
				entry.evssip_ncit = "";
			}
			else{
				entry.evssip_ncit = "-1";
			}

			if(entry.gdc_ncit == ""){
				if(entry.evssip_ncit == ""){
					i++;
					groupedContent.i.push(entry);
				}
				else if(entry.evssip_ncit == "-1"){
					j++;
					groupedContent.j.push(entry);
				}
				else{
					k++;
					groupedContent.k.push(entry);
				}
			}
			else{
				if(entry.evssip_ncit == ""){
					m++;
					groupedContent.m.push(entry);
				}
				else if(entry.evssip_ncit == "-1"){
					n++;
					groupedContent.n.push(entry);
				}
				else if(entry.evssip_ncit == entry.gdc_ncit){
					ok++;
					groupedContent.ok.push(entry);
				}
				else{
					conflict++;
					groupedContent.conflict.push(entry);
				}
			}
			return entry;
		});

		console.log("GDC have value and EVSSIP have value:", i);
		console.log("GDC have value and EVSSIP don't have anything:", j);
		console.log("GDC have value but EVSSIP have value and ncit code:", k);
		console.log("GDC have value and ncit code but EVSSIP only have value:", m);
		console.log("GDC have value and ncit code but EVSSIP don't have anything:", n);
		console.log("GDC have value and ncit code and EVSSIP have the same value and ncit code:", ok);
		console.log("GDC have value and ncit code and EVSSIP have value and ncit code, but ncit code conflicts:", conflict);
		res.json(groupedContent);
	});
}

const compareAllWithGDCDictionary = async function(req, res){
	const params = req.query;
	const type = params.type ? params.type : "all";
	const page = parseInt(params.page ? params.page : 1);
	const pageSize = parseInt(params.pageSize ? params.pageSize : 25);
	const from = page > 1 ? (page - 1) * pageSize : 0;
	const to = from + pageSize;
	
	let result = {};
	result.pageInfo = {};
	result.pageInfo.page = page;
	result.pageInfo.pageSize = pageSize;
	if(type == "all"){
		let mappings = await shared.getCompareResult();
		result.data = mappings.slice(from, to);
		result.pageInfo.total = mappings.length;
		res.json(result);
	}
	else if(type == "unmapped"){
		let mappings = await shared.getCompareResult_unmapped();
		result.data = mappings.slice(from, to);
		result.pageInfo.total = mappings.length;
		res.json(result);
	}
	else if(type == "mapped"){
		let mappings = await shared.getCompareResult_mapped();
		result.data = mappings.slice(from, to);
		result.pageInfo.total = mappings.length;
		res.json(result);
	}
	else if(type == "conflict"){
		//conflict
		let mappings = await shared.getCompareResult_conflict();
		result.data = mappings.slice(from, to);
		result.pageInfo.total = mappings.length;
		res.json(result);
	}
	else{
		let mappings = await shared.getCompareResult();
		result.data = mappings.slice(from, to);
		result.pageInfo.total = mappings.length;
		res.json(result); 
	}
}

const generateProperties = async function(req, res) {
	const dataset = [];
	let output_file_path = path.join(__dirname, '..', '..', 'data_files', 'GDC', 'gdc_values_updated.js');
	let GDCDict = await shared.getGDCDictionaryByVersion("2.3.0");
	
	for(let node in GDCDict){
		let entry = GDCDict[node];
		let uid = node + "/" + entry.category + "/gdc";
		if(entry.properties){
			let prop_dict = entry.properties;
			for(let prop in prop_dict){
				let tmp = {};
				tmp.category = entry.category;
				tmp.node = node;
				tmp.property = prop;
				let dict = prop_dict[prop];
				tmp.ncit = dict.termDef && dict.termDef.source  && dict.termDef.source == "NCIt" ? (dict.termDef.term_id || dict.termDef.cde_id ) : "";
				dataset.push(tmp);
			}
		} 
	}

	// You can define styles as json object
	const styles = {
	cellPink: {
		fill: {
		fgColor: {
			rgb: 'FF00FF00'
		}
		}
	}
	};
	
	//Array of objects representing heading rows (very top)
	const heading = [
	];
	
	//Here you specify the export structure
	const specification = {
		category: { // <- the key should match the actual data key
			displayName: 'Category', // <- Here you specify the column header
			headerStyle: styles.cellPink, // <- Header style
			width: 220 // <- width in pixels
		},
		node: {
			displayName: 'Node',
			headerStyle: styles.cellPink,
			width: '220' // <- width in chars (when the number is passed as string)
		},
		property: {
			displayName: 'Property',
			headerStyle: styles.cellPink,
			width: 220 // <- width in pixels
		},
		ncit: {
			displayName: 'NCIt Code',
			headerStyle: styles.cellPink,
			width: 220 // <- width in pixels
		}
	}
	
	// Define an array of merges. 1-1 = A:1
	// The merges are independent of the data.
	// A merge will overwrite all data _not_ in the top-left cell.
	const merges = [];
	
	// Create the excel report.
	// This function will return Buffer
	const report = excel.buildExport(
	[ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
		{
		name: 'Report', // <- Specify sheet name (optional)
		heading: heading, // <- Raw heading array (optional)
		merges: merges, // <- Merge cell ranges
		specification: specification, // <- Report specification
		data: dataset // <-- Report data
		}
	]
	);
	
	// You can then return this straight
	res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
	res.send(report);
}

module.exports = {
	indexing,
	suggestion,
	searchP,
	getGDCData,
	getGraphicalGDCDictionary,
	getGraphicalICDCDictionary,
	getGraphicalCTDCDictionary,
	getValuesForGraphicalView,
	preloadNCItSynonyms,
	preloadGDCDataMappings,
	compareWithGDCDictionary,
	compareAllWithGDCDictionary,
	generateProperties
};
