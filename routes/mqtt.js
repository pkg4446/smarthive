const express = require('express');
const mqtt    = require('../controller/device/mqtt');
const router  = express.Router();

router.post('/',async function(req,res) {
        res.json(await mqtt.send(req.body)); 
    });

module.exports = router;