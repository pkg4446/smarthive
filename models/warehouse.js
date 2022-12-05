const Sequelize = require('sequelize');

module.exports = class Warehouse extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            Warehouse:  {
                type: Sequelize.STRING(32),
                primaryKey: true,
                allowNull: false
            },

            APIARY: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },

            NAME:   {
                type: Sequelize.STRING(16),
                allowNull: false,
                defaultValue: "신규등록"
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Warehouse',
            tableName  : 'warehouse',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}