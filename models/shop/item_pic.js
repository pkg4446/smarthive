const Sequelize = require('sequelize');

module.exports = class Item_pic extends Sequelize.Model{
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

            EMAIL:   {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            FILE_NAME:   {
                type: Sequelize.STRING(128),
                allowNull: false
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Item_pic',
            tableName  : 'item_pic',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}