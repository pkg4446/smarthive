const Sequelize = require('sequelize');

module.exports = class custom_multi_log extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX:    {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            MODULE: {
                type: Sequelize.STRING(32),
                allowNull: false
            },

            TMST:   {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

            RUNTIME:   {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'custom_multi_ctr',
            tableName  : 'custom_multi_ctr',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}