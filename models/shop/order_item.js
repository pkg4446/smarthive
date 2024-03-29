const Sequelize = require('sequelize');

module.exports = class Order_item extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            ITEM_IDX:   {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            
            ORDER_IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
            },

            EMAIL:   {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            PRICE:   {
                type: Sequelize.MEDIUMINT.UNSIGNED,  //1677만원까지
                allowNull: false
            },

            PIECE:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false
            },

            DELIVERY:   {
                type: Sequelize.SMALLINT.UNSIGNED,  //6만5천500원까지
                allowNull: false
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Order_item',
            tableName  : 'order_item',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}