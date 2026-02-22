// ============================================================
// Book Routes
// Maps HTTP endpoints to controller functions.
// Uses Cloudinary-backed multer middleware for image uploads.
// ============================================================

const express = require('express');
const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    toggleWishlist,
    getMyBooks,
    getWishlist,
    markAsSold,
} = require('../controllers/bookController');
const { protect } = require('../middleware/auth');
const upload = require('../config/multer'); // Cloudinary-backed multer

const router = express.Router();

// ---- Public routes ----
router.get('/', getBooks);

// ---- Private routes (must be before /:id to avoid conflicts) ----
router.get('/my-books', protect, getMyBooks);
router.get('/wishlist', protect, getWishlist);

// ---- Public route ----
router.get('/:id', getBook);

// ---- Private routes with image upload ----
// upload.single('image') → uploads to Cloudinary, sets req.file
router.post('/', protect, upload.single('image'), createBook);
router.put('/:id', protect, upload.single('image'), updateBook);
router.delete('/:id', protect, deleteBook);
router.post('/:id/wishlist', protect, toggleWishlist);
router.put('/:id/sold', protect, markAsSold);

module.exports = router;
