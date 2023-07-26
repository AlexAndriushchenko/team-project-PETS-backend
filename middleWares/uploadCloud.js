const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    } else if (file.fieldname === "pets-photo") {
      folder = "pets-photo";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: file.originalname,
      transformation: [
        {
          width: 350,
          height: null,
          scale: "both",
        },
      ],
    };
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;

// //controller
// const someFunc = async (req, res) => {
//   const avatarURL = req.file.path;
// };
