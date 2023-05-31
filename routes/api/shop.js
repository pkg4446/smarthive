const express = require('express');
const router  = express.Router();
const image   = require('../../controller/shop/image');
const regist  = require('../../controller/shop/regist');

router.post('/upload/:id', image.upload.fields([{ name: 'images', maxCount: 8 }]),async function (req, res, next) {
  req.body.EMAIL = req.params.id;
  const IDX = await regist.item(req.body);
  for (const img of req.files.images) {
    await image.resize(img,req.params.id);
    await regist.pic(IDX,req.body.EMAIL,img.filename);
  }

  //여기에 DB쓰기

  console.log(req.body);
  return res.json(req.files);
})

module.exports = router;