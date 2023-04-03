const express   = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../user/userMiddlewares');
const router    = express.Router();

const user = require('./user');

const page = require('./page');
const exam = require('./page_exam');
const custom    = require('./page_custom');

router.get('/', async function(req, res) {    
    res.render('page/main');
});
router.use('/user', isNotLoggedIn,  user);

router.use('/page', isLoggedIn,     page);
router.use('/exam', exam);
router.use('/custom', custom);

module.exports = router;