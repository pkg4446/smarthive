const express   = require('express');
const router    = express.Router();

const mqtt      = require('../controller/device/mqtt');
const device    = require('./device');

router.use('/',device);

module.exports  = router;