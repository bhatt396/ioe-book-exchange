import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { mockBooks } from "@/data/mockBooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, CheckCircle, User, Settings, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const myBooks = mockBooks.slice(0, 3);
  const soldBooks = mockBooks.slice(3, 4);
  const wishlist = mockBooks.slice(5, 7);

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
              <h1 className="font-display text-xl font-bold text-foreground">Aarav Sharma</h1>
              <p className="text-sm text-muted-foreground">aarav@ioe.edu.np · Pulchowk Campus · Computer · Sem 5</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" /> Settings
            </Button>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            {[
              { label: "Listed", count: myBooks.length, icon: BookOpen },
              { label: "Sold", count: soldBooks.length, icon: CheckCircle },
              { label: "Wishlist", count: wishlist.length, icon: Heart },
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
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {myBooks.map((book) => <BookCard key={book.id} book={book} />)}
              </div>
            </TabsContent>

            <TabsContent value="sold">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Sold Books</h2>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {soldBooks.map((book) => <BookCard key={book.id} book={book} />)}
              </div>
            </TabsContent>

            <TabsContent value="wishlist">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">My Wishlist</h2>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {wishlist.map((book) => <BookCard key={book.id} book={book} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
