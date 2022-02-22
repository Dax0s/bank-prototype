const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_amount: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        transaction_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });
};