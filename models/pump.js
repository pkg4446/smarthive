const Sequelize = require('sequelize');

module.exports = class Pump extends Sequelize.Model{
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

            RUN: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: false
            },

            TMST:  {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
            
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Pump',
            tableName  : 'pump',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}