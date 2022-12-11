const Sequelize = require('sequelize');

module.exports = class Apiary extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            APIARY: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            USER:   {
                type: Sequelize.STRING(32),
                allowNull: false,
                defaultValue: "테스터"
            },

            NAME:   {
                type: Sequelize.STRING(16),
                allowNull: false,
            },            

            ADDR:   {
                type: Sequelize.STRING(32),
                allowNull: false,
                defaultValue: ""
            }
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Apiary',
            tableName  : 'apiary',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}