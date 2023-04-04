const Sequelize = require('sequelize');

module.exports = class custom_multi_log extends Sequelize.Model{
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

            TMST:   {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

            TEMP1:   {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 14040
            },

            TEMP2:   {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 14040
            },

            TEMP3:   {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 14040
            },

            TEMP4:   {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 14040
            },

            TEMP5:   {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 14040
            },

            TEMP6:   {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 14040
            },

            TEMP7:   {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 14040
            },

            TEMP8:   {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 14040
            },

            HUMI1:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 14040
            },

            HUMI2:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 14040
            },

            HUMI3:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 14040
            },

            HUMI4:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 14040
            },

            HUMI5:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 14040
            },

            HUMI6:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 14040
            },

            HUMI7:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 14040
            },

            HUMI8:   {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 14040
            },            

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'custom_multi_log',
            tableName  : 'custom_multi_log',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}