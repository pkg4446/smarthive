const Apiary    = require('../../models/apiary');
const Farm      = require('../../models/farm');
const Door      = require('../../models/door');
const Pump      = require('../../models/pump');
const Sensor    = require('../../models/sensor');
const Warehouse = require('../../models/warehouse');
const Log_error     = require('../../models/log_error');
const Log_sensor    = require('../../models/log_sensor');
const Log_sensor_ctrl   = require('../../models/log_sensor_ctrl');
const Log_wh_O3     = require('../../models/log_wh_O3');
const Log_wh_door   = require('../../models/log_wh_door');
const Log_wh_plz    = require('../../models/log_wh_plz');

const Sequelize = require('../module');
const { Op }    = require("sequelize");

module.exports  = {
    regist :   async function(USER_IP){
        try {
            const farm = await Farm.findAll({
                // where: {IP: USER_IP, APIARY:0},
                where: {IP: USER_IP},
                raw : true
            });
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

    apiaryPK :   async function(APIARY){
        try {
            const apiary = await Apiary.findByPk(APIARY,{raw : true});      
            return apiary;
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

    warehouse :   async function(MODULE){
        try {
            const response = await Warehouse.findByPk(MODULE,{raw : true});
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    log_wh_O3:   async function(MODULE){
        try {
            const response = await Log_wh_O3.findAll(
                {where: {WAREHOUSE: MODULE},
                order :[['IDX', 'DESC']],
                limit: 288,
                raw : true
            });
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    log_wh_door:   async function(MODULE){
        try {
            const response = await Log_wh_door.findAll(
                {where: {WAREHOUSE: MODULE},
                order :[['IDX', 'DESC']],
                limit: 288,
                raw : true
            });
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    log_wh_plz:   async function(MODULE){
        try {
            const response = await Log_wh_plz.findAll(
                {where: {WAREHOUSE: MODULE},
                order :[['IDX', 'DESC']],
                limit: 288,
                raw : true
            });
            return response;
        } catch (error) {
            console.log(error);
        }        
    },


    farm :   async function(FARM_ID){
        try {
            const sensors = await Sensor.findAll({where: {FARM: FARM_ID},raw : true});
            for (const iterator of sensors) {
                const data_list = await Log_sensor.findAll({
                    where: {
                        MODULE: iterator.MODULE
                    },
                    limit: 1
                });
                if(data_list.length == 0){
                    await Sensor.destroy({where: {MODULE: iterator.MODULE}});
                }
            }
            const response = {
                ///////////////////////
                farm:   await Farm.findByPk(FARM_ID,{raw : true}),
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
    
    log_sensor:   async function(DATA){
        try {
            const response = await Log_sensor.findAll({
                where: {
                    MODULE: DATA.MODULE,
                    TMST:{[Op.between]:[DATA.START,DATA.END]}
                },
                order :[['IDX', 'DESC']],
                raw : true
            });
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    log_sensor_ctrl:   async function(DATA){
        try {
            const response = await Log_sensor_ctrl.findAll({
                where: {
                    MODULE: DATA.MODULE,
                    TMST:{[Op.between]:[DATA.START,DATA.END]}
                },
                order :[['IDX', 'DESC']],
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