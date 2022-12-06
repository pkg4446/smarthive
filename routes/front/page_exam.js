const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');

const read      = require("../../controller/device/read");

const APIARY    = 0;
const FARM      = "94:B9:7E:42:2E:80";
const NAME      = "신규등록";
const MODULE    = "3951267849";

router.get('/main', async function(req, res) {    
    res.render('exam/main');
});

router.get('/generic', async function(req, res) {    
    res.render('exam/generic');
});

router.get('/elements', async function(req, res) {    
    res.render('exam/elements');
});

module.exports = router;