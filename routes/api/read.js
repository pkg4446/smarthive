const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');

const mqtt      = require("../mqtt");
const read      = require("../../controller/device/read");

router.post('/apiary', async function(req, res) {    
    if(req.body.USER == undefined)  req.body.USER = req.user.EMAIL;
    const response = {
        result: true,
        data:   null
    }    
    try {
        response.data = await read.apiary(req.body.USER);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/apiaryGroup', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }    
    try {
        response.data = await read.apiaryGroup(req.body.APIARY);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});



router.post('/farmIP', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        const IP  = requestIp.getClientIp(req);
        response.data = await read.regist(IP);
        console.log(IP, req.body);
        for (const iterator of response.data) {
            await read.regist_change(iterator.FARM,req.body.APIARY);
        }        
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
    try {
        response.data = await read.farm(req.body.FARM);
        // await mqtt.send({TARGET:response.data.farm.FARM, COMMEND:`;S=connecting=AT=1;`});
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/hive', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await read.hive(req.body.NAME);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/sensor', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await read.sensor(req.body.MODULE);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/sensor_log', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        console.log(req.body);
        if(!req.body.END){
            const now       = new Date();
            req.body.END    = new Date();
            req.body.START  = new Date();
            req.body.START.setDate(now.getDate()-1);
            req.body.END.setDate(now.getDate()+1);
        }else{
            const now       = new Date(req.body.END);
            req.body.END    = new Date(req.body.END);
            req.body.END.setDate(now.getDate()+1);
        }
        response.data = {
            value : await read.log_sensor(req.body),
            ctrl  : await read.log_sensor_ctrl(req.body),
        };
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/sensor_log_day', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await read.log_sensor(req.body);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/error_log_all', async function(req, res) {    
    if(req.body.USER == undefined)  req.body.USER = req.user.EMAIL;
    const response = {
        result: true,
        data:   null
    }    
    try {
        const area  = await read.apiary(req.body.USER);
        response.data = [];
        const group = await read.apiaryGroup(area.APIARY);
        for (const iterator1 of group.farm) {
            const errorLog = await read.log_error(iterator1.FARM);
            for (const iterator2 of errorLog) {
                response.data.push(iterator2);
            }
        }
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/error_log', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await read.log_error(req.body.FARM);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/error_device', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        console.log(req.body);
        if(req.body.TYPE == "SENSOR"){response.data = await read.sensor(req.body.MODULE);}
        else if(req.body.TYPE == "DOOR"){}
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
    try {
        response.data = await read.warehouse(req.body.WAREHOUSE);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/warehouse_O3', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await read.log_wh_O3(req.body.WAREHOUSE);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/warehouse_door', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await read.log_wh_door(req.body.WAREHOUSE);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/warehouse_plz', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await read.log_wh_plz(req.body.WAREHOUSE);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});
module.exports = router;