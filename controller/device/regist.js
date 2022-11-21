const Farm      = require('../../models/farm');
const Sensor    = require('../../models/sensor');
const Sequelize = require('../module');

module.exports  = {
    regist_farm :   async function(FARM_ID){
        try {
            const farm = await Farm.findByPk(FARM_ID,{raw : true});
            if(!farm){
                await Farm.create({
                    FARM:   FARM_ID
                });
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    farm_ip :       async function(FARM_ID,IP){
        try {
            await Farm.findByPk(FARM_ID)
            .then(function(response) {
                if(response.IP != IP) response.update({IP: IP})
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    regist_sensor : async function(data){
        try {
            const device = await Sensor.findByPk(data.MODULE,{raw : true});
            if(!device){
                await Sensor.create({
                    MODULE: data.MODULE,
                    FARM:   data.FARM,
                });
            }else if(device.FARM != data.FARM){
                await Sensor.findByPk(data.MODULE)
                .then(function(response) {
                    response.update({FARM: data.FARM})
                });
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
}