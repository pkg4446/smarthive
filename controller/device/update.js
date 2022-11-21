const Sensor    = require('../../models/sensor');
const Sequelize = require('../module');

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
}