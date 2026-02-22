// ============================================================
// Express Server Entry Point
// Sets up middleware, routes, and starts the server.
// No local file serving for uploads — images live on Cloudinary.
// ============================================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// NOTE: No need for express.static('/uploads') anymore
// Images are served directly from Cloudinary CDN

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'IOE Book Exchange API is running 📚',
        timestamp: new Date().toISOString(),
        cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Configured' : '❌ Not configured',
    });
});

// Error handler (must be after routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📚 IOE Book Exchange API`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
    console.log(`☁️  Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'NOT CONFIGURED — add credentials to .env'}\n`);
});
