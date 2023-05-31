const express = require('express');
const router  = express.Router();
const image   = require('../../controller/shop/image');

router.post('/upload/:id', image.upload.fields([{ name: 'images', maxCount: 8 }]), function (req, res, next) {

  for (const img of req.files.images) {
    image.resize(img,req.params.id);
  }

  //여기에 DB쓰기

  console.log(req.body);
  return res.json(req.files);
})

module.exports = router;