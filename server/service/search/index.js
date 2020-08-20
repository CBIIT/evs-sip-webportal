const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/buildIndex', controller.indexing);
router.get('/suggest', controller.suggestion);
router.get('/suggestMisSpelled', controller.suggestionMisSpelled);
router.get('/gdcDictionaryVersion', controller.gdcDictionaryVersion);
router.get('/ncit/detail', controller.getNCItInfo);

// property based api
router.get('/all/data', controller.searchICDO3Data);
router.get('/all/p', controller.searchP);
router.get('/p/local/vs', controller.getGDCData);

//graphical view
router.get('/graph/gdc', controller.getGraphicalGDCDictionary);
router.get('/graph/icdc', controller.getGraphicalICDCDictionary);
router.get('/graph/ctdc', controller.getGraphicalCTDCDictionary);
router.get('/graph/p/vs', controller.getValuesForGraphicalView);

module.exports = router;
