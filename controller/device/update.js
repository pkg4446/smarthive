const Sensor    = require('../../models/sensor');

module.exports  = {
    sensor_error :  async function(MODULE,ERR){
        try {
            let CODE;
            switch (ERR) {
                case "SHT31":
                    CODE = "센서오류";
                    break;
                case "WATER":
                    CODE = "급수오류";
                    break;
                case "TEMP":
                    CODE = "이상고온";
                    break;            
                default:
                    CODE = "정상";
                    break;
            }
            await Sensor.findByPk(MODULE)
            .then(function(response) {
                response.update({STATE: CODE})
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    sensor_confirm :  async function(MODULE){
        try {
            await Sensor.findByPk(MODULE)
            .then(function(response) {
                response.update({
                    USE:        response.PRE_USE,
                    SET_TEMP:   response.PRE_TEMP,
                    SET_HUMI:   response.PRE_HUMI
                })
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    sensor_set :  async function(data){
        try {
            await Sensor.findByPk(data.MODULE)
            .then(function(response) {
                response.update({
                    PRE_USE:    response.USE,
                    PRE_TEMP:   response.SET_TEMP,
                    PRE_HUMI:   response.SET_HUMI
                })
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    sensor_name :  async function(data){
        try {
            await Sensor.findByPk(data.MODULE)
            .then(function(response) {
                response.update({
                    NAME: data.NAME
                })
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },
}