const Sequelize = require('sequelize');

module.exports = class Farm extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            FARM: {
                type: Sequelize.STRING(32),
                primaryKey: true,
                allowNull: false
            },

            NAME:  {
                type: Sequelize.STRING(32),
                allowNull: false,
                defaultValue: "신규등록"
            },

            IP:  {
                type: Sequelize.STRING(32),
                allowNull: false,
                defaultValue: "0.0.0.0"
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Farm',
            tableName  : 'farm',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}