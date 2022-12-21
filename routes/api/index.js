const express   = require('express');
const router    = express.Router();

const read      = require('./read');
const update    = require('./update');
const write     = require('./write');
const del       = require('./delete');
router.use('/read', read);
router.use('/update', update);
router.use('/write', write);
router.use('/delete', del);

module.exports = router;