const express   = require('express');
const router    = express.Router();

router.get('/multi', async function(req, res) {    
    res.render('custom/multi');
});

module.exports = router;