const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false, // Don't return password by default
        },
        campus: {
            type: String,
            required: [true, 'Campus is required'],
            enum: [
                'Pulchowk Campus',
                'Thapathali Campus',
                'Paschimanchal Campus',
                'Purwanchal Campus',
                'Chitwan Engineering Campus',
                'Dharan Engineering Campus',
            ],
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
        semester: {
            type: Number,
            required: [true, 'Semester is required'],
            min: [1, 'Semester must be between 1 and 8'],
            max: [8, 'Semester must be between 1 and 8'],
        },
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
        ],
        avatar: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);
