const Farm      = require('../../models/farm');
const Pump      = require('../../models/pump');
const Sensor    = require('../../models/sensor');
const Log_error     = require('../../models/log_error');
const Log_sensor    = require('../../models/log_sensor');

const Sequelize = require('../module');
const { Op }    = require("sequelize");

module.exports  = {
    regist :   async function(USER_IP){
        try {
            const farm = await Farm.findAll({
                where: {IP: USER_IP},
                raw : true
            });
            return farm;
        } catch (error) {
            console.log(error);
        }        
    },

    user :   async function(USER_ID){
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

    farm :   async function(FARM_ID){
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

    hive :   async function(HIVE_NAME){
        try {
            const response = {
                sensor: await Sensor.findOne({where: {NAME: HIVE_NAME},raw : true}),
                door:   "test"
            }
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    sensor :   async function(MODULE){
        try {
            const response = {
                sensor: await Sensor.findByPk(MODULE,{raw : true}),
                door:   "test"
            }
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    
    log_sensor:   async function(SENSOR_ID){
        try {
            const response = await Log_sensor.findAll(
                {where: {MODULE: SENSOR_ID},
                order :[['IDX', 'DESC']],
                limit: 1440,
                raw : true
            });
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    log_error:   async function(FARM_ID){
        try {
            const response = await Log_error.findAll({
                where: {FARM: FARM_ID},
                order :[['IDX', 'DESC']],
                limit: 200,
                raw : true,
            });
            return response;
        } catch (error) {
            console.log(error);
        }        
    },
}