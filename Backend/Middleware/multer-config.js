const multer = require('multer');

// Configure multer to store images in a 'uploads' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save the uploaded files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Append the date to the file name
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
