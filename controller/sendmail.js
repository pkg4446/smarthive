const nodemailer = require('nodemailer');

module.exports = {
  send    : async function(req, res, user){
    let transporter = nodemailer.createTransport({
      service: 'naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `${process.env.NODEMAILER_USER}@naver.com`,
      to: `${user.USER_EMAIL}`,
      subject: '스마트하이브 플라즈마 비밀번호 변경',
      text: 'PassWord Change',
      html: `<a href="http://smarthive.kr/mail/${user.USER_ID}?token=${user.USER_PASS}">비밀번호 변경</a>`,
    });
    
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'Sent Auth Email',
    });
  },

}//module
