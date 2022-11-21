const Farm      = require('../../models/farm');
const Pump      = require('../../models/pump');
const Sensor    = require('../../models/sensor');
const Log_error     = require('../../models/log_error');
const Log_sensor    = require('../../models/log_sensor');

const Sequelize = require('../module');
const { Op }    = require("sequelize");

module.exports  = {
    farm :   async function(USER_ID){
        try {
            const farm = await Farm.findAll({
                where: {USER: USER_ID},
                raw : true
            });
            return farm;
        } catch (error) {
            console.log(error);
        }        
    },

    hive :   async function(FARM_ID){
        try {
            const response = {
                pump:   await Pump.findAll({where: {FARM: FARM_ID},raw : true}),
                sensor: await Sensor.findAll({where: {FARM: FARM_ID},raw : true})
            }
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    log_sensor:   async function(FARM_ID){
        try {
            const response = await Log_error.findAll({
                where: {FARM: FARM_ID},
                order :[['MESURE_DT', 'DESC']],
                limit: 200,
                raw : true,
            });
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    log_sensor:   async function(SENSOR_ID){
        try {
            const response = await Log_sensor.findAll(
                {where: {MODULE: SENSOR_ID},
                order :[['MESURE_DT', 'DESC']],
                limit: 1440,
                raw : true
            });
            return response;
        } catch (error) {
            console.log(error);
        }        
    },
}