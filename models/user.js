const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            EMAIL: {
                type: Sequelize.STRING(32),
                primaryKey: true,
                allowNull: false,
            },

            NAME:  {
                type: Sequelize.STRING(8),
                allowNull: false,
            },

            CALL:  {
                type: Sequelize.STRING(16),
                allowNull: false,
            },

            PASS:  {
                type: Sequelize.STRING(64),
                allowNull: false,
            },

        },{
            sequelize,
            timestamps : true,
            underscored: false,
            modelName  : 'User',
            tableName  : 'user',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}