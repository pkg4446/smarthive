const log_wh_O3     = require('../models/log_wh_O3');
const log_wh_door   = require('../models/log_wh_door');

module.exports  = {
    log_O3 :    async function(data){
        try {
            const timestamp = new Date(data.YEAR, data.MONTH, data.DAY, data.HOUR, data.MIN, data.SEC);
            await log_wh_O3.create({
                WAREHOUSE: data.WAREHOUSE,
                O3:     data.DATA*100,
                TMST:   timestamp
            });
        } catch (error) {
            console.log(error);
        }        
    },

    log_door :   async function(data){
        try {
            const timestamp = new Date(data.YEAR, data.MONTH, data.DAY, data.HOUR, data.MIN, data.SEC);
            console.log(timestamp);
            await log_wh_door.create({
                WAREHOUSE: data.WAREHOUSE,
                DOOR:   data.DATA,
                TMST:   timestamp
            });
        } catch (error) {
            console.log(error);
        }        
    },
}