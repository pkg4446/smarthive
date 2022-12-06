const bcrypt  = require('bcrypt');
const User = require('../models/user');

module.exports = {
  info: async function(data){
    try {
      const userInfo = await User.findOne({
        where: { EMAIL: data.EMAIL },
        attributes: {
          exclude: ['PASS'], // exclude: 제외한 나머지 정보 가져오기
        },
        raw : true
      });
      if(!userInfo)return false;
      return userInfo;
    } catch (error) {
      console.error(error);
      return false;
    }    
  },

  join: async function(data){
    try {
      /*
      data = {
        EMAIL:,
        NAME:,
        PASS :,
        CALL :
      }
      */
      const hash = await bcrypt.hash(data.PASS, 12);
      await User.create({
        EMAIL:  data.EMAIL,
        NAME:   data.NAME,
        CALL:   data.CALL,
        PASS:   hash
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }    
  },

  passChange: async function(data){
    try {
      /*
      data = {
        EMAIL,
        PASS:,
      }
      */
      const hash = await bcrypt.hash(data.PASS, 12);
      await User.update(
        { 
          PASS:  data.NEW_PASS
        },
        { where: { EMAIL : data.EMAIL }}
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }    
  },

  passCheck: async function(data){
    try {
      /*
      data = {
        EMAIL,
        PASS:,
      }
      */
      let passFail = false;
      await User.findOne({ where: { EMAIL } })
      .then(async function(responce){
        passFail = await bcrypt.compare(data.PASS,responce.PASS);
      });
      
      return passFail;
    } catch (error) {
      console.error(error);
    }    
  },

  loginAPP: async function(data){    
    console.log(data);
    try {
      const response = {
        result: false,
        data: {
          EMAIL: null,
          NAME:  null,
          CALL:  null,
        }
      }
      await User.findOne({ where: { EMAIL: data.EMAIL },raw : true })
      .then(async function(res){
        response.result = await bcrypt.compare(data.PASS,res.PASS);
        if(response.result){
          response.data.EMAIL = res.EMAIL;
          response.data.NAME  = res.NAME;
          response.data.CALL  = res.CALL;
        }
      });
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }    
  },

}
