const Sequelize = require('sequelize');

module.exports = class smartfarmkorea extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            USER_ID: {
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
            }
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'smartfarmkorea',
            tableName  : 'smartfarmkorea',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}