const express   = require('express');
const router    = express.Router();

const fcm       = require("../../controller/app/fcm");

router.post('/custom_push', async function(req, res) {   
    const response = {
        result: true,
        data:   false
    }    
    try {
        req.body.TOKEN = "fVrTw-MLSYKOimQRyX57W5:APA91bHSeDOXVoySNkzR0c5RviTSYZ7Ls_pyTyRHZ3w6DkYOKpMWjiMdknW5mBZVF0T_1SY5xdzctCkDz_7PHT7DjfDvX2PVwe-8m2QYNF4bSxUZfYDG8Hr5AIk6dQ8ve3v846Q29zED";
        response.data = await fcm.pushMessege(req.body);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

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