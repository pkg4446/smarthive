const log_sensor    = require('../../models/log_sensor');
const Sequelize     = require('../module');

module.exports  = {
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