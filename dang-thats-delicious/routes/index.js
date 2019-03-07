const express = require('express');

const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

// Index
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
// Store - Get
router.get('/store/{slug}', catchErrors(storeController.getStore));
// Store - Add
router.get('/add', catchErrors(storeController.addStore));
router.post('/add', catchErrors(storeController.createStore));


module.exports = router;
