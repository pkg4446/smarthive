const express   = require('express');
const router    = express.Router();

const multi     = require("../../controller/device/custom_multi");
const requestIp = require('request-ip');

router.post('/log', async function(req, res) {   
    const response = {
        result: true,
        data:   new Date(),
        temp:   1,
        sen:    1,
    }    
    try {
        if(req.body.MODULE){            
            req.body.FARM = requestIp.getClientIp(req);
            response.sen  = await multi.regist(req.body);
            await multi.log(req.body);
        }else{response.result = false; response.data = "dataNull";}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/run', async function(req, res) {   
    const response = {
        result: true,
    }    
    try {
        if(req.body.MODULE){
            await multi.run(req.body);
        }else{response.result = false; response.data = "dataNull";}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/device', async function(req, res) {   
    const response = {
        result: true,
        data:   null
    }    
    try {
        /*
        if(!req.body.IP){
            req.body.IP = requestIp.getClientIp(req);
        }
        */
        response.data = await multi.device(req.body.TYPE);
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

router.post('/rename', async function(req, res) {   
    const response = {
        result: true,
        data:   null
    }    
    try {
        if(req.body.MODULE && req.body.NAME){            
            response.data = await multi.rename(req.body);
        }else{response.result = false; response.data = "dataNull";}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;