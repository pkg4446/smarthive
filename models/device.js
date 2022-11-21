const Sequelize = require('sequelize');

module.exports = class Device extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            MODULE: {
                type: Sequelize.STRING(32),
                primaryKey: true,
                allowNull: false
            },

            NAME:  {
                type: Sequelize.STRING(32),
                allowNull: false,
                defaultValue: "신규등록"
            },

            FARM: {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            TYPE:  {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },

            SET_TEMP:  {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },

            SET_HUMI:  {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Device',
            tableName  : 'device',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}