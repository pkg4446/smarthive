const express = require('express')
const router  = express.Router();

const multer  = require('multer')

const path = require('path');
const fs = require('fs');

try {
  fs.readdirSync('image');
} catch (error) {
  fs.mkdirSync('image');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.readdirSync('image/'+req.params.id);
    } catch (error) {
      fs.mkdirSync('image/'+req.params.id);
    }
    cb(null, 'image/'+req.params.id);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "_" + Date.now() + ext);
  }
});

const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 5 * 1024 * 1024 } 
});

router.post('/img/:id', upload.fields([{ name: 'images', maxCount: 8 }]), function (req, res, next) {
  // req.file 은 `avatar` 라는 필드의 파일 정보입니다.
  // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
  return res.json(req.body);
})

module.exports = router;