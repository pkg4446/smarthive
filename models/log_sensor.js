const Sequelize = require('sequelize');

module.exports = class Log_sensor extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            MODULE: {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            TEMP:  {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },

            HUMI:  {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Log_sensor',
            tableName  : 'log_sensor',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}