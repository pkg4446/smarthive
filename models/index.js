const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.js')[env];
const db        = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize    = sequelize;

DBinit('./custom_multi_log');
DBinit('./custom_multi_sensor');
DBinit('./user');
DBinit('./fcm');
DBinit('./apiary');
DBinit('./door');
DBinit('./farm');
DBinit('./pump');
DBinit('./sensor')
DBinit('./warehouse')
DBinit('./log_error')
DBinit('./log_sensor');
DBinit('./log_sensor_ctrl');
DBinit('./log_wh_O3');
DBinit('./log_wh_door');
DBinit('./log_wh_plz');
DBinit('./whisper');

DBinit('./shop/basket');
DBinit('./shop/item_pic');
DBinit('./shop/item');
DBinit('./shop/license');
DBinit('./shop/order_addr');
DBinit('./shop/order_item');
DBinit('./shop/order_payment');
DBinit('./shop/order');
DBinit('./shop/shop');

module.exports = db;

function DBinit(path){
    const database = require(path);
    const DBname   = path.split('/');
    db[DBname[DBname.length-1]] = database;
    database.init(sequelize);    
    database.associate(db);
}