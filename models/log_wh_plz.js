const Sequelize = require('sequelize');

module.exports = class Log_wh_plz extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            WAREHOUSE: {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            PLZ:     {
                type: Sequelize.BOOLEAN,
                allowNull: false,
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
            modelName  : 'Log_wh_plz',
            tableName  : 'log_wh_plz',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}