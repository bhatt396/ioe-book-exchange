// ============================================================
// Book Controller
// Handles all CRUD operations for book listings.
// Images are uploaded to Cloudinary and only the URL is
// stored in MongoDB. On delete/update, old images are
// removed from Cloudinary using the stored public_id.
// ============================================================

const Book = require('../models/Book');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

// -------------------------------------------------------
// Helper: Extract Cloudinary public_id from a URL
// Cloudinary URLs look like:
// https://res.cloudinary.com/<cloud>/image/upload/v123/folder/filename.ext
// We need "folder/filename" as the public_id for deletion.
// -------------------------------------------------------
const getPublicIdFromUrl = (url) => {
    if (!url || !url.includes('cloudinary')) return null;
    try {
        const parts = url.split('/upload/');
        if (parts.length < 2) return null;
        // Remove version prefix (v123456/) and file extension
        const pathAfterUpload = parts[1].replace(/^v\d+\//, '');
        const publicId = pathAfterUpload.replace(/\.[^/.]+$/, '');
        return publicId;
    } catch {
        return null;
    }
};

// -------------------------------------------------------
// Helper: Delete image from Cloudinary by public_id
// -------------------------------------------------------
const deleteCloudinaryImage = async (publicId) => {
    if (!publicId) return;
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(`🗑️  Cloudinary image deleted: ${publicId}`, result);
    } catch (error) {
        console.error(`❌ Failed to delete Cloudinary image: ${publicId}`, error.message);
    }
};

// ===========================================
// @desc    Get all books (with filters)
// @route   GET /api/books
// @access  Public
// ===========================================
const getBooks = async (req, res, next) => {
    try {
        const {
            search,
            semester,
            department,
            condition,
            maxPrice,
            sold,
            page = 1,
            limit = 20,
        } = req.query;

        const filter = {};

        // Text search across title, author, subject
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
            ];
        }

        // Filter by semester
        if (semester && semester !== 'all') {
            filter.semester = Number(semester);
        }

        // Filter by department
        if (department && department !== 'all') {
            filter.department = department;
        }

        // Filter by condition
        if (condition && condition !== 'all') {
            filter.condition = condition;
        }

        // Filter by max price
        if (maxPrice) {
            filter.price = { $lte: Number(maxPrice) };
        }

        // Filter by sold status (default: show unsold)
        if (sold !== undefined) {
            filter.sold = sold === 'true';
        } else {
            filter.sold = false;
        }

        const skip = (Number(page) - 1) * Number(limit);

        const [books, total] = await Promise.all([
            Book.find(filter)
                .populate('seller', 'name email campus')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Book.countDocuments(filter),
        ]);

        res.json({
            success: true,
            count: books.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            books,
        });
    } catch (error) {
        next(error);
    }
};

// ===========================================
// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
// ===========================================
const getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).populate(
            'seller',
            'name email campus department semester'
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        res.json({
            success: true,
            book,
        });
    } catch (error) {
        next(error);
    }
};

// ===========================================
// @desc    Create a new book listing
// @route   POST /api/books
// @access  Private
// Flow:    Frontend → Express → Cloudinary (upload) → MongoDB (save URL)
// ===========================================
const createBook = async (req, res, next) => {
    try {
        const {
            title,
            subject,
            author,
            semester,
            department,
            condition,
            price,
            description,
            contactInfo,
        } = req.body;

        // Cloudinary upload handled by multer-storage-cloudinary middleware
        // req.file.path = Cloudinary secure URL
        // req.file.filename = Cloudinary public_id
        let imageUrl = '';
        let imagePublicId = '';

        if (req.file) {
            imageUrl = req.file.path; // Cloudinary returns the secure URL here
            imagePublicId = req.file.filename; // Cloudinary public_id for deletion
        }

        const book = await Book.create({
            title,
            subject,
            author,
            semester,
            department,
            condition,
            price,
            imageUrl,
            imagePublicId,
            description,
            seller: req.user._id,
            sellerName: req.user.name,
            sellerEmail: req.user.email,
            campus: req.user.campus,
            contactInfo,
        });

        // Populate seller info for response
        const populatedBook = await Book.findById(book._id).populate(
            'seller',
            'name email campus'
        );

        res.status(201).json({
            success: true,
            message: 'Book listed successfully',
            book: populatedBook,
        });
    } catch (error) {
        next(error);
    }
};

// ===========================================
// @desc    Update a book listing
// @route   PUT /api/books/:id
// @access  Private (owner only)
// If user uploads a new image:
//   1. Delete old image from Cloudinary
//   2. Upload new image to Cloudinary
//   3. Update imageUrl in MongoDB
// ===========================================
const updateBook = async (req, res, next) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        // Verify ownership — only the seller can update
        if (book.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this listing',
            });
        }

        // If a new image was uploaded, delete the old one from Cloudinary
        if (req.file) {
            // Delete old image from Cloudinary (if it exists)
            if (book.imagePublicId) {
                await deleteCloudinaryImage(book.imagePublicId);
            } else if (book.imageUrl) {
                // Fallback: extract public_id from URL if imagePublicId wasn't stored
                const oldPublicId = getPublicIdFromUrl(book.imageUrl);
                await deleteCloudinaryImage(oldPublicId);
            }

            // Set new Cloudinary image data
            req.body.imageUrl = req.file.path;
            req.body.imagePublicId = req.file.filename;
        }

        book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('seller', 'name email campus');

        res.json({
            success: true,
            message: 'Book updated successfully',
            book,
        });
    } catch (error) {
        next(error);
    }
};

// ===========================================
// @desc    Delete a book listing
// @route   DELETE /api/books/:id
// @access  Private (owner only)
// Also deletes the image from Cloudinary
// ===========================================
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        // Verify ownership
        if (book.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this listing',
            });
        }

        // Delete image from Cloudinary before removing from DB
        if (book.imagePublicId) {
            await deleteCloudinaryImage(book.imagePublicId);
        } else if (book.imageUrl && book.imageUrl.includes('cloudinary')) {
            // Fallback: extract public_id from URL
            const publicId = getPublicIdFromUrl(book.imageUrl);
            await deleteCloudinaryImage(publicId);
        }

        // Remove book from MongoDB
        await Book.findByIdAndDelete(req.params.id);

        // Remove from all users' wishlists
        await User.updateMany(
            { wishlist: req.params.id },
            { $pull: { wishlist: req.params.id } }
        );

        res.json({
            success: true,
            message: 'Book listing and image deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// ===========================================
// @desc    Toggle wishlist (add/remove)
// @route   POST /api/books/:id/wishlist
// @access  Private
// ===========================================
const toggleWishlist = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        const user = await User.findById(req.user._id);
        const bookIndex = user.wishlist.indexOf(req.params.id);

        if (bookIndex > -1) {
            // Remove from wishlist
            user.wishlist.splice(bookIndex, 1);
        } else {
            // Add to wishlist
            user.wishlist.push(req.params.id);
        }

        await user.save();

        res.json({
            success: true,
            wishlist: user.wishlist,
            message:
                bookIndex > -1 ? 'Removed from wishlist' : 'Added to wishlist',
        });
    } catch (error) {
        next(error);
    }
};

// ===========================================
// @desc    Get my book listings
// @route   GET /api/books/my-books
// @access  Private
// ===========================================
const getMyBooks = async (req, res, next) => {
    try {
        const books = await Book.find({ seller: req.user._id })
            .populate('seller', 'name email campus')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: books.length,
            books,
        });
    } catch (error) {
        next(error);
    }
};

// ===========================================
// @desc    Get user's wishlist
// @route   GET /api/books/wishlist
// @access  Private
// ===========================================
const getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'wishlist',
            populate: { path: 'seller', select: 'name email campus' },
        });

        res.json({
            success: true,
            count: user.wishlist.length,
            books: user.wishlist,
        });
    } catch (error) {
        next(error);
    }
};

// ===========================================
// @desc    Mark book as sold / available
// @route   PUT /api/books/:id/sold
// @access  Private (owner only)
// ===========================================
const markAsSold = async (req, res, next) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        // Verify ownership
        if (book.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this listing',
            });
        }

        book.sold = !book.sold;
        await book.save();

        res.json({
            success: true,
            book,
            message: book.sold ? 'Book marked as sold' : 'Book marked as available',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    toggleWishlist,
    getMyBooks,
    getWishlist,
    markAsSold,
};
