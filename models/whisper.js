const Sequelize = require('sequelize');

module.exports = class Whisper extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            
            SEND: {
                type: Sequelize.STRING(32),
                allowNull: false,
            },

            RECV:  {
                type: Sequelize.STRING(32),
                allowNull: false,
            },

            TEXT:  {
                type: Sequelize.TEXT,
                allowNull: false,
            },

            READ:  {
                type: Sequelize.BOOLEAN,
                allowNull: false,
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
            modelName  : 'Whisper',
            tableName  : 'whisper',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}