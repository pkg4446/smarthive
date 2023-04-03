const express   = require('express');
const router    = express.Router();

const multi     = require("../../controller/device/custom_multi");
const requestIp = require('request-ip');

router.post('/log', async function(req, res) {   
    const response = {
        result: true,
        data:   null
    }    
    try {
        if(req.body.MODULE){            
            req.body.FARM = requestIp.getClientIp(req);
            response.data = await multi.regist(req.body);
            await multi.log(req.body);
        }else{response.result = false; response.data = "dataNull";}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/read', async function(req, res) {   
    const response = {
        result: true,
        data:   null
    }    
    try {
        if(req.body.MODULE && req.body.START && req.body.END){            
            response.data = await multi.read(req.body);
        }else{response.result = false; response.data = "dataNull";}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;