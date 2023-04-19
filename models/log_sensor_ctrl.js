const Sequelize = require('sequelize');

module.exports = class Log_sensor_ctrl extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            MODULE: {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            OPERATION:   {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },            

            TYPE:   {
                type: Sequelize.STRING(16),
                allowNull: false
            },

            TMST:   {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Log_sensor_ctrl',
            tableName  : 'log_sensor_ctrl',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}