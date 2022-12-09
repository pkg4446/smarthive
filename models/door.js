const Sequelize = require('sequelize');

module.exports = class Door extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            MODULE: {
                type: Sequelize.STRING(32),
                primaryKey: true,
                allowNull: false
            },

            SENSOR: {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            NAME:   {
                type: Sequelize.STRING(16),
                allowNull: false,
                defaultValue: "신규등록"
            },

            FARM:   {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            DOOR1:    {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            DOOR2:    {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            DOOR3:    {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            DOOR4:    {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            ENEMY:    {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            TMST:   {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Door',
            tableName  : 'door',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}