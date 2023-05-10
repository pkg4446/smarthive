const fcm   = require('../../models/fcm');

const Sequelize = require('../module');
const { Op }    = require("sequelize");

module.exports  = {    

    regist :   async function(DATA){
        try {
            const FCM = await fcm.findByPk(DATA.EMAIL,{raw : true});
            if(!FCM){
                await fcm.create({
                    EMAIL:  DATA.EMAIL,
                    TOKEN:  DATA.TOKEN
                });
            }else if(FCM.TOKEN != DATA.TOKEN){
                await fcm.findByPk(DATA.EMAIL)
                .then(function(response) {
                    response.update({
                        TOKEN:     DATA.TOKEN,
                    })
                });
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

    read :   async function(EMAIL){
        try {
            const FCM = await fcm.findByPk(EMAIL,{raw : true});
            return FCM;
        } catch (error) {
            console.log(error);
        }        
    },
}