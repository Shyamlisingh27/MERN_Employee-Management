const multer = require('multer');

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/");        //iss uploads naam ke folder m store hoga
},
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
