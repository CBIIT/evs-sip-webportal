const elastic = require('../../components/elasticsearch');
const handleError = require('../../components/handleError');
const logger = require('../../components/logger');
const cache = require('../../components/cache');
const config = require('../../config');
const https = require('https');
const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const xlsx = require('node-xlsx');
const _ = require('lodash');
const shared = require('./shared');
// const git = require('nodegit');
var cdeData = {};
var gdcData = {};

const indexing_new = (req, res) => {
	let configs = [];
	elastic.bulkIndex_new(data => {
		return res.status(200).json(data);
	});
};

const indexing = (req, res) => {
	let configs = [];
	//config property index
	let config_property = {};
	config_property.index = config.index_p;
	config_property.body = {
		"settings": {
			"number_of_shards": 10, 
			"max_inner_result_window": 10000000,
			"max_result_window": 10000000,
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
				"category": {
					"type": "keyword"
				},
				"node": {
					"type": "keyword"
				},
				"property": {
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
						"n_syn.s.termName": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_standard"
								}
							},
							"analyzer": "case_insensitive"
						},
						"n_syn.n_c": {
							"type": "text",
							"fields": {
								"have": {
									"type": "text",
									"analyzer": "my_standard"
								}
							},
							"analyzer": "case_insensitive"
						},
						"i_c":{
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
        "size": 10
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
	let isBoolean = false;
	let keyword = req.query.keyword.trim().replace(/[\ ]+/g, " ");
	let option = {};
	if(req.query.options){
		option.match = req.query.options.indexOf("exact") !== -1 ? "exact" : "partial";
		option.syn = req.query.options.indexOf('syn') !== -1 ? true : false;
		option.desc = req.query.options.indexOf('desc') !== -1 ? true : false;
	}
	else{
		option = {
			match: "partial",
			syn: false,
			desc: false
		};
	}
	if (keyword.trim() === '') {
		res.json([]);
	} else {
		if(keyword.indexOf(" AND ") !== -1 || keyword.indexOf(" OR ") !== -1 || keyword.indexOf(" NOT ") !== -1) isBoolean = true;
		let query = shared.generateQuery(keyword, option, isBoolean);
		let highlight = shared.generateHighlight();
		elastic.query(config.index_p, query, highlight, result => {
			if (result.hits === undefined) {
				return handleError.error(res, result);
			}
			let data = result.hits.hits;
			data.forEach(entry => {
				delete entry.sort;
				delete entry._index;
				delete entry._score;
				delete entry._type;
				delete entry._id;
			});
			res.json(data);
		});
	}
};

const getGDCData = (req, res) => {
	let uid = req.query.id;
	let query = {};
	query.terms = {};
	query.terms.id = [];
	query.terms.id.push(uid);
	elastic.query(config.index_p, query, null, result => {
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
	const type = req.query.type;
	const node = req.query.node;
	const property = req.query.property;

	let result = [];
	if(type == 'icdc' || type == 'icdc_readonly'){
		let jsonData = shared.getGraphicalICDCDictionary();
		const props = jsonData[node].properties;
		result = props ? (props[property] ? (props[property].type ? (Array.isArray(props[property].type) ? props[property].type : []) : []) : []) : [];
	}
	else if(type == 'ctdc' || type == 'ctdc_readonly'){
		let jsonData = shared.getGraphicalCTDCDictionary();
		const props = jsonData[node].properties;
		result = props ? (props[property] ? (props[property].type ? (Array.isArray(props[property].type) ? props[property].type : []) : []) : []) : [];
	}
	else{
		let jsonData = await shared.getGraphicalGDCDictionary();
		const props = jsonData[node].properties;
		result = props ? (props[property] ? (props[property].enum ? props[property].enum : []) : []) : [];
	}

	res.json(result);
}

module.exports = {
	indexing_new,
	indexing,
	suggestion,
	searchP,
	getGDCData,
	getGraphicalGDCDictionary,
	getGraphicalICDCDictionary,
	getGraphicalCTDCDictionary,
	getValuesForGraphicalView
};
