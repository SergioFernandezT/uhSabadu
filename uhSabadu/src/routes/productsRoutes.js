// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.list);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.createForm);
router.post('/create', productsController.processCreate);


/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id?', productsController.editForm);
// router.put('/edit/:id', productsController.processEdit);


/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.delete);


module.exports = router;
