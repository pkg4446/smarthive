const log_sensor    = require('../../models/log_sensor');
const Sequelize     = require('../module');

module.exports  = {
    log_sensor :    async function(data){
        try {
            await log_sensor.create({
                MODULE: data.DEVICE_ID,
                TEMP:   data.TEMP,
                HUMI:   data.HUMI
            });
        } catch (error) {
            console.log(error);
        }        
    },
}