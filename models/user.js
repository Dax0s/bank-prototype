const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        name: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.first_name} ${this.last_name}`;
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        balance: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false,
            defaultValue: 0
        },
        register_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    });

    return User;
};