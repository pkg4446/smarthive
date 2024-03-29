const Sequelize = require('sequelize');

module.exports = class Order_addr extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            EMAIL:   {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            NAME:   {
                type: Sequelize.STRING(8),
                allowNull: false
            },

            ADDRESS:   {
                type: Sequelize.STRING(256),
                allowNull: false
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Order_addr',
            tableName  : 'order_addr',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}