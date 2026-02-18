import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, BookPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(220_70%_22%/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(220_70%_22%/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      {/* Accent blob */}
      <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary">
                <span className="flex h-1.5 w-1.5 rounded-full bg-accent" />
                Trusted by IOE Students
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.1] text-foreground md:text-5xl lg:text-[3.5rem]"
            >
              Buy & Sell Engineering{" "}
              <br className="hidden sm:block" />
              Books{" "}
              <span className="text-gradient-accent">Smarter</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              A trusted second-hand book marketplace for IOE students.
              Save up to 60% on textbooks and help your juniors succeed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/browse">
                <Button size="lg" className="gap-2 bg-accent px-6 font-semibold text-accent-foreground shadow-md hover:bg-accent/90">
                  <Search className="h-4 w-4" />
                  Browse Books
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sell">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 px-6 font-semibold"
                >
                  <BookPlus className="h-4 w-4" />
                  Sell Your Book
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex items-center gap-8"
            >
              {[
                { value: "500+", label: "Books Listed" },
                { value: "1,200+", label: "Students" },
                { value: "8", label: "Semesters" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/5" />
              <img
                src={heroIllustration}
                alt="Students exchanging engineering books"
                className="relative mx-auto w-full max-w-md animate-float"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
