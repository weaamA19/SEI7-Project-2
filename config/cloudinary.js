// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Log the configuration
// console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
      folder: 'CloudinaryDemo',
      allowedFormats: ['jpeg', 'png', 'jpg'],
  }
});

module.exports = {
  storage
};


// module.exports= uploadImage