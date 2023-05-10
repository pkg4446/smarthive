const express   = require('express');
const router    = express.Router();

const read      = require('./read');
const update    = require('./update');
const write     = require('./write');
const del       = require('./delete');
const fcm       = require('./fcm');

router.use('/read', read);
router.use('/update', update);
router.use('/write', write);
router.use('/delete', del);
router.use('/fcm', fcm);

const costom    = require('./costom_multi');
router.use('/costom', costom);

module.exports = router;