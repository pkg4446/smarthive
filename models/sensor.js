const Sequelize = require('sequelize');

module.exports = class Sensor extends Sequelize.Model{
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

            FARM:   {
                type: Sequelize.STRING(16),
                allowNull: false
            },

            STATE:  {
                type: Sequelize.STRING(8),
                allowNull: false,
                defaultValue: "정상"
            },

            USE:    {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            SET_TEMP:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 5
            },

            SET_HUMI:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 50
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Sensor',
            tableName  : 'sensor',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}