const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');
const regist    = require('../controller/device/regist');
const log       = require('../controller/device/log');



router.post('/',async function(req,res) {
        //Device
        console.log(req.body);
        if(req.body.FARM){
            let IP  = requestIp.getClientIp(req);
            await regist.farm_ip(req.body.FARM,IP);
            switch (req.body.TYPE) {
                case "SENSOR":
                    await regist.regist_sensor(req.body);
                    if(req.body.VALUE1 == "ERR"){}
                    else{await log.log_sensor(req.body);}
                    break;            
                default:
                    break;
            }           
        }
        res.send("Post Request ACK");
    });

module.exports = router;