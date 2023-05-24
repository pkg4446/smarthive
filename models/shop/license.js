const Sequelize = require('sequelize');

module.exports = class License extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            EMAIL:   {
                type: Sequelize.STRING(32),
                primaryKey: true,
                allowNull: false
            },

            LICENSE: {
                type: Sequelize.STRING(16),
                allowNull: false,
                defaultValue: 0
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'License',
            tableName  : 'license',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
}