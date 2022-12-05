const Sequelize = require('sequelize');

module.exports = class Log_wh_O3 extends Sequelize.Model{
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

            O3:     {
                type: Sequelize.SMALLINT.UNSIGNED,
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
            modelName  : 'Log_wh_O3',
            tableName  : 'log_wh_O3',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}