const fcm       = require('../../models/fcm');

const admin   = require('firebase-admin');
const serviceAccount    = JSON.parse(process.env.firebase_adminsdk);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports  = {    

    pushMessege :  async function(DATA){
        try {

            const message = {
                data:{
                    title: DATA.TITLE,
                    body:  DATA.TEXT,
                },
                token: DATA.TOKEN,
            }
            admin
              .messaging()
              .send(message)
              .then(function (response) {
                return true;
              })
              .catch(function (err) {
                  console.log('Error Sending message!!! : ', err)
                  return false;
              });
              
        } catch (error) {
            console.log(error);
            return false;
        }        
    },

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
            let response = false;
            const FCM = await fcm.findByPk(EMAIL,{raw : true});
            if(FCM != null && FCM.TOKEN != undefined){
                response = FCM.TOKEN;
            }
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }        
    },
}