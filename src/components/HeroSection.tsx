import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, BookPlus } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-books.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Engineering textbooks"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground">
              📚 For IOE Engineering Students
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
          >
            Reuse Knowledge.
            <br />
            <span className="text-accent">Reduce Cost.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-lg text-lg text-primary-foreground/80"
          >
            Buy and sell second-hand engineering textbooks with fellow IOE students.
            Save money, help peers, and keep knowledge circulating.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/browse">
              <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                <Search className="h-4 w-4" />
                Browse Books
              </Button>
            </Link>
            <Link to="/sell">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/30 font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <BookPlus className="h-4 w-4" />
                Sell Your Book
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-6 text-sm text-primary-foreground/60"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              100+ Books Listed
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              8 Semesters
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              All Departments
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
