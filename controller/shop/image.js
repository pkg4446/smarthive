
const multer  = require('multer');
const sharp   = require('sharp');
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
            fs.readdirSync('image/'+req.params.id+'/origin');
            fs.readdirSync('image/'+req.params.id+'/convert');
        } catch (error) {
            fs.mkdirSync('image/'+req.params.id);
            fs.mkdirSync('image/'+req.params.id+'/origin');
            fs.mkdirSync('image/'+req.params.id+'/convert');
        }
        cb(null, 'image/'+req.params.id+'/origin');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "_" + Date.now() + ext);
    }
});

module.exports  = {     
    upload  : multer({ 
        storage: storage, 
        limits: { fileSize: 8 * 1024 * 1024 } 
    }),

    resize  : async function(image,email){
        try {
            sharp(image.path)  // 압축할 이미지 경로
              .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
              .withMetadata()	// 이미지의 exif데이터 유지
              .toBuffer((err, buffer) => {
                if (err) throw err;
                const savepath = "image/"+email+"/convert/"+image.filename;
                fs.writeFile(savepath, buffer, (err) => {
                  if (err) throw err;
                });      
              });              
          } catch (err) {
            console.log(err);
          }     
    },

}