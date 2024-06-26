// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../../controllers/api/userController');

// const path = require('path')

// Middlewares
const uploadFile = require('../../middlewares/multerMiddleware');
const validations = require('../../middlewares/userMiddlewares/validateRegisterMiddleware');
const guestMiddleware = require('../../middlewares/userMiddlewares/guestMiddleware');
const authMiddleware = require('../../middlewares/userMiddlewares/authMiddleware');

const loginCheck = require('../../middlewares/loginUserMiddleware');

/*** GET ALL USERS ***/
router.get('/', usersController.list);

/*** CREATE ONE USER ***/
router.post('/create', uploadFile.single('image'), usersController.processCreate);

/*** REGISTER ONE USER ***/
router.post('/register', uploadFile.single('image'), validations, usersController.processRegister);

/*** GET ONE USER ***/
router.get('/detail/:id', usersController.detail);

/*** EDIT ONE USER ***/
router.put('/edit/:id', uploadFile.single('image'), usersController.processEdit);

/*** DELETE ONE USER***/
router.delete('/delete/:id', usersController.delete);

/*** LOGIN USER ***/
router.post('/login', usersController.loginProcess);

/*** PASSWORD RECOVERY ***/
router.post('/resetPassword',  usersController.passwordRecoveryProcess);

// /*** ADMIN FEATURES ***/
// router.get('/admin',  usersController.admin);

module.exports = router;