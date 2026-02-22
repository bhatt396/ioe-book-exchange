// ============================================================
// Cloudinary Configuration
// Configures and exports the Cloudinary SDK instance
// using environment variables for secure credential management.
// ============================================================

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
// NEVER hardcode credentials — always use .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
