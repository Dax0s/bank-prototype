const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const { User, Transaction } = require('./databaseController');

// GET request for getting all transactions made by a certain user
exports.transactionsGet = async (req, res, next) => {
    try {
        console.log(req.query);

        const transactions = await Transaction.findAll({ where: { senderId: req.user.user_id, transaction_date: { [Op.between]: [req.query.startDate, req.query.endDate] }}});

        let newTransactions = await Promise.all(transactions.map(async transaction => (
            { 
                transactionAmount: (Math.round(transaction.transaction_amount * 100) / 100).toFixed(2),
                senderEmail: (await User.findByPk(transaction.senderId)).email,
                receiverEmail: (await User.findByPk(transaction.receiverId)).email,
                transactionDate: transaction.transaction_date.toLocaleDateString('zh-Hans-CN', {year:"numeric",month:"2-digit", day:"2-digit"}).replaceAll('/', '-'),
                transaction_date: transaction.transaction_date
            }
        )));
        
        newTransactions.sort((a, b) => b.transaction_date - a.transaction_date);

        res.status(200).json({ statusCode: 200, transactions: newTransactions });
    } catch (err) {
        console.log(err);
    }
}

exports.transactionsCreateGet = async (req, res, next) => {

}

// POST request for creating a new transaction
exports.transactionsCreatePost = [
    body('email', 'Not an email').isEmail().normalizeEmail(),
    body('amount', 'Transaction amount can\'t be empty').isLength({ min: 1 }),
    async (req, res, next) => {
        try {
            let { email, amount } = req.body;
            amount = parseFloat(amount);

            const errors = validationResult(req);

            if (!errors.isEmpty())
                return res.status(400).json({ statusCode: 400, errors: errors });

            if (email === req.user.email) {
                return res.status(400).json({ statusCode: 400, errors: 'You can\'t send money to yourself' });
            }

            const user = await User.findByPk(req.user.user_id);
            
            if (user.balance < amount) {
                return res.status(403).json({ statusCode: 403, errors: 'Your balance is too low' });
            }

            try {
                const receivingUser = await User.findOne({where: { email: email }});
                if (receivingUser === null) {
                    return res.status(400).json({ statusCode: 400, errors: 'No such user exists' });
                }
                receivingUser.balance = parseFloat(receivingUser.balance);

                user.balance -= amount;
                receivingUser.balance += amount;

                const transaction = await Transaction.create({ transaction_amount: amount });

                transaction.setSender(user);
                transaction.setReceiver(receivingUser);

                await user.save();
                await receivingUser.save();

                return res.status(200).json({ statusCode: 200 });
            } catch (err) {
                console.log(err);
                return res.status(400).json({ statusCode: 400, errors: err });
            }

        } catch(err) {
            console.log(err);
        }
}]