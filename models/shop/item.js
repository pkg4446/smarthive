const Sequelize = require('sequelize');

module.exports = class Item extends Sequelize.Model{
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

            STOCK:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false
            },

            PRICE:   {
                type: Sequelize.MEDIUMINT.UNSIGNED,  //1677만원까지
                allowNull: false
            },

            DELIVERY:   {
                type: Sequelize.SMALLINT.UNSIGNED,  //6만5천500원까지
                allowNull: false
            },

            TEXT:   {
                type: Sequelize.TEXT,
                allowNull: false
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Item',
            tableName  : 'item',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}