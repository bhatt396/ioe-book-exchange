import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { booksAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, CheckCircle, User, Settings, Plus, Loader2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [myBooks, setMyBooks] = useState<any[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [myBooksData, wishlistData] = await Promise.all([
        booksAPI.getMyBooks(),
        booksAPI.getWishlist(),
      ]);
      setMyBooks(myBooksData.books || []);
      setWishlistBooks(wishlistData.books || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkSold = async (bookId: string) => {
    try {
      const data = await booksAPI.markAsSold(bookId);
      toast({
        title: data.message,
        description: data.book.sold ? "Book is now marked as sold." : "Book is now available again.",
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update book status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (bookId: string) => {
    try {
      await booksAPI.delete(bookId);
      toast({
        title: "Book Deleted",
        description: "Your book listing has been removed.",
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete book.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) return null;

  const soldBooks = myBooks.filter((b) => b.sold);
  const listedBooks = myBooks.filter((b) => !b.sold);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Profile header */}
          <div className="mb-8 flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email} · {user.campus} · {user.department} · Sem {user.semester}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" /> Settings
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            {[
              { label: "Listed", count: listedBooks.length, icon: BookOpen },
              { label: "Sold", count: soldBooks.length, icon: CheckCircle },
              { label: "Wishlist", count: wishlistBooks.length, icon: Heart },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center shadow-card">
                <s.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
                <div className="font-display text-2xl font-bold text-foreground">{s.count}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <Tabs defaultValue="listed">
            <TabsList className="mb-6">
              <TabsTrigger value="listed" className="gap-1"><BookOpen className="h-3.5 w-3.5" /> My Books</TabsTrigger>
              <TabsTrigger value="sold" className="gap-1"><CheckCircle className="h-3.5 w-3.5" /> Sold</TabsTrigger>
              <TabsTrigger value="wishlist" className="gap-1"><Heart className="h-3.5 w-3.5" /> Wishlist</TabsTrigger>
            </TabsList>

            <TabsContent value="listed">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">My Listed Books</h2>
                <Link to="/sell">
                  <Button size="sm" className="gap-1"><Plus className="h-3.5 w-3.5" /> List Book</Button>
                </Link>
              </div>
              {listedBooks.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                  {listedBooks.map((book) => (
                    <div key={book._id} className="relative">
                      <BookCard book={{ ...book, id: book._id }} />
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => handleMarkSold(book._id)}>
                          Mark as Sold
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(book._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-muted-foreground">
                  <p>You haven't listed any books yet.</p>
                  <Link to="/sell"><Button className="mt-4 gap-1"><Plus className="h-4 w-4" /> List Your First Book</Button></Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="sold">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Sold Books</h2>
              {soldBooks.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                  {soldBooks.map((book) => (
                    <div key={book._id} className="relative">
                      <BookCard book={{ ...book, id: book._id }} />
                      <div className="mt-2">
                        <Button size="sm" variant="outline" className="w-full" onClick={() => handleMarkSold(book._id)}>
                          Mark as Available
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-muted-foreground">
                  <p>No books sold yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="wishlist">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">My Wishlist</h2>
              {wishlistBooks.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                  {wishlistBooks.map((book) => (
                    <BookCard key={book._id} book={{ ...book, id: book._id }} />
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-muted-foreground">
                  <p>Your wishlist is empty. Browse books to add some!</p>
                  <Link to="/browse"><Button variant="outline" className="mt-4">Browse Books</Button></Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
