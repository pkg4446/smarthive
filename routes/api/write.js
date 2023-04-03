const express   = require('express');
const router    = express.Router();

const regist    = require("../../controller/device/regist");

router.post('/apiary', async function(req, res) {    
    if(req.body.USER == undefined)  req.body.USER = req.user.EMAIL;
    const response = {
        result: true,
        data:   null
    }    
    try {
        if(req.body.NAME && req.body.ADDR){response.data = await regist.regist_Apiary(req.body);}
        else{response.result = false; response.data = "dataNull";}
    } catch (error) {
        console.error(error);
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
        response.data = await regist.regist_warehouse(req.body);
    } catch (error) {
        console.error(error);
        response.result = false;
    }
    return res.json(response);
});

module.exports = router;