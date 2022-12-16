//require('./test');

require('../controller/device/mqtt');
const express   = require('express');
const router    = express.Router();

const user      = require('./user/userAuth');
const device    = require('./device');
const api       = require('./api');
const web       = require('./front');

const demo      = require('./demo');
router.use('/demo',demo);

router.use('/',web);
router.use('/user',user);
router.use('/reg',device);
router.use('/api',api);

module.exports  = router;