const bcrypt = require('bcryptjs');
require('dotenv').config();

const { connectDB, supabaseFetch } = require('./config/db');

const sampleUsers = [
    ['Aarav Sharma', 'aarav@ioe.edu.np', 'Pulchowk Campus', 'Computer', 5],
    ['Priya Adhikari', 'priya@ioe.edu.np', 'Thapathali Campus', 'Computer', 3],
    ['Bikash Thapa', 'bikash@ioe.edu.np', 'Pulchowk Campus', 'Civil', 2],
    ['Suman Karki', 'suman@ioe.edu.np', 'Pulchowk Campus', 'Computer', 4],
    ['Nisha Poudel', 'nisha@ioe.edu.np', 'Thapathali Campus', 'Civil', 4],
    ['Rohit Basnet', 'rohit@ioe.edu.np', 'Pulchowk Campus', 'Electronics', 5],
    ['Anita Rai', 'anita@ioe.edu.np', 'Pulchowk Campus', 'Mechanical', 4],
    ['Deepak Maharjan', 'deepak@ioe.edu.np', 'Thapathali Campus', 'Computer', 3],
];

const sampleBooks = [
    ['Engineering Mathematics I', 'Mathematics', 'Erwin Kreyszig', 1, 'Computer', 'Good', 450, 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=400&h=500&fit=crop', 'Well-maintained textbook with some highlighting. Covers calculus, linear algebra, and differential equations.', 0],
    ['Digital Logic Design', 'Computer Science', 'M. Morris Mano', 2, 'Computer', 'New', 600, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop', 'Barely used, like new condition. Complete with solution manual.', 1],
    ['Engineering Physics', 'Physics', 'R.K. Gaur & S.L. Gupta', 1, 'Civil', 'Used', 300, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=500&fit=crop', 'Some wear on covers but all pages intact. Good for reference.', 2],
    ['Data Structures & Algorithms', 'Computer Science', 'Thomas H. Cormen', 3, 'Computer', 'Good', 800, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop', 'Classic CLRS textbook. Minor annotations in pencil, easily erasable.', 3],
    ['Surveying I', 'Civil Engineering', 'B.C. Punmia', 3, 'Civil', 'Good', 350, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop', 'Essential for civil engineering students. Some highlighting in chapters 1-5.', 4],
    ['Electronic Devices & Circuits', 'Electronics', 'Robert L. Boylestad', 4, 'Electronics', 'New', 700, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop', 'Brand new, never opened. Received as gift but already have a copy.', 5],
    ['Thermodynamics', 'Mechanical Engineering', 'Yunus A. Cengel', 3, 'Mechanical', 'Used', 400, 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop', 'Well-used but functional. All diagrams and tables intact.', 6],
    ['Object Oriented Programming', 'Computer Science', 'Robert Lafore', 2, 'Computer', 'Good', 500, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop', 'C++ programming textbook. Clean condition with minor spine wear.', 7],
];

const seedData = async () => {
    try {
        await connectDB();

        await supabaseFetch('/wishlists?user_id=not.is.null', { method: 'DELETE' });
        await supabaseFetch('/books?id=not.is.null', { method: 'DELETE' });
        await supabaseFetch('/users?id=not.is.null', { method: 'DELETE' });
        console.log('Cleared existing data');

        const password = await bcrypt.hash('password123', 12);
        const usersPayload = sampleUsers.map(([name, email, campus, department, semester]) => ({
            name,
            email,
            password,
            campus,
            department,
            semester,
        }));

        const { data: users } = await supabaseFetch('/users?select=*', {
            method: 'POST',
            headers: { Prefer: 'return=representation' },
            body: JSON.stringify(usersPayload),
        });

        const booksPayload = sampleBooks.map(
            ([title, subject, author, semester, department, condition, price, imageUrl, description, sellerIndex]) => {
                const seller = users[sellerIndex];

                return {
                    title,
                    subject,
                    author,
                    semester,
                    department,
                    condition,
                    price,
                    image_url: imageUrl,
                    image_public_id: '',
                    description,
                    seller: seller.id,
                    seller_name: seller.name,
                    seller_email: seller.email,
                    campus: seller.campus,
                    sold: false,
                };
            }
        );

        const { data: books } = await supabaseFetch('/books?select=*', {
            method: 'POST',
            headers: { Prefer: 'return=representation' },
            body: JSON.stringify(booksPayload),
        });

        console.log(`Created ${users.length} users`);
        console.log(`Created ${books.length} books`);
        console.log('\nSeed complete!');
        console.log('\nTest accounts (password: password123):');
        users.forEach((user) => console.log(`   ${user.email}`));

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error.message);
        process.exit(1);
    }
};

seedData();
