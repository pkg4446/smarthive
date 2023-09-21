const Sequelize = require('sequelize');

module.exports = class Log_error extends Sequelize.Model{
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

            FARM:   {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            TYPE:   {
                type: Sequelize.STRING(8),
                allowNull: false,
            },

            ERR:    {
                type: Sequelize.STRING(16),
                allowNull: false,
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
            modelName  : 'Log_error',
            tableName  : 'log_error',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}