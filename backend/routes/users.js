const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', auth, userController.userGet);

router.get('/register', userController.registerGet);
router.post('/register', userController.registerPost);

router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);

router.post('/logout', userController.logoutPost);

module.exports = router;
