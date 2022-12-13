const express   = require('express');
const router    = express.Router();

const read      = require('./read');
const update    = require('./update');
const write     = require('./write');
router.use('/read', read);
router.use('/update', update);
router.use('/write', write);

module.exports = router;