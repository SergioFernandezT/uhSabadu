// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../../controllers/api/productController');

const multer = require('multer')
const path = require('path')

const uploadFile = require('../../middlewares/multerMiddleware');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.list);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.createForm);
router.post('/create', uploadFile.single('image'), productsController.processCreate);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.editForm);
router.put('/edit/:id', uploadFile.single('image'), productsController.processEdit);

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.delete);

/*** BUY PROCCESS ***/
router.get('/productCart', productsController.productCart);

/*** SEARCH PROCCESS ***/
router.get('/search', productsController.search);

module.exports = router;