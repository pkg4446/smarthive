require('../controller/device/mqtt');
const express   = require('express');
const router    = express.Router();

const device    = require('./device');
const web     = require('./front');

router.use('/',device);
router.use('/web',web);

module.exports  = router;