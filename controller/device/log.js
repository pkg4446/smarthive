const log_error     = require('../../models/log_error');
const log_sensor    = require('../../models/log_sensor');
const log_sensor_ctrl   = require('../../models/log_sensor_ctrl');
const log_wh_O3     = require('../../models/log_wh_O3');
const log_wh_door   = require('../../models/log_wh_door');
const log_wh_plz    = require('../../models/log_wh_plz');

module.exports  = {
    log_error :    async function(data){
        try {
            await log_error.create({
                MODULE: data.MODULE,
                FARM:   data.FARM,
                TYPE:   data.TYPE,
                ERR:    data.VALUE1
            });
        } catch (error) {
            console.log(error);
        }
    },

    log_sensor :    async function(data){
        try {
            await log_sensor.create({
                MODULE: data.MODULE,
                TEMP:   data.VALUE1,
                HUMI:   data.VALUE2,
                WATER:  data.VALUE3,
                HONEY:  data.VALUE4,
            });
        } catch (error) {
            console.log(error);
        }
    },

    log_sensor_ctrl :    async function(data){
        try {
            let OPERATION = false;
            if(data.VALUE1 == "ON"){
                OPERATION == true;
            }
            await log_sensor_ctrl.create({
                MODULE:     data.MODULE,
                OPERATION:  OPERATION,
                TYPE:       data.VALUE2
            });
        } catch (error) {
            console.log(error);
        }
    },

    log_wh_O3 :    async function(data){
        try {
            await log_wh_O3.create({
                WAREHOUSE:  data.MODULE,
                O3:         data.DATA,
            });
        } catch (error) {
            console.log(error);
        }
    },

    log_wh_door :   async function(data){
        let door = false;
        if(data.DATA == "OPEN") door = true;
        try {
            await log_wh_door.create({
                WAREHOUSE:  data.MODULE,
                DOOR:       door,
            });
        } catch (error) {
            console.log(error);
        }
    },

    log_wh_plz :   async function(data){
        try {
            await log_wh_plz.create({
                WAREHOUSE:  data.MODULE,
                PLZ:        data.DATA,
            });
        } catch (error) {
            console.log(error);
        }
    },
}