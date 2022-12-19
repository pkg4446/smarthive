const Apiary    = require('../../models/apiary');
const Farm      = require('../../models/farm');
const Pump      = require('../../models/pump');
const Sensor    = require('../../models/sensor');
const Warehouse = require('../../models/warehouse');

module.exports  = {
    regist_Apiary : async function(data){
        try {            
            await Apiary.create({
                NAME:     data.NAME,
                USER:     data.USER,
                ADDR:     data.ADDR,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    regist_warehouse : async function(data){
        try {            
            await Warehouse.findByPk(data.WAREHOUSE)
            .then(function(response) {
                response.update({
                    APIARY:     data.APIARY,
                    NAME:       data.NAME,
                })
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    init_warehouse : async function(MAC){
        try {      
            const warehouse = await Warehouse.findByPk(MAC,{raw : true});
            if(!warehouse){
                await Warehouse.create({
                    WAREHOUSE:  MAC
                });
            }      
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    init_farm :   async function(MAC){
        try {
            const farm = await Farm.findByPk(MAC,{raw : true});
            if(!farm){
                await Farm.create({
                    FARM:   MAC
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

    regist_pump : async function(data){
        try {
            const device = await Pump.findByPk(data.MODULE,{raw : true});
            if(!device){
                await Pump.create({
                    MODULE: data.MODULE,
                    FARM:   data.FARM,
                    RUN:    data.VALUE2
                });
            }else if(device.FARM != data.FARM){
                await Pump.findByPk(data.MODULE)
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