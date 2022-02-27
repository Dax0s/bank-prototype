const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1
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

    return Transaction;
};