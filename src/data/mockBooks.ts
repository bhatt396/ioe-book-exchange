export interface Book {
  id: string;
  title: string;
  subject: string;
  author: string;
  semester: number;
  department: string;
  condition: "New" | "Good" | "Used";
  price: number;
  image: string;
  description: string;
  sellerName: string;
  sellerEmail: string;
  campus: string;
  listedAt: string;
  sold: boolean;
}

export const departments = [
  "Computer",
  "Civil",
  "Electronics",
  "Mechanical",
  "Electrical",
  "Architecture",
  "Industrial",
  "Aerospace",
];

export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export const conditions: Book["condition"][] = ["New", "Good", "Used"];

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Engineering Mathematics I",
    subject: "Mathematics",
    author: "Erwin Kreyszig",
    semester: 1,
    department: "Computer",
    condition: "Good",
    price: 450,
    image: "https://images.unsplash.com/photo-1553729784-e91953dec042?w=400&h=500&fit=crop",
    description: "Well-maintained textbook with some highlighting. Covers calculus, linear algebra, and differential equations.",
    sellerName: "Aarav Sharma",
    sellerEmail: "aarav@ioe.edu.np",
    campus: "Pulchowk Campus",
    listedAt: "2026-02-10",
    sold: false,
  },
  {
    id: "2",
    title: "Digital Logic Design",
    subject: "Computer Science",
    author: "M. Morris Mano",
    semester: 2,
    department: "Computer",
    condition: "New",
    price: 600,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop",
    description: "Barely used, like new condition. Complete with solution manual.",
    sellerName: "Priya Adhikari",
    sellerEmail: "priya@ioe.edu.np",
    campus: "Thapathali Campus",
    listedAt: "2026-02-12",
    sold: false,
  },
  {
    id: "3",
    title: "Engineering Physics",
    subject: "Physics",
    author: "R.K. Gaur & S.L. Gupta",
    semester: 1,
    department: "Civil",
    condition: "Used",
    price: 300,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=500&fit=crop",
    description: "Some wear on covers but all pages intact. Good for reference.",
    sellerName: "Bikash Thapa",
    sellerEmail: "bikash@ioe.edu.np",
    campus: "Pulchowk Campus",
    listedAt: "2026-02-08",
    sold: false,
  },
  {
    id: "4",
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    author: "Thomas H. Cormen",
    semester: 3,
    department: "Computer",
    condition: "Good",
    price: 800,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop",
    description: "Classic CLRS textbook. Minor annotations in pencil, easily erasable.",
    sellerName: "Suman Karki",
    sellerEmail: "suman@ioe.edu.np",
    campus: "Pulchowk Campus",
    listedAt: "2026-02-14",
    sold: false,
  },
  {
    id: "5",
    title: "Surveying I",
    subject: "Civil Engineering",
    author: "B.C. Punmia",
    semester: 3,
    department: "Civil",
    condition: "Good",
    price: 350,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
    description: "Essential for civil engineering students. Some highlighting in chapters 1-5.",
    sellerName: "Nisha Poudel",
    sellerEmail: "nisha@ioe.edu.np",
    campus: "Thapathali Campus",
    listedAt: "2026-02-11",
    sold: false,
  },
  {
    id: "6",
    title: "Electronic Devices & Circuits",
    subject: "Electronics",
    author: "Robert L. Boylestad",
    semester: 4,
    department: "Electronics",
    condition: "New",
    price: 700,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop",
    description: "Brand new, never opened. Received as gift but already have a copy.",
    sellerName: "Rohit Basnet",
    sellerEmail: "rohit@ioe.edu.np",
    campus: "Pulchowk Campus",
    listedAt: "2026-02-15",
    sold: false,
  },
  {
    id: "7",
    title: "Thermodynamics",
    subject: "Mechanical Engineering",
    author: "Yunus A. Çengel",
    semester: 3,
    department: "Mechanical",
    condition: "Used",
    price: 400,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
    description: "Well-used but functional. All diagrams and tables intact.",
    sellerName: "Anita Rai",
    sellerEmail: "anita@ioe.edu.np",
    campus: "Pulchowk Campus",
    listedAt: "2026-02-09",
    sold: false,
  },
  {
    id: "8",
    title: "Object Oriented Programming",
    subject: "Computer Science",
    author: "Robert Lafore",
    semester: 2,
    department: "Computer",
    condition: "Good",
    price: 500,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop",
    description: "C++ programming textbook. Clean condition with minor spine wear.",
    sellerName: "Deepak Maharjan",
    sellerEmail: "deepak@ioe.edu.np",
    campus: "Thapathali Campus",
    listedAt: "2026-02-13",
    sold: false,
  },
];
