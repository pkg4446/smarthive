const express       = require('express');
const router        = express.Router();

const main          = require('./main');
const mqtt          = require('./mqtt');

router.use('/',main);
router.use('/mqtt',mqtt);

module.exports  = router;