const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');

const read      = require("../../controller/device/read");

router.get('/apiary', async function(req, res) {
    res.render('regist/apiary');
});
router.post('/apiaryUpdate', async function(req, res) {
    console.log("apiaryUpdate",req.body);
    const response = await read.apiaryPK(req.body.APIARY);
    res.render('modify/apiary',{data:response});
});
router.get('/apiaryList', async function(req, res) {
    const response = await read.apiary(req.user.EMAIL);
    res.render('read/apiary',{data:response});
});

router.post('/hive', async function(req, res) {
    const response = await read.farm(req.body.MAC);
    res.render('read/farm',{data:response});
});

router.post('/hiveSensor', async function(req, res) {
    const response = {
        DEV: await read.sensor(req.body.MODULE),
        LOG: await read.log_sensor(req.body.MODULE)
    }
    res.render('read/sensor',{data:response});
});


module.exports = router;