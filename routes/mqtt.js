const express = require('express');
const mqtt    = require('../controller/device/mqtt');
const router  = express.Router();

router.post('/',async function(req,res) {
        //MQTT
        console.log(req.body);
        if(req.body.FARM){

        }
        res.send("Post Request ACK");
    });

module.exports = router;