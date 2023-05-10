const Whisper   = require('../../models/whisper');

const Sequelize = require('../module');
const { Op }    = require("sequelize");

module.exports  = {    
    read:   async function(DATA){
        try {
            const response = await Whisper.findAll({
                where: {[Op.or]: [
                    {SEND: DATA.SEND, RECV: DATA.RECV, READ: 0}, 
                    {SEND: DATA.RECV, RECV: DATA.SEND, READ: 0}
                ]},
                order :[['IDX', 'DESC']],
                raw : true,
            });
            return response;
        } catch (error) {
            console.log(error);
        }        
    },

    write : async function(DATA){
        try {            
            await Whisper.create({
                SEND:     DATA.SEND,
                RECV:     DATA.RECV,
                TEXT:     DATA.TEXT,
                READ:     DATA.READ,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
}