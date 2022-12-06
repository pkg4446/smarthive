const express   = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../user/userMiddlewares');
const router    = express.Router();

const page = require('./page');
const user = require('./user');

router.use('/', isLoggedIn, page);
router.use('/user', user);

module.exports = router;