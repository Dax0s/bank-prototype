const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/users/register');
});

router.get('/register', userController.registerGet);
router.post('/register', userController.registerPost);

router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);

module.exports = router;
