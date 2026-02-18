import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, semesters, conditions } from "@/data/mockBooks";
import { Upload, BookPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SellBook = () => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Book Listed!",
      description: "Your book has been listed on the marketplace. (Demo mode — connect backend to persist.)",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Sell a Book</h1>
            <p className="mt-1 text-muted-foreground">List your second-hand textbook for other IOE students</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="title">Book Title *</Label>
                <Input id="title" placeholder="e.g. Engineering Mathematics I" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="author">Author *</Label>
                <Input id="author" placeholder="e.g. Erwin Kreyszig" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="e.g. Mathematics" required className="mt-1.5" />
              </div>
              <div>
                <Label>Semester *</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select semester" /></SelectTrigger>
                  <SelectContent>
                    {semesters.map((s) => (
                      <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Department *</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Condition *</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select condition" /></SelectTrigger>
                  <SelectContent>
                    {conditions.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price (Rs.) *</Label>
                <Input id="price" type="number" placeholder="e.g. 500" required className="mt-1.5" />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe the book condition, any highlights, missing pages, etc." className="mt-1.5" rows={3} />
            </div>

            <div>
              <Label>Book Image</Label>
              <div className="mt-1.5 flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Upload className="h-4 w-4" />
                  Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="h-20 w-16 rounded-md object-cover" />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="contact">Contact Info</Label>
              <Input id="contact" placeholder="Phone number or email" className="mt-1.5" />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2 font-semibold">
              <BookPlus className="h-4 w-4" /> List Book for Sale
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellBook;
