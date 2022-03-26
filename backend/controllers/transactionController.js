const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const { User, Transaction } = require('./databaseController');

// GET request for getting all transactions made by a certain user
exports.transactionsGet = async (req, res, next) => {
    try {
        console.log(req.query);

        const transactions = await Transaction.findAll({ where: { [Op.or]: [{ senderId: req.user.user_id }, { receiverId: req.user.user_id } ], transaction_date: { [Op.between]: [req.query.startDate, req.query.endDate] }}});

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
    async (req, res, next) => {
        try {
            let { email, amount } = req.body;
            amount = parseFloat(amount);

            const errors = validationResult(req);

            if (!errors.isEmpty())
                return res.status(400).json({ statusCode: 400, error: errors.errors[0] });

            if (email === req.user.email) {
                const error = {
                    param: 'yourEmail',
                    msg: 'You can\'t send money to yourself'
                }

                return res.status(400).json({ statusCode: 400, error: error });
            }

            const user = await User.findByPk(req.user.user_id);
            
            if (user.balance < amount) {
                const error = {
                    param: 'balance',
                    msg: 'Your balance is too low'
                }

                return res.status(403).json({ statusCode: 403, error: error });
            }

            try {
                const receivingUser = await User.findOne({where: { email: email }});
                if (receivingUser === null) {
                    const error = {
                        param: 'noUser',
                        msg: 'No such user exists'
                    }

                    return res.status(400).json({ statusCode: 400, error: error });
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