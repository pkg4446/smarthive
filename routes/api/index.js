const express   = require('express');
const router    = express.Router();

const read  = require('./read');
const write = require('./write');
router.use('/read', read);
router.use('/write', write);

module.exports = router;