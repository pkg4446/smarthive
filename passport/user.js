const User = require('../models/user');

module.exports = {
  info: async function(data){
    try {
      const userInfo = await User.findOne({
        where: { USER_EMAIL },
        attributes: {
          exclude: ['USER_PASS','USER_NAME','USER_GENDER','USER_B_DAY'], // exclude: 제외한 나머지 정보 가져오기
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
        USER_EMAIL:,
        USER_NICK:,
        USER_GENDER :,
        USER_B_DAY:,
        USER_PASS:,
      }
      */
      const hash = await bcrypt.hash(data.USER_PASS, 12);
      await User.create({
        USER_EMAIL:   USER_EMAIL,
        USER_NICK:    USER_NICK,
        USER_GENDER:  USER_GENDER,
        USER_B_DAY:   USER_B_DAY,
        USER_PASS:    hash
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
        USER_EMAIL,
        USER_PASS:,
      }
      */
      const hash = await bcrypt.hash(data.USER_PASS, 12);
      await User.update(
        { 
          USER_PASS:  data.USER_NEW_PASS
        },
        { where: { USER_EMAIL : data.USER_EMAIL }}
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
        USER_EMAIL,
        USER_PASS:,
      }
      */
      let passFail = false;
      await User.findOne({ where: { USER_EMAIL } })
      .then(async function(responce){
        passFail = await bcrypt.compare(data.USER_PASS,responce.USER_PASS);
      });
      
      await User.update(
        { 
          USER_PASS:  data.USER_PASS
        },
        { where: { USER_EMAIL : data.USER_EMAIL }}
      );
      return true;
    } catch (error) {
      console.error(error);
    }    
  }


}
