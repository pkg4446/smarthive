const Sequelize = require('sequelize');

module.exports = class Apiary extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            APIARY: {
                type: Sequelize.STRING(32),                
                defaultValue: "신규등록"
            },

            USER: {
                type: Sequelize.STRING(32),
                allowNull: false,
                defaultValue: "테스터"
            },
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