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

(async () => {
    await sequelize.sync({ force: true });

    const ted = await User.create({ first_name: 'Ted', last_name: 'Shroom', email: 'shroomted@gmail.com', password: 'testpassword' });
    const bob = await User.create({ first_name: 'Bob', last_name: 'Cena', email: 'bobthebob@gmail.com', password: 'testpassword' });

    const transaction = await Transaction.create({ transaction_amount: 1 });

    transaction.setSender(ted);
    transaction.setReceiver(bob);
})();