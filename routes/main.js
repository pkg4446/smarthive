const express = require('express');
const router  = express.Router();

router.post('/',async function(req,res) {
        console.log(req.body);
        res.send("Post Request ACK");
    });

module.exports = router;