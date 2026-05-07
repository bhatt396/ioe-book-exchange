# ReRead IOE – Second-Hand Book Marketplace

A professional web application connecting IOE students to buy and sell second-hand engineering books. Built with a full-stack focus, with a scalable backend and clean frontend design.

---

## Project Overview

**Live Demo:** [ReRead IOE Live](https://your-live-link.com)  
**GitHub Repository:** [GitHub Repo](https://github.com/yourrepo)

ReRead IOE allows students to:

- Browse and filter second-hand books by semester, department, and subject.
- List their own books for sale with images and descriptions.
- View book details, wishlist items, and manage their dashboard.
- Experience smooth, responsive, and minimalistic UI/UX.

This project emphasizes **backend architecture, RESTful APIs, and database modeling** while providing a functional frontend for demonstration.

---

## Technologies Used

**Backend:**

- Express.js
- Supabase Postgres
- RESTful APIs
- Cloudinary for image storage
- JWT Authentication

**Frontend:**

- React
- Tailwind CSS
- Modular component structure
- Multi-language ready (English/Nepali)

**Tools & Practices:**

- Git & GitHub for version control
- Agile workflow familiarity (Jira)
- CI/CD basics with Docker
- Comfortable with AI-assisted development tools

---

## Features

**User Management**

- Secure signup, login, and logout.
- User dashboards for managing listings, wishlist, and profile.

**Book Marketplace**

- Add, edit, and delete book listings.
- Upload book images with Cloudinary.
- Browse by semester, department, subject, and price.

**Admin & System Design**

- Scalable backend architecture.
- REST API endpoints for all core operations.
- Clean database schema with user and book relations.

**Frontend**

- Modern responsive design.
- Clean dashboard and card-based listing views.
- Easy navigation and interaction.

---

## Installation & Setup

Clone the repository and run locally:

```bash
# Step 1: Clone the repository
git clone https://github.com/yourrepo.git

# Step 2: Navigate to project directory
cd reread-ioe

# Step 3: Install dependencies
npm install

# Step 4: Configure backend environment
cp backend/.env.example backend/.env
# Add SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, JWT_SECRET, and Cloudinary keys

# Step 5: Create Supabase tables
# Run backend/supabase/schema.sql in the Supabase SQL editor.

# Step 6: Start backend server
cd backend
npm install
npm run dev

# Step 7: Start frontend in another terminal
cd ..
npm install
npm run dev
