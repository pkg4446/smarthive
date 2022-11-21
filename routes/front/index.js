const express   = require('express');
const router    = express.Router();

const page = require('./page');
router.use('/', page);

module.exports = router;