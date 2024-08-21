const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');
const regist    = require('../controller/device/regist');
const update    = require('../controller/device/update');
const log       = require('../controller/device/log');
const mqtt      = require("./mqtt");

router.route('/hive')
    .post(async (req, res)    => {
        //Device
        if(req.body.FARM){
            const IP  = requestIp.getClientIp(req);
            await regist.farm_ip(req.body.FARM,IP);
            switch (req.body.TYPE) {
                case "SENSOR":                    
                    await regist.regist_sensor(req.body);                    
                    if(req.body.COMMEND == "ERR"){
                        await log.log_error(req.body);
                        await update.sensor_error(req.body.MODULE,req.body.VALUE1);
                    }else if(req.body.COMMEND == "SET"){
                        await update.sensor_confirm(req.body.MODULE);
                    }else if(req.body.COMMEND == "CNT"){
                        await log.sensor_echo_test(req.body.MODULE);
                    }else if(req.body.COMMEND == "RELAY"){                        
                        await log.log_sensor_ctrl(req.body);
                    }else if(req.body.COMMEND == "LOG"){
                        req.body.VALUE1=req.body.VALUE1.replace(';','');
                        req.body.VALUE2=req.body.VALUE2.replace(';','');;
                        req.body.VALUE3=req.body.VALUE3.replace(';','');;
                        req.body.VALUE4=req.body.VALUE4.replace(';','');;
                        if(!req.body.VALUE3)req.body.VALUE3=0;
                        if(!req.body.VALUE4)req.body.VALUE4=0;
                        await log.log_sensor(req.body);
                    }
                    //sensor update mqtt
                    let ctrl_update = await update.sensor_state(req.body.MODULE);
                    if(ctrl_update.USE)  await mqtt.send({TARGET:ctrl_update.FARM, COMMEND:`;S=${req.body.MODULE}=AT+USE=${ctrl_update.SET_USE};`});
                    if(ctrl_update.TEMP) await mqtt.send({TARGET:ctrl_update.FARM, COMMEND:`;S=${req.body.MODULE}=AT+TEMP=${ctrl_update.SET_TEMP};`});
                    if(ctrl_update.HUMI) await mqtt.send({TARGET:ctrl_update.FARM, COMMEND:`;S=${req.body.MODULE}=AT+HUMI=${ctrl_update.SET_HUMI};`});
                    //sensor update mqtt
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