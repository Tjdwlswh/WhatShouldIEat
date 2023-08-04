import { Router } from 'express';
import multer from 'multer';
import path from 'path';

const imgUploadRouter = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});
const limits = { fieldsize: 5 * 1024 * 1024 };
const filter = (req, file, callback) => {
  const fileType = file.mimetype.split('/')[1];

  if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    callback(null, true);
  } else {
    callback({ message: 'jpg, jpeg, png 확장자만 가능합니다.' }, false);
  }
};

const upload = multer({ storage: storage, limits: limits, fileFilter: filter });

imgUploadRouter.get('/getdata', (req, res, next) => {
  try {
    // JSON 파일의 경로
    const jsonPath = path.join(__dirname, 'data', 'output.json');

    res.status(200).json(require(jsonPath));
    return;
  } catch (err) {
    next(err);
  }
});

imgUploadRouter.get('/uploads/:filename', (req, res, next) => {
  try {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;
    const options = {
      root: path.join('../backend'),
    };
    return res.sendFile(filePath, options);
  } catch (err) {
    next(err);
  }
});

export { upload, imgUploadRouter };
