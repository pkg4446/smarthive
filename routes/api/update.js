const express   = require('express');
const router    = express.Router();

const mqtt      = require("../mqtt");
const update    = require("../../controller/device/update");

router.post('/apiary', async function(req, res) {   
    const response = {
        result: true,
        data:   null
    }    
    try {
        if(req.body.NAME && req.body.ADDR){response.data = await update.apiary(req.body);}
        else{response.result = false; response.data = "dataNull";}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/hiveSensorName', async function(req, res) {    
    const response = {
        result: true,
        data:   null
    }
    try {
        if(req.body.NAME) response.data = await update.sensor_name(req.body);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/hiveSensor', async function(req, res) {    
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await update.sensor_set(req.body);
        console.log(response.data.USE,req.body.USE);
        console.log(response.data.SET_TEMP,req.body.TEMP);
        console.log(response.data.SET_HUMI,req.body.HUMI);
        console.log(req.body);
        if(response.data.USE      != req.body.USE){await mqtt.send({TARGET:response.data.FARM, COMMEND:`;S=${req.body.MODULE}=AT+USE=${req.body.USE};`}); console.log("mqtt1");}
        if(response.data.SET_TEMP != req.body.TEMP){await mqtt.send({TARGET:response.data.FARM, COMMEND:`;S=${req.body.MODULE}=AT+TEMP=${req.body.TEMP};`}); console.log("mqtt2");}
        if(response.data.SET_HUMI != req.body.HUMI){await mqtt.send({TARGET:response.data.FARM, COMMEND:`;S=${req.body.MODULE}=AT+HUMI=${req.body.HUMI};`}); console.log("mqtt3");}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/farm', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }    
    console.log(req.body);
    try {
        if(req.body.TYPE == "DELETE"){   response.data  = await update.farm_update(req.body.FARM,"APIARY",0);}
        else if(req.body.TYPE == "NAME"){response.data  = await update.farm_update(req.body.FARM,"NAME",req.body.NAME);}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/warehouse', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }    
    console.log(req.body);
    try {
        if(req.body.TYPE == "MQTT"){ await mqtt.send({TARGET:req.body.MODULE, COMMEND:req.body.COMMEND});}
        else if(req.body.TYPE == "DELETE"){response.data     = await update.warehouse_update(req.body.MODULE,"APIARY",0);}
        else if(req.body.TYPE == "NAME"){response.data  = await update.warehouse_update(req.body.MODULE,"NAME",req.body.NAME);}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;