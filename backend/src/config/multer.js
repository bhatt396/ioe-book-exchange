// ============================================================
// Multer + Cloudinary Storage Configuration
// Uploads images directly to Cloudinary via multer middleware.
// Images are stored in the "reread-ioe-books" folder on Cloudinary.
// Only jpg, jpeg, png formats are allowed. Max file size: 5MB.
// ============================================================

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'reread-ioe-books', // Cloudinary folder name
        allowed_formats: ['jpg', 'jpeg', 'png'], // Restrict to these formats
        transformation: [
            { width: 800, height: 1000, crop: 'limit' }, // Optimize: max dimensions
            { quality: 'auto' }, // Auto quality optimization
            { fetch_format: 'auto' }, // Auto format (webp where supported)
        ],
    },
});

// File filter — additional validation layer before Cloudinary upload
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error('Invalid file type. Only JPG, JPEG, and PNG images are allowed.'),
            false
        );
    }
};

// Create multer upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max file size
    },
});

module.exports = upload;
