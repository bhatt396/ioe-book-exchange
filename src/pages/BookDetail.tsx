import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { booksAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, MessageCircle, MapPin, Calendar, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const conditionColors: Record<string, string> = {
  New: "bg-success text-success-foreground",
  Good: "bg-info text-info-foreground",
  Used: "bg-warning text-warning-foreground",
};

const BookDetail = () => {
  const { id } = useParams();
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await booksAPI.getById(id);
        setBook(data.book);
      } catch (error) {
        console.error("Failed to fetch book:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleWishlist = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add books to your wishlist.",
        variant: "destructive",
      });
      return;
    }

    setWishlistLoading(true);
    try {
      const data = await booksAPI.toggleWishlist(book._id);
      toast({
        title: data.message,
        description: data.message.includes("Added") ? "Book saved to your wishlist." : "Book removed from your wishlist.",
      });
      await refreshUser();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update wishlist.",
        variant: "destructive",
      });
    } finally {
      setWishlistLoading(false);
    }
  };

  const isInWishlist = user?.wishlist?.includes(book?._id);

  if (loading) {
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

  if (!book) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">Book not found</h1>
            <Link to="/browse"><Button variant="outline" className="mt-4">Back to Browse</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const listedDate = book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "Unknown";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link to="/browse" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Browse
          </Link>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Image */}
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <img
                src={book.image?.startsWith('http') ? book.image : `http://localhost:5000${book.image}`}
                alt={book.title}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>

            {/* Details */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Semester {book.semester}</Badge>
                <Badge variant="secondary">{book.department}</Badge>
                <Badge className={conditionColors[book.condition]}>{book.condition}</Badge>
                {book.sold && <Badge variant="destructive">Sold</Badge>}
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold text-foreground">{book.title}</h1>
              <p className="mt-1 text-lg text-muted-foreground">by {book.author}</p>
              <p className="mt-1 text-sm text-muted-foreground">{book.subject}</p>

              <div className="mt-6 font-display text-4xl font-bold text-primary">Rs. {book.price}</div>

              <p className="mt-6 text-foreground leading-relaxed">{book.description}</p>

              <div className="mt-6 space-y-3 rounded-xl border border-border bg-card p-4">
                <h3 className="font-display text-sm font-semibold text-foreground">Seller Information</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" /> {book.sellerName}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {book.campus}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /> Listed on {listedDate}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button size="lg" className="flex-1 gap-2" disabled={book.sold}>
                  <MessageCircle className="h-4 w-4" /> {book.sold ? "Sold Out" : "Contact Seller"}
                </Button>
                <Button
                  size="lg"
                  variant={isInWishlist ? "default" : "outline"}
                  className="gap-2"
                  onClick={handleWishlist}
                  disabled={wishlistLoading}
                >
                  {wishlistLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
                  )}
                  {isInWishlist ? "Wishlisted" : "Wishlist"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetail;
