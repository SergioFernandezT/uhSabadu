// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const categoriesController = require('../../controllers/api/categoryController');

/*** GET ALL CATEGORIES ***/
router.get('/', categoriesController.list);

/*** CREATE ONE CATEGORY ***/
router.post('/create', categoriesController.processCreate);

/*** GET ONE CATEGORY ***/
router.get('/detail/:id', categoriesController.detail);

/*** EDIT ONE CATEGORY ***/
router.put('/edit/:id', categoriesController.processEdit);

/*** DELETE ONE CATEGORY***/
router.delete('/delete/:id', categoriesController.delete);

/*** BUY PROCCESS ***/
//router.get('/productCart', categoriesController.productCart);

/*** SEARCH PROCCESS ***/
router.get('/search', categoriesController.search);

module.exports = router;