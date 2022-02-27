const transaction = require('../models/transaction');
const { User, Transaction } = require('./databaseController');

exports.transactionsGet = async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({ where: {senderId: req.user.user_id }});

        const newTransactions = await Promise.all(transactions.map(async transaction => (
            { 
                ...transaction,
                senderEmail: (await User.findByPk(transaction.senderId)).email,
                receiverEmail: (await User.findByPk(transaction.receiverId)).email
            }
        )));

        console.log(`Sender: ${newTransactions[0].senderEmail} Receiver: ${newTransactions[0].receiverEmail}`);

        res.status(200).json({ statusCode: 200, transactions: newTransactions });
    } catch (err) {
        console.log(err);
    }
}