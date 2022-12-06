const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');

const read      = require("../../controller/device/read");

const APIARY    = 0;
const FARM      = "94:B9:7E:42:2E:80";
const NAME      = "신규등록";
const MODULE    = "3951267849";

router.get('/init', async function(req, res) {    
    const IP  = requestIp.getClientIp(req);
    const response = await read.regist(IP);
    res.render('page/test',{data:response});
});

router.get('/apiary', async function(req, res) {
    res.render('regist/apiary');
});

router.get('/apiaryList', async function(req, res) {
    const response = await read.apiary(req.user.EMAIL);
    res.render('read/apiary',{data:response});
});

router.get('/farm', async function(req, res) {
    const response = await read.farm(FARM);
    res.render('page/test',{data:response});
});

router.get('/hive', async function(req, res) {
    const response = await read.hive(NAME);
    res.render('page/test',{data:response});
});

router.get('/sensor_log', async function(req, res) {
    const response = await read.log_sensor(MODULE);
    res.render('page/test',{data:response});
});

router.get('/error_log', async function(req, res) {
    const response = await read.log_error(FARM);
    res.render('page/test',{data:response});
});

router.get('/error_device', async function(req, res) {
    let response = await read.sensor(MODULE);
    res.render('page/test',{data:response});
});

module.exports = router;