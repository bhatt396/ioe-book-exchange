import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { mockBooks, departments, semesters } from "@/data/mockBooks";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  DollarSign,
  Users,
  Shield,
  Upload,
  Search,
  Handshake,
  CheckCircle,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "Curated Collection",
    desc: "Books organized by semester and department — find exactly what you need.",
  },
  {
    icon: DollarSign,
    title: "Best Prices",
    desc: "Save up to 60% compared to new textbooks. Fair prices set by students.",
  },
  {
    icon: Users,
    title: "IOE Community",
    desc: "Exclusively for IOE students. Connect directly with your campus peers.",
  },
  {
    icon: Shield,
    title: "Trusted & Verified",
    desc: "IOE email verification ensures genuine sellers and secure transactions.",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "Find Your Book",
    desc: "Search by semester, department, or subject to find the textbook you need.",
  },
  {
    step: "02",
    icon: Handshake,
    title: "Connect with Seller",
    desc: "Contact the seller directly, negotiate price, and arrange the meetup.",
  },
  {
    step: "03",
    icon: CheckCircle,
    title: "Get Your Book",
    desc: "Meet on campus, verify the book condition, and start studying!",
  },
];

const testimonials = [
  {
    name: "Suman Karki",
    role: "Computer, Sem 5 · Pulchowk",
    text: "Saved over Rs. 3,000 in one semester by buying second-hand books here. Absolute lifesaver!",
    rating: 5,
  },
  {
    name: "Priya Adhikari",
    role: "Civil, Sem 3 · Thapathali",
    text: "Listed my old books and they were gone within 2 days. Easy to use and fellow students are responsive.",
    rating: 5,
  },
  {
    name: "Rohit Basnet",
    role: "Electronics, Sem 7 · Pulchowk",
    text: "Great platform for IOE students. The semester filter is super useful — I found exactly what I needed.",
    rating: 4,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

const Index = () => {
  const featuredBooks = mockBooks.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        {/* Features */}
        <section className="bg-surface py-20 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <motion.span
                variants={fadeInUp}
                custom={0}
                className="text-sm font-semibold uppercase tracking-widest text-accent"
              >
                Why ReRead IOE
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                custom={1}
                className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl"
              >
                Built for IOE Students
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                custom={2}
                className="mx-auto mt-3 max-w-md text-muted-foreground"
              >
                Everything you need to buy and sell engineering textbooks — fast, safe, and affordable.
              </motion.p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={i}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light transition-colors group-hover:bg-accent/10">
                    <f.icon className="h-6 w-6 text-primary transition-colors group-hover:text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-background py-20 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14 text-center"
            >
              <motion.span
                variants={fadeInUp}
                custom={0}
                className="text-sm font-semibold uppercase tracking-widest text-accent"
              >
                How It Works
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                custom={1}
                className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl"
              >
                Three Simple Steps
              </motion.h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={i}
                  className="relative text-center"
                >
                  {/* Connector line */}
                  {i < howItWorks.length - 1 && (
                    <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-border md:block" />
                  )}
                  <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-light">
                    <item.icon className="h-8 w-8 text-primary" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent font-display text-xs font-bold text-accent-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Semester */}
        <section className="bg-surface py-20 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <motion.span
                variants={fadeInUp}
                custom={0}
                className="text-sm font-semibold uppercase tracking-widest text-accent"
              >
                Categories
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                custom={1}
                className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl"
              >
                Browse by Semester
              </motion.h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3"
            >
              {semesters.map((sem, i) => (
                <motion.div key={sem} variants={fadeInUp} custom={i}>
                  <Link to={`/browse?semester=${sem}`}>
                    <div className="group flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-2xl border border-border bg-card shadow-card transition-all hover:border-primary hover:shadow-card-hover">
                      <span className="font-display text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                        {sem}
                      </span>
                      <span className="text-[10px] font-medium text-muted-foreground">Semester</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10"
            >
              <motion.h3
                variants={fadeInUp}
                custom={0}
                className="mb-4 text-center font-display text-lg font-semibold text-foreground"
              >
                Browse by Department
              </motion.h3>
              <div className="flex flex-wrap justify-center gap-2">
                {departments.map((dept) => (
                  <Link key={dept} to={`/browse?department=${dept}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs font-medium hover:border-primary hover:text-primary"
                    >
                      {dept}
                    </Button>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="bg-background py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                  Marketplace
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Recently Listed
                </h2>
                <p className="mt-2 text-muted-foreground">Fresh books from fellow students</p>
              </div>
              <Link to="/browse" className="hidden md:block">
                <Button variant="outline" className="gap-2 font-medium">
                  View All Books <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link to="/browse">
                <Button variant="outline" className="gap-2">
                  View All Books <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-surface py-20 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <motion.span
                variants={fadeInUp}
                custom={0}
                className="text-sm font-semibold uppercase tracking-widest text-accent"
              >
                Testimonials
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                custom={1}
                className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl"
              >
                What Students Say
              </motion.h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={i}
                  className="rounded-2xl border border-border bg-card p-6 shadow-card"
                >
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${j < t.rating ? "fill-accent text-accent" : "text-border"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">"{t.text}"</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="font-display text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sell CTA */}
        <section className="relative overflow-hidden bg-primary py-20 md:py-24">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="container relative mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={fadeInUp}
                custom={0}
                className="font-display text-3xl font-bold text-primary-foreground md:text-4xl"
              >
                Have books you no longer need?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                custom={1}
                className="mx-auto mt-4 max-w-md text-lg text-primary-foreground/70"
              >
                List them in minutes and help a fellow IOE student save money. It's free to list!
              </motion.p>
              <motion.div variants={fadeInUp} custom={2} className="mt-8 flex justify-center gap-3">
                <Link to="/sell">
                  <Button
                    size="lg"
                    className="gap-2 bg-accent px-8 font-semibold text-accent-foreground shadow-lg hover:bg-accent/90"
                  >
                    <Upload className="h-4 w-4" />
                    Start Selling Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
