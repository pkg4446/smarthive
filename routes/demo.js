const express   = require('express');
const router    = express.Router();

const log_wh_O3     = require('../models/log_wh_O3');
const log_wh_door   = require('../models/log_wh_door');


    
router.get('/O3', async function(req, res) {   
    try {
        const response = await log_wh_O3.findAll({limit:100,  order: [['IDX', 'desc']]});
        res.render('read/demo_O3',{data:response});
    } catch (error) {
        res.sendStatus(404);
    }
});

router.get('/DOOR', async function(req, res) {   
    try {
        const response = await log_wh_door.findAll({limit:100,  order: [['IDX', 'desc']]});
        res.render('read/demo_Door',{data:response});
    } catch (error) {
        res.sendStatus(404);
    }
});


    
module.exports = router;