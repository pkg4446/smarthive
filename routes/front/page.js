const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');

const read      = require("../../controller/device/read");

router.get('/apiary', async function(req, res) {
    res.render('regist/apiary');
});
router.post('/apiaryUpdate', async function(req, res) {
    console.log("apiaryUpdate",req.body);
    const response  = await read.apiaryPK(req.body.APIARY);
    res.render('modify/apiary',{data:response});
});
router.get('/apiaryList', async function(req, res) {
    const response  = await read.apiary(req.user.EMAIL);
    res.render('read/apiary',{data:response});
});

router.post('/warehouse', async function(req, res) {
    const response  = await read.warehouse(req.body.MAC);
    const logData = {
        O3:     await read.log_wh_O3(req.body.MAC),
        DOOR:   await read.log_wh_door(req.body.MAC),
        PLZ:    await read.log_wh_plz(req.body.MAC)
    }    
    console.log(response,logData);
    res.render('read/warehouse',{data:response,logs:logData});
});

router.post('/hive', async function(req, res) {
    const response  = await read.farm(req.body.MAC);
    res.render('read/farm',{data:response});
});

router.post('/hiveSensor', async function(req, res) {
    const response  = {
        DEV: await read.sensor(req.body.MODULE),
        LOG: await read.log_sensor(req.body.MODULE)
    }
    res.render('read/sensor',{data:response});
});


module.exports = router;