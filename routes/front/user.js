const express   = require('express');
const router    = express.Router();

router.get('/login', async function(req, res) {
    res.render('user/login');
});

router.get('/register', async function(req, res) {
    res.render('user/register');
});

module.exports = router;