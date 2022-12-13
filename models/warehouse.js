const Sequelize = require('sequelize');

module.exports = class Warehouse extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            WAREHOUSE:  {
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

            USE:    {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            ON:    {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: false,
                defaultValue: 50
            },

            OFF:    {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: false,
                defaultValue: 20
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