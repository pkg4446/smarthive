const Sequelize = require('sequelize');

module.exports = class Farm extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            MODULE: {
                type: Sequelize.STRING(32),
                primaryKey: true,
                allowNull: false,
            },

            NAME:  {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },

            TEMP:  {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },

            HUMI:  {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Farm',
            tableName  : 'farm',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}