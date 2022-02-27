module.exports = (sequelize) => {
    const { user, transaction } = sequelize.models;

    transaction.belongsTo(user, {
        as: 'sender',
        foreignKey: 'senderId'
    });
    transaction.belongsTo(user, {
        as: 'receiver',
        foreignKey: 'receiverId'
    });
};