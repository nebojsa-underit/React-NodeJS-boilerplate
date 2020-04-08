const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
}
aws.config.update({
  secretAccessKey: 's02Oqav9ENKqXO76vLv2p4k9oBzm9MSVC7qM4GSd',
  accessKeyId: 'AKIAJAZLNIWXS5ZSWWZQ',
  region: 'eu-central-1'
});

const s3 = new aws.S3();

const downloadFile = (filePath = "https://media-biro-s3-bucket.s3.eu-central-1.amazonaws.com/bobDarzi-1581597163856.jpg", key = "bobDarzi-1581597163856.jpg") => {
  const params = {
    Bucket:"media-biro-s3-bucket",
    Key: key
  };
  s3.getObject(params, (err, data) => {
    if (err) console.error(err);
    fs.writeFileSync(filePath, data.Body.toString());
  });
};

module.exports = downloadFile;
