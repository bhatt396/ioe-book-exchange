import { Link } from "react-router-dom";
import { BookOpen, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <BookOpen className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-background">
                ReRead <span className="text-accent">IOE</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-background/50">
              The trusted second-hand book marketplace for IOE engineering students across Nepal.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-background">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-background/50">
              <li><Link to="/browse" className="transition-colors hover:text-accent">Browse Books</Link></li>
              <li><Link to="/sell" className="transition-colors hover:text-accent">Sell a Book</Link></li>
              <li><Link to="/dashboard" className="transition-colors hover:text-accent">Dashboard</Link></li>
              <li><Link to="/signup" className="transition-colors hover:text-accent">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-background">Departments</h4>
            <ul className="space-y-2.5 text-sm text-background/50">
              <li>Computer Engineering</li>
              <li>Civil Engineering</li>
              <li>Electronics Engineering</li>
              <li>Mechanical Engineering</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-background">Contact</h4>
            <ul className="space-y-2.5 text-sm text-background/50">
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> IOE, Tribhuvan University</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Pulchowk, Lalitpur</li>
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> support@rereadioe.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-background/10 pt-6 text-center text-sm text-background/40">
          © {new Date().getFullYear()} ReRead IOE. Made with ♥ for IOE students.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
