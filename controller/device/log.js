const log_error     = require('../../models/log_error');
const log_sensor    = require('../../models/log_sensor');
const Sequelize     = require('../module');

module.exports  = {
    log_error :    async function(data){
        try {
            await log_error.create({
                MODULE: data.MODULE,
                FARM:   data.FARM,
                TYPE:   data.TYPE,
                ERR:    data.VALUE2
            });
        } catch (error) {
            console.log(error);
        }        
    },

    log_sensor :    async function(data){
        try {
            await log_sensor.create({
                MODULE: data.MODULE,
                TEMP:   data.VALUE1*100,
                HUMI:   data.VALUE2*100
            });
        } catch (error) {
            console.log(error);
        }        
    },
}