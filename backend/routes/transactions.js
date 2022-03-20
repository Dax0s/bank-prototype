const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transactionController');

const auth = require('../middleware/auth');

router.get('/', auth, transactionsController.transactionsGet);

router.get('/create', auth, transactionsController.transactionsCreateGet);
router.post('/create', auth, transactionsController.transactionsCreatePost);

module.exports = router;
