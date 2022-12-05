const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');

const read      = require("../../controller/device/read");

router.post('/init', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        const IP  = requestIp.getClientIp(req);
        response.data = await read.regist(IP);
    } catch (error) {
        console.error(err);
        response.result = false;
    }
    return res.json(response);
});

router.post('/mac', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await read.regist_mac(req.body.MAC_ADDR);
    } catch (error) {
        console.error(err);
        response.result = false;
    }
    return res.json(response);
});

router.post('/user', async function(req, res) {
    const response = {
        result: true,
        data:   null
    }
    try {
        response.data = await read.user(req.body.USER);
    } catch (error) {
        console.error(err);
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
    } catch (error) {
        console.error(err);
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
        console.error(err);
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
        response.data = await read.log_sensor(req.body.MODULE);
    } catch (error) {
        console.error(err);
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
        console.error(err);
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
        console.error(err);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;