const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.js')[env];
const db        = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize    = sequelize;

/*
const md_list   = require('./device/md_list');

db.md_list      = md_list;

md_list.init(sequelize);

md_list.associate(db);
*/
module.exports = db;
