const Apiary    = require('../../models/apiary');
const Sensor    = require('../../models/sensor');


module.exports  = {

    apiary :   async function(APIARY){
        try {
            const apiary = await Apiary.destroy({where: {APIARY:APIARY}});
            return apiary;
        } catch (error) {
            console.log(error);
        }        
    }

}