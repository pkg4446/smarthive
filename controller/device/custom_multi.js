const multi_log     = require('../../models/custom_multi_log');
const multi_sensor  = require('../../models/custom_multi_sensor');

module.exports  = {
    log :    async function(data){
        try {
            await multi_log.create({
                MODULE: data.MODULE,
                TEMP1:   data.TEMP1,
                TEMP2:   data.TEMP2,
                TEMP3:   data.TEMP3,
                TEMP4:   data.TEMP4,
                TEMP5:   data.TEMP5,
                TEMP6:   data.TEMP6,
                TEMP7:   data.TEMP7,
                TEMP8:   data.TEMP8,
                HUMI1:   data.HUMI1,
                HUMI2:   data.HUMI2,
                HUMI3:   data.HUMI3,
                HUMI4:   data.HUMI4,
                HUMI5:   data.HUMI5,
                HUMI6:   data.HUMI6,
                HUMI7:   data.HUMI7,
                HUMI8:   data.HUMI8
            });
        } catch (error) {
            console.log(error);
        }        
    },

    read:   async function(DATA){
        try {
            const response = await multi_log.findAll({
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

    regist : async function(data){
        try {
            const device = await multi_sensor.findByPk(data.MODULE,{raw : true});
            if(!device){
                await multi_sensor.create({
                    MODULE: data.MODULE,
                    FARM:   data.FARM,
                });
            }else if(device.FARM != data.FARM){
                await multi_sensor.findByPk(data.MODULE)
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