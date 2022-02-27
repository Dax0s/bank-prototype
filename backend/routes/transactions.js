const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transactionController');

const auth = require('../middleware/auth');

router.get('/', auth, transactionsController.transactionsGet);

module.exports = router;
