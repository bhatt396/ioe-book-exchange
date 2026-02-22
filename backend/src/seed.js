// ============================================================
// Database Seeder
// Populates MongoDB with sample users and books for testing.
// Seed books use external Unsplash URLs (no Cloudinary needed).
// ============================================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Book = require('./models/Book');
const connectDB = require('./config/db');

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Book.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create sample users
        const users = await User.create([
            {
                name: 'Aarav Sharma',
                email: 'aarav@ioe.edu.np',
                password: 'password123',
                campus: 'Pulchowk Campus',
                department: 'Computer',
                semester: 5,
            },
            {
                name: 'Priya Adhikari',
                email: 'priya@ioe.edu.np',
                password: 'password123',
                campus: 'Thapathali Campus',
                department: 'Computer',
                semester: 3,
            },
            {
                name: 'Bikash Thapa',
                email: 'bikash@ioe.edu.np',
                password: 'password123',
                campus: 'Pulchowk Campus',
                department: 'Civil',
                semester: 2,
            },
            {
                name: 'Suman Karki',
                email: 'suman@ioe.edu.np',
                password: 'password123',
                campus: 'Pulchowk Campus',
                department: 'Computer',
                semester: 4,
            },
            {
                name: 'Nisha Poudel',
                email: 'nisha@ioe.edu.np',
                password: 'password123',
                campus: 'Thapathali Campus',
                department: 'Civil',
                semester: 4,
            },
            {
                name: 'Rohit Basnet',
                email: 'rohit@ioe.edu.np',
                password: 'password123',
                campus: 'Pulchowk Campus',
                department: 'Electronics',
                semester: 5,
            },
            {
                name: 'Anita Rai',
                email: 'anita@ioe.edu.np',
                password: 'password123',
                campus: 'Pulchowk Campus',
                department: 'Mechanical',
                semester: 4,
            },
            {
                name: 'Deepak Maharjan',
                email: 'deepak@ioe.edu.np',
                password: 'password123',
                campus: 'Thapathali Campus',
                department: 'Computer',
                semester: 3,
            },
        ]);

        console.log(`👤 Created ${users.length} users`);

        // Create sample books
        // Seed uses direct Unsplash URLs (no Cloudinary upload needed)
        // Real user uploads will go through Cloudinary
        const books = await Book.create([
            {
                title: 'Engineering Mathematics I',
                subject: 'Mathematics',
                author: 'Erwin Kreyszig',
                semester: 1,
                department: 'Computer',
                condition: 'Good',
                price: 450,
                imageUrl: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=400&h=500&fit=crop',
                imagePublicId: '',
                description: 'Well-maintained textbook with some highlighting. Covers calculus, linear algebra, and differential equations.',
                seller: users[0]._id,
                sellerName: users[0].name,
                sellerEmail: users[0].email,
                campus: users[0].campus,
                sold: false,
            },
            {
                title: 'Digital Logic Design',
                subject: 'Computer Science',
                author: 'M. Morris Mano',
                semester: 2,
                department: 'Computer',
                condition: 'New',
                price: 600,
                imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop',
                imagePublicId: '',
                description: 'Barely used, like new condition. Complete with solution manual.',
                seller: users[1]._id,
                sellerName: users[1].name,
                sellerEmail: users[1].email,
                campus: users[1].campus,
                sold: false,
            },
            {
                title: 'Engineering Physics',
                subject: 'Physics',
                author: 'R.K. Gaur & S.L. Gupta',
                semester: 1,
                department: 'Civil',
                condition: 'Used',
                price: 300,
                imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=500&fit=crop',
                imagePublicId: '',
                description: 'Some wear on covers but all pages intact. Good for reference.',
                seller: users[2]._id,
                sellerName: users[2].name,
                sellerEmail: users[2].email,
                campus: users[2].campus,
                sold: false,
            },
            {
                title: 'Data Structures & Algorithms',
                subject: 'Computer Science',
                author: 'Thomas H. Cormen',
                semester: 3,
                department: 'Computer',
                condition: 'Good',
                price: 800,
                imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop',
                imagePublicId: '',
                description: 'Classic CLRS textbook. Minor annotations in pencil, easily erasable.',
                seller: users[3]._id,
                sellerName: users[3].name,
                sellerEmail: users[3].email,
                campus: users[3].campus,
                sold: false,
            },
            {
                title: 'Surveying I',
                subject: 'Civil Engineering',
                author: 'B.C. Punmia',
                semester: 3,
                department: 'Civil',
                condition: 'Good',
                price: 350,
                imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop',
                imagePublicId: '',
                description: 'Essential for civil engineering students. Some highlighting in chapters 1-5.',
                seller: users[4]._id,
                sellerName: users[4].name,
                sellerEmail: users[4].email,
                campus: users[4].campus,
                sold: false,
            },
            {
                title: 'Electronic Devices & Circuits',
                subject: 'Electronics',
                author: 'Robert L. Boylestad',
                semester: 4,
                department: 'Electronics',
                condition: 'New',
                price: 700,
                imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop',
                imagePublicId: '',
                description: 'Brand new, never opened. Received as gift but already have a copy.',
                seller: users[5]._id,
                sellerName: users[5].name,
                sellerEmail: users[5].email,
                campus: users[5].campus,
                sold: false,
            },
            {
                title: 'Thermodynamics',
                subject: 'Mechanical Engineering',
                author: 'Yunus A. Çengel',
                semester: 3,
                department: 'Mechanical',
                condition: 'Used',
                price: 400,
                imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop',
                imagePublicId: '',
                description: 'Well-used but functional. All diagrams and tables intact.',
                seller: users[6]._id,
                sellerName: users[6].name,
                sellerEmail: users[6].email,
                campus: users[6].campus,
                sold: false,
            },
            {
                title: 'Object Oriented Programming',
                subject: 'Computer Science',
                author: 'Robert Lafore',
                semester: 2,
                department: 'Computer',
                condition: 'Good',
                price: 500,
                imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop',
                imagePublicId: '',
                description: 'C++ programming textbook. Clean condition with minor spine wear.',
                seller: users[7]._id,
                sellerName: users[7].name,
                sellerEmail: users[7].email,
                campus: users[7].campus,
                sold: false,
            },
        ]);

        console.log(`📚 Created ${books.length} books`);
        console.log('\n✅ Seed complete!');
        console.log('\n📧 Test accounts (password: password123):');
        users.forEach((u) => console.log(`   ${u.email}`));

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
};

seedData();
