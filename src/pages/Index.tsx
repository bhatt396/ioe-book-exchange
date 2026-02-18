import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { mockBooks, departments, semesters } from "@/data/mockBooks";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, DollarSign, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "Wide Selection",
    desc: "Books for all 8 semesters across every IOE department.",
  },
  {
    icon: DollarSign,
    title: "Affordable Prices",
    desc: "Save up to 60% compared to buying new textbooks.",
  },
  {
    icon: Users,
    title: "Student Network",
    desc: "Connect directly with fellow IOE students for trusted deals.",
  },
  {
    icon: Shield,
    title: "Verified Sellers",
    desc: "Only IOE email holders can list — ensuring trust and safety.",
  },
];

const Index = () => {
  const featuredBooks = mockBooks.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        {/* Features */}
        <section className="bg-background py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border bg-card p-6 shadow-card"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <f.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Semester */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Browse by Semester
              </h2>
              <p className="mt-2 text-muted-foreground">Find books for your current semester</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {semesters.map((sem) => (
                <Link key={sem} to={`/browse?semester=${sem}`}>
                  <Button
                    variant="outline"
                    className="h-14 w-14 rounded-xl font-display text-lg font-bold hover:bg-primary hover:text-primary-foreground"
                  >
                    {sem}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Department */}
        <section className="bg-background py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Browse by Department
              </h2>
              <p className="mt-2 text-muted-foreground">Select your engineering department</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {departments.map((dept) => (
                <Link key={dept} to={`/browse?department=${dept}`}>
                  <Button variant="secondary" className="rounded-full font-medium">
                    {dept}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  Recently Listed
                </h2>
                <p className="mt-1 text-muted-foreground">Fresh books from fellow students</p>
              </div>
              <Link to="/browse">
                <Button variant="ghost" className="gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
              Have books you no longer need?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-primary-foreground/70">
              List them in minutes and help a fellow IOE student save money.
            </p>
            <Link to="/sell">
              <Button size="lg" variant="secondary" className="mt-6 font-semibold">
                Start Selling Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
