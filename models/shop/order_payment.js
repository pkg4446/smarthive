const Sequelize = require('sequelize');

module.exports = class Order_payment extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            PRICE:    {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false
            },

            PAMENT:    {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },

            CANCLE:    {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },

            REFUND:    {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },

            PAMENT_TYPE:    {
                type: Sequelize.STRING(8),
                allowNull: false
            },

            PAMENT_CODE:    {
                type: Sequelize.STRING(8),
                allowNull: false
            },

            TMST_PAYMENT:   {
                type: Sequelize.DATE,
                allowNull: false
            },

            TMST_CANCLE:   {
                type: Sequelize.DATE,
                allowNull: false
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Order_payment',
            tableName  : 'order_payment',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}