// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/register', mainController.register);
router.get('/login', mainController.login);
router.get('/search', mainController.search); 

// ************ DEV ENTRY ************
router.get('/productDetail', mainController.productDetail);

module.exports = router;
