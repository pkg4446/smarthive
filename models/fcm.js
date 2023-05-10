const Sequelize = require('sequelize');

module.exports = class FCM extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            EMAIL: {
                type: Sequelize.STRING(32),
                primaryKey: true,
                allowNull: false,
            },

            TOKEN: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'FCM',
            tableName  : 'FCM',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}