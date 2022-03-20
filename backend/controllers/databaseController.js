const Sequelize = require('sequelize');

require('dotenv').config();

const PASSWORD = process.env.PASSWORD;
const DB_USERNAME = process.env.DB_USERNAME;
const DB = process.env.DB;
const HOST = process.env.HOST;

const sequelize = new Sequelize(DB, DB_USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql'
});

const User = require('../models/user')(sequelize);
const Transaction = require('../models/transaction')(sequelize);

const relations = require('../models/relations')(sequelize);

// TESTING



// (async () => {
    // await sequelize.sync({ force: true });

    // const ted = await User.create({ first_name: 'Ted', last_name: 'Shroom', email: 'shroomted@gmail.com', password: 'testpassword' });
    // const bob = await User.create({ first_name: 'Bob', last_name: 'Cena', email: 'bobthebob@gmail.com', password: 'testpassword' });

    // const transaction = await Transaction.create({ transaction_amount: 1 });

    // transaction.setSender(ted);
    // transaction.setReceiver(bob);

    // const domas = await User.findByPk('2a61b910-97f2-11ec-b252-3982cf468d49');
    // const random = await User.findByPk('3aacb680-97f2-11ec-b252-3982cf468d49');

    // const transaction = await Transaction.create({ transaction_amount: 75, transaction_date: '2022-01-01' });

    // transaction.setSender(domas);
    // transaction.setReceiver(random);

    // for (let i = 0; i < 500; i++) {
    //     const transaction = await Transaction.create({ transaction_amount: 75, transaction_date: '2022-01-01' });

    //     transaction.setSender(domas);
    //     transaction.setReceiver(random);
    // }

// })();

module.exports = { User, Transaction };