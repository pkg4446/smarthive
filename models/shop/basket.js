const Sequelize = require('sequelize');

module.exports = class Basket extends Sequelize.Model{
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

            ITEM_IDX:   {
                type: Sequelize.INTEGER.UNSIGNED,  //1677만원까지
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
            modelName  : 'Basket',
            tableName  : 'basket',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}