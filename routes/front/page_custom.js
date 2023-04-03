const express   = require('express');
const router    = express.Router();

router.get('/multi', async function(req, res) {    
    res.render('custom/test');
});

module.exports = router;