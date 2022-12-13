const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');
const regist    = require('../controller/device/regist');
const update    = require('../controller/device/update');
const log       = require('../controller/device/log');

router.route('/hive')
    .post(async (req, res, next)    => {
        //Device
        if(req.body.FARM){
            const IP  = requestIp.getClientIp(req);
            await regist.farm_ip(req.body.FARM,IP);
            switch (req.body.TYPE) {
                case "SENSOR":                    
                    await regist.regist_sensor(req.body);
                    if(req.body.VALUE1 == "ERR"){
                        await log.log_error(req.body);
                        await update.sensor_error(req.body.MODULE,req.body.VALUE2);
                    }else if(req.body.VALUE1 == "SET"){
                        await update.sensor_confirm(req.body.MODULE);
                    }else{await log.log_sensor(req.body);}
                    break;
                case "PUMP":  
                    await regist.regist_pump(req.body);
                    if(true){
                        console.log("route/device.js: PUMP");
                    }
                    break;
                default:
                    break;
            }           
        }
        res.send("Post Request ACK");
    });

    router.post('/save', async function(req, res) {    
        const IP  = requestIp.getClientIp(req);
        console.log(req.body,IP);
    });

    
module.exports = router;