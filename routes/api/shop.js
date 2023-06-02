const express = require('express');
const router  = express.Router();
const image   = require('../../controller/shop/image');
const regist  = require('../../controller/shop/regist');

router.post('/upload/:id', image.upload.fields([{ name: 'images', maxCount: 8 }]),async function (req, res, next) {
  req.body.EMAIL = req.params.id;
  
  const IDX = await regist.item(req.body);

  const response = {
    result: true,
    data:   {IDX:IDX,FILE:0}
  } 

  console.log(req.files);
  if(!req.files){
    for (const img of req.files.images) {
      response.data.FILE++;
      await image.resize(img,req.params.id);
      await regist.pic(IDX,req.body.EMAIL,img.filename);
    }
  }
  return res.json(response);
})

module.exports = router;