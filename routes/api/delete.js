const express   = require('express');
const router    = express.Router();

const Delete    = require('../../controller/device/delete');

router.post('/apiary', async function(req, res) {   
    const response = {
        result: true,
        data:   null
    }    
    try {
        response.data = await Delete.apiary(req.body.APIARY);
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
        response.data = await Delete.sensor(req.body.MODULE);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;