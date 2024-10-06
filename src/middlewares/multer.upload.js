import multer from 'multer';
import filepath from 'filepath';

const path = filepath.create();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${path}\\src\\public\\temp`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage });
export { upload };
