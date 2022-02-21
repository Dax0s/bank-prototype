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

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(error => {
    console.error('Unable to connect to the database:', error);
});
