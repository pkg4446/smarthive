const express   = require('express');
const router    = express.Router();

const update    = require("../../controller/device/update");

router.post('/hiveSensorName', async function(req, res) {    
    const response = {
        result: true,
        data:   null
    }
    try {
        if(req.body.NAME) response.data = await update.sensor_name(req.body);
    } catch (error) {
        console.error(err);
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
        console.error(err);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;