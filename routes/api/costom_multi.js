const express   = require('express');
const router    = express.Router();

const multi     = require("../../controller/device/custom_multi");
const requestIp = require('request-ip');

router.post('/log', async function(req, res) {   
    const response = {
        result: true,
        data:   null
    }    
    try {
        console.log(req.body);
        if(req.body.MODULE){            
            req.body.FARM = requestIp.getClientIp(req);
            response.data = await multi.regist(req.body);
            await multi.log(req.body);
        }else{response.result = false; response.data = "dataNull";}
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