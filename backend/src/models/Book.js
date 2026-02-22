// ============================================================
// Book Model (MongoDB Schema)
// Stores book listing data including Cloudinary image URL.
// Image binaries are NOT stored in MongoDB — only the
// Cloudinary URL (imageUrl) and public_id (imagePublicId)
// for deletion/management.
// ============================================================

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Book title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
        },
        author: {
            type: String,
            required: [true, 'Author is required'],
            trim: true,
        },
        semester: {
            type: Number,
            required: [true, 'Semester is required'],
            min: [1, 'Semester must be between 1 and 8'],
            max: [8, 'Semester must be between 1 and 8'],
        },
        department: {
            type: String,
            required: [true, 'Department is required'],
            enum: [
                'Computer',
                'Civil',
                'Electronics',
                'Mechanical',
                'Electrical',
                'Architecture',
                'Industrial',
                'Aerospace',
            ],
        },
        condition: {
            type: String,
            required: [true, 'Condition is required'],
            enum: ['New', 'Good', 'Used'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        // Cloudinary image URL — stored as a string, NOT binary
        imageUrl: {
            type: String,
            default: '',
        },
        // Cloudinary public_id — needed for deleting/replacing images
        imagePublicId: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters'],
        },
        // Reference to the User who created this listing
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Seller is required'],
        },
        sellerName: {
            type: String,
            required: true,
        },
        sellerEmail: {
            type: String,
            required: true,
        },
        campus: {
            type: String,
            required: true,
        },
        sold: {
            type: Boolean,
            default: false,
        },
        contactInfo: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);

// Indexes for efficient filtering & text search
bookSchema.index({ title: 'text', subject: 'text', author: 'text' });
bookSchema.index({ semester: 1 });
bookSchema.index({ department: 1 });
bookSchema.index({ condition: 1 });
bookSchema.index({ sold: 1 });
bookSchema.index({ seller: 1 });
bookSchema.index({ price: 1 });

module.exports = mongoose.model('Book', bookSchema);
