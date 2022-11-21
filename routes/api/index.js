const express   = require('express');
const router    = express.Router();

const read = require('./read');
router.use('/read', read);

module.exports = router;