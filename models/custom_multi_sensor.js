const Sequelize = require('sequelize');

module.exports = class custom_multi_sensor extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            MODULE: {
                type: Sequelize.STRING(32),
                primaryKey: true,
                allowNull: false
            },

            NAME:   {
                type: Sequelize.STRING(16),
                allowNull: false,
                defaultValue: "신규등록"
            },

            TYPE:   {
                type: Sequelize.STRING(16),
                allowNull: false,
                defaultValue: "미정"
            },

            TEMP:   {
                type: Sequelize.TINYINT,
                allowNull: false,
                defaultValue: 1
            },

            FARM:   {
                type: Sequelize.STRING(32),
                allowNull: false
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'custom_multi_sensor',
            tableName  : 'custom_multi_sensor',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}