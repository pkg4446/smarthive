const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.js')[env];
const db        = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize    = sequelize;

const farm   = require('./farm');
db.farm      = farm;
farm.init(sequelize);
farm.associate(db);

const device   = require('./device');
db.device      = device;
device.init(sequelize);
device.associate(db);

const log_sensor   = require('./log_sensor');
db.log_sensor      = log_sensor;
log_sensor.init(sequelize);
log_sensor.associate(db);

module.exports = db;
