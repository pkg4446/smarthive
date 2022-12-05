const Sequelize = require('sequelize');

module.exports = class Log_wh_door extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            FARM:   {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            DOOR:   {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
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
            modelName  : 'Log_wh_door',
            tableName  : 'log_wh_door',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}