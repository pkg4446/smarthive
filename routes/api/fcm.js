const express   = require('express');
const router    = express.Router();

const fcm       = require("../../controller/app/fcm");

router.post('/message', async function(req, res) {   
    if(req.body.EMAIL == undefined)  req.body.EMAIL = req.user.EMAIL;
    const response = {
        result: true,
        data:   false
    }    
    try {        
        req.body.TOKEN = await fcm.read(req.body.EMAIL);
        if(req.body.EMAIL && req.body.TITLE && req.body.TEXT && req.body.TOKEN){response.data = await fcm.pushMessege(req.body);}
        else{response.result = false; response.data = false;}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

router.post('/token', async function(req, res) {   
    if(req.body.EMAIL == undefined)  req.body.EMAIL = req.user.EMAIL;
    const response = {
        result: true,
        data:   false
    }    
    try {
        if(req.body.EMAIL && req.body.TOKEN){response.data = await fcm.regist(req.body);}
        else{response.result = false; response.data = false;}
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;