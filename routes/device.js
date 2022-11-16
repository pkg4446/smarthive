const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');
const regist    = require('../controller/device/regist');



router.post('/',async function(req,res) {
        //Device
        let ip = requestIp.getClientIp(req);
        console.log(ip,req.body);
        if(req.body.FARM){
            
        }
        res.send("Post Request ACK");
    });

module.exports = router;