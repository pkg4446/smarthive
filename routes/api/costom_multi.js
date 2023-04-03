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
        if(req.body.MODULE){            
            if(!req.body.END){
                req.body.END    = new Date();
                req.body.START  = new Date();
                req.body.START.setDate(req.body.END.getDate()-1);
            }
            response.data = await multi.read(req.body);
        }else{response.result = false; response.data = "dataNull";}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;