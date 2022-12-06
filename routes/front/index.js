const express   = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../user/userMiddlewares');
const router    = express.Router();

const page = require('./page');
const user = require('./user');

router.get('/', async function(req, res) {    
    res.render('page/main');
});
router.use('/page', isLoggedIn,     page);
router.use('/user', isNotLoggedIn,  user);

module.exports = router;