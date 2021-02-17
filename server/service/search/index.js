const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/buildIndex', controller.indexing);
router.get('/suggest', controller.suggestion);

// property based api
router.get('/all/p', controller.searchP);

//graphical view
router.get('/graph/gdc', controller.getGraphicalGDCDictionary);
router.get('/graph/icdc', controller.getGraphicalICDCDictionary);
router.get('/graph/ctdc', controller.getGraphicalCTDCDictionary);
router.get('/graph/p/vs', controller.getValuesForGraphicalView);
router.get('/p/local/vs', controller.getGDCData);


//for preload only
//router.get('/preloadNCItSynonyms', controller.preloadNCItSynonyms);
//router.get('/preloadGDCDataMappings', controller.preloadGDCDataMappings);
router.get('/preloadPCDCDataMappings', controller.preloadPCDCDataMappings);


module.exports = router;
