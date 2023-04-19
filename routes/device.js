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
                    }else if(req.body.VALUE1 == "ON" || req.body.VALUE1 == "OFF"){                        
                        await log.log_sensor_ctrl(req.body);
                    }else{
                        await log.log_sensor(req.body);
                    }
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
        if(req.body.TYPE == "O3"){
            await log.log_wh_O3(req.body);            
        }else if(req.body.TYPE == "DOOR"){
            await log.log_wh_door(req.body); 
        }else if(req.body.TYPE == "PLZ"){
            await log.log_wh_plz(req.body); 
        }
        res.send("Post Request ACK");
    });

    
module.exports = router;