const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.js')[env];
const db        = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize    = sequelize;

const user  = require('./user');
db.user     = user;
user.init(sequelize);
user.associate(db);

const apiary    = require('./apiary');
db.apiary       = apiary;
apiary.init(sequelize);
apiary.associate(db);

const device    = require('./device');
db.device       = device;
device.init(sequelize);
device.associate(db);

const farm  = require('./farm');
db.farm     = farm;
farm.init(sequelize);
farm.associate(db);

const pump  = require('./pump');
db.sensor   = pump;
pump.init(sequelize);
pump.associate(db);

const sensor    = require('./sensor');
db.sensor       = sensor;
sensor.init(sequelize);
sensor.associate(db);

const warehouse = require('./warehouse');
db.warehouse    = warehouse;
warehouse.init(sequelize);
warehouse.associate(db);

const log_error     = require('./log_error');
db.log_error        = log_error;
log_error.init(sequelize);
log_error.associate(db);

const log_sensor    = require('./log_sensor');
db.log_sensor       = log_sensor;
log_sensor.init(sequelize);
log_sensor.associate(db);

const log_wh_O3     = require('./log_wh_O3');
db.log_wh_O3        = log_wh_O3;
log_wh_O3.init(sequelize);
log_wh_O3.associate(db);

const log_wh_door   = require('./log_wh_door');
db.log_wh_door  = log_wh_door;
log_wh_door.init(sequelize);
log_wh_door.associate(db);

module.exports = db;
