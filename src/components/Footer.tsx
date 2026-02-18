import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">
                ReRead <span className="text-accent">IOE</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              The trusted marketplace for second-hand engineering books among IOE students.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/browse" className="hover:text-primary transition-colors">Browse Books</Link></li>
              <li><Link to="/sell" className="hover:text-primary transition-colors">Sell a Book</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Departments</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Computer Engineering</li>
              <li>Civil Engineering</li>
              <li>Electronics Engineering</li>
              <li>Mechanical Engineering</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>IOE, Tribhuvan University</li>
              <li>Pulchowk, Lalitpur, Nepal</li>
              <li>support@rereadioe.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ReRead IOE. Made with ♥ for IOE students.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
