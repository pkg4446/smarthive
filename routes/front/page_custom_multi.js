const express   = require('express');
const router    = express.Router();

router.get('/main', async function(req, res) {    
    res.render('exam/main');
});

router.get('/generic', async function(req, res) {    
    res.render('exam/generic');
});

router.get('/elements', async function(req, res) {    
    res.render('exam/elements');
});

module.exports = router;