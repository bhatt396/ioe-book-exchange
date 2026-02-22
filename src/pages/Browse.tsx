import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { departments, semesters, conditions } from "@/data/mockBooks";
import { booksAPI } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState(searchParams.get("semester") || "all");
  const [department, setDepartment] = useState(searchParams.get("department") || "all");
  const [condition, setCondition] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await booksAPI.getAll({
          search: search || undefined,
          semester: semester !== "all" ? semester : undefined,
          department: department !== "all" ? department : undefined,
          condition: condition !== "all" ? condition : undefined,
          maxPrice: maxPrice || undefined,
        });
        setBooks(data.books);
        setTotal(data.total);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(fetchBooks, 300);
    return () => clearTimeout(timer);
  }, [search, semester, department, condition, maxPrice]);

  const clearFilters = () => {
    setSearch("");
    setSemester("all");
    setDepartment("all");
    setCondition("all");
    setMaxPrice("");
    setSearchParams({});
  };

  const hasFilters = search || semester !== "all" || department !== "all" || condition !== "all" || maxPrice;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Browse Books</h1>
            <p className="mt-1 text-muted-foreground">Find the textbooks you need for your semester</p>
          </div>

          {/* Filters */}
          <div className="mb-8 rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by title, author, or subject..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map((s) => (
                    <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  {conditions.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Input
                type="number"
                placeholder="Max price (Rs.)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-40"
              />
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                  <X className="h-3 w-3" /> Clear filters
                </Button>
              )}
              <span className="ml-auto text-sm text-muted-foreground">
                {loading ? "Loading..." : `${total} books found`}
              </span>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading books...</p>
            </div>
          ) : books.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book._id} book={{ ...book, id: book._id }} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-muted-foreground">No books match your filters</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
