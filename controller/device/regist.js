const Farm      = require('../../models/farm');
const Device    = require('../../models/device');
const Sequelize = require('../module');

module.exports  = {
    regist_farm :   async function(FARM_ID){
        try {
            const farm = await Farm.findByPk(FARM_ID,{raw : true});
            if(!farm){
                await farm.create({
                    FARM:   data.FARM_ID
                  });
            }
        } catch (error) {
            console.log(error);
        }        
    },

    regist_device : async function(data){
        try {
            const device = await Device.findByPk(data.DEVICE_ID,{raw : true});
            if(device){
                await Device.create({
                    MODULE: data.DEVICE_ID,
                    FARM:   data.FARM_ID,
                  });
            }
        } catch (error) {
            console.log(error);
        }
    },
}