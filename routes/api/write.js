const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');

const regist    = require("../../controller/device/regist");

router.post('/apiary', async function(req, res) {    
    if(req.body.USER == undefined)  req.body.USER = req.user.EMAIL;
    const response = {
        result: true,
        data:   null
    }    
    try {
        response.data = await regist.regist_Apiary(req.body);
    } catch (error) {
        console.error(err);
        response.result = false;
    }
    return res.json(response);
});

router.post('/warehouse', async function(req, res) {
    if(req.body.USER == undefined)  req.body.USER = req.user.EMAIL;
    const response = {
        result: true,
        data:   null
    }    
    try {
        response.data = await regist.regist_farm(req.body);
    } catch (error) {
        console.error(err);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;