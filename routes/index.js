const express       = require('express');
const router        = express.Router();

const mqtt          = require('./mqtt');

router.use('/mqtt',mqtt);

module.exports  = router;