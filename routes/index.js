//require('./test');

require('../controller/device/mqtt');
const express   = require('express');
const router    = express.Router();

const device    = require('./device');
const api       = require('./api');
const web       = require('./front');

router.use('/',device);
router.use('/api',api);
router.use('/web',web);

module.exports  = router;