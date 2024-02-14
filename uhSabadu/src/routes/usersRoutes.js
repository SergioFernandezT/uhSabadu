// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/userController');

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uhSabadu/public/images/users')
    },
    filename: (req, file, cb) => {
        let fileName = `img_${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

const loginCheck = require('../middlewares/login');

const upload = multer({ storage })

/*** GET ALL USERS ***/
router.get('/', usersController.list);

/*** CREATE ONE USER ***/
router.get('/create', usersController.createForm);
router.post('/create', upload.single('image'), usersController.processCreate);

/*** REGISTER ONE USER ***/
router.get('/register', usersController.registerForm);
router.post('/register', upload.single('image'), usersController.processRegister);

/*** GET ONE USER ***/
router.get('/detail/:id', usersController.detail);

/*** EDIT ONE USER ***/
router.get('/edit/:id', usersController.editForm);
router.put('/edit/:id', upload.single('image'), usersController.processEdit);

/*** DELETE ONE USER***/
router.delete('/delete/:id', usersController.delete);

/*** LOGIN FEATURES ***/
router.post('/', loginCheck, usersController.loginProcess);

// /*** ADMIN FEATURES ***/
// router.get('/admin',  usersController.admin);

module.exports = router;