const express = require('express');

const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

// Index
router.get('/', storeController.getStores);
router.get('/stores', storeController.getStores);
// Store - Get
router.get('/store/{slug}', catchErrors(storeController.getStore));
// Store - Add
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));


module.exports = router;
