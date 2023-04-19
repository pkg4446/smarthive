const Apiary    = require('../../models/apiary');
const Sensor    = require('../../models/sensor');
const Warehouse = require('../../models/warehouse');

const Sequelize   = require('../module');
const { Op }    = require("sequelize");

module.exports  = {

    apiary :   async function(data){
        try {
            const apiary = await Apiary.findByPk(data.APIARY)
            .then(function(response) {
                response.update({
                    NAME:     data.NAME,
                    ADDR:     data.ADDR,
                })
            });

            return apiary;
        } catch (error) {
            console.log(error);
        }        
    },

    farm_update : async function(DEVICE,COLUMN,VALUE){
        try {      
            const object = await Sequelize.query('UPDATE farm SET `'+ COLUMN +'`="'+ VALUE +'" WHERE  FARM="'+ DEVICE +'"');
            return object;
        } catch (error) {
          console.error(error);
        }
    },

    warehouse_update : async function(DEVICE,COLUMN,VALUE){
        try {      
            const object = await Sequelize.query('UPDATE warehouse SET `'+ COLUMN +'`="'+ VALUE +'" WHERE  WAREHOUSE="'+ DEVICE +'"');
            return object;
        } catch (error) {
          console.error(error);
        }
    },

    sensor_error :  async function(MODULE,ERR){
        try {
            let CODE;
            switch (ERR) {
                case "SHT31":
                    CODE = "센서오류";
                    break;
                case "WATER":
                    CODE = "급수오류";
                    break;
                case "TEMP":
                    CODE = "이상고온";
                    break;            
                default:
                    CODE = "정상";
                    break;
            }
            await Sensor.findByPk(MODULE)
            .then(function(response) {
                response.update({STATE: CODE})
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    sensor_confirm :  async function(MODULE){
        try {
            await Sensor.findByPk(MODULE)
            .then(function(response) {
                response.update({
                    USE:        response.PRE_USE,
                    SET_TEMP:   response.PRE_TEMP,
                    SET_HUMI:   response.PRE_HUMI
                })
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    sensor_set :  async function(data){
        try {            
            let sensor;
            await Sensor.findByPk(data.MODULE)
            .then(async function(response) {
                sensor = response.dataValues;
                response.update({
                    PRE_USE:    data.USE,
                    PRE_TEMP:   data.TEMP,
                    PRE_HUMI:   data.HUMI
                })
            });            
            
            return sensor;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    sensor_name :  async function(data){
        try {
            await Sensor.findByPk(data.MODULE)
            .then(function(response) {
                response.update({
                    NAME: data.NAME
                })
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    }
}