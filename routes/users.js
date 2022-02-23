const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', auth.verifyToken, (req, res, next) => {
    res.status(200).send(`Welcome ${req.user.email}`);
});

router.get('/register', userController.registerGet);
router.post('/register', userController.registerPost);

router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);

module.exports = router;
