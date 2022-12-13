const Apiary    = require('../../models/apiary');
const Farm      = require('../../models/farm');
const Door      = require('../../models/door');
const Pump      = require('../../models/pump');
const Sensor    = require('../../models/sensor');
const Warehouse = require('../../models/warehouse');
const Log_error     = require('../../models/log_error');
const Log_sensor    = require('../../models/log_sensor');
const Log_wh_O3     = require('../../models/log_wh_O3');
const Log_wh_door   = require('../../models/log_wh_door');

const Sequelize = require('../module');
const { Op }    = require("sequelize");

module.exports  = {
    regist :   async function(USER_IP){
        try {
            const farm = await Farm.findAll({
                where: {IP: USER_IP, APIARY:0},
                raw : true
            });
            return farm;
        } catch (error) {
            console.log(error);
        }        
    },    

    regist_mac :   async function(MAC_ADDR){
        try {
            const farm = await Farm.findOne(MAC_ADDR,{raw : true});
            return farm;
        } catch (error) {
            console.log(error);
        }
    },

    regist_change :   async function(MAC_ADDR,APIARY_ID){
        try {
            const farm = await Farm.findByPk(MAC_ADDR)
            .then(function(response) {
                response.update({APIARY: APIARY_ID})
            });
            return farm;
        } catch (error) {
            console.log(error);
        }        
    },
    
    apiary :   async function(USER_ID){
        try {
            const apiary = await Apiary.findAll({
                where: {USER: USER_ID},
                attributes: {
                    exclude: ['USER'], // exclude: 제외한 나머지 정보 가져오기
                  },
                raw : true
            });            
            return apiary;
        } catch (error) {
            console.log(error);
        }        
    },

    apiaryGroup :   async function(APIARY){
        try {
            const response = {
                farm:       await Farm.findAll({where:{APIARY: APIARY}, attributes: ["FARM","NAME"], raw : true}),
                warehouse:  await Warehouse.findAll({where:{APIARY: APIARY}, attributes: {exclude: ['APIARY']}, raw : true}),
            }            
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    farm :   async function(FARM_ID){
        try {
            const response = {
                pump:   await Pump.findAll({where: {FARM: FARM_ID},raw : true}),
                sensor: await Sensor.findAll({where: {FARM: FARM_ID},raw : true}),
                door:   await Door.findAll({where: {FARM: FARM_ID},raw : true})
            }
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    hive :   async function(FARM_ID,HIVE_NAME){
        try {
            const response = {
                sensor: await Sensor.findOne({where: {FARM: FARM_ID,NAME: HIVE_NAME},raw : true}),
                door:   await Door.findOne({where: {FARM: FARM_ID,  NAME: HIVE_NAME},raw : true})
            }
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    sensor :   async function(MODULE){
        try {
            const response = await Sensor.findByPk(MODULE,{raw : true});
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