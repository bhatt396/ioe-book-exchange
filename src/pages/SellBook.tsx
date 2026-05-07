import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, semesters, conditions } from "@/data/mockBooks";
import { Upload, BookPlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { booksAPI, getErrorMessage } from "@/lib/api";

const SellBook = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to list a book for sale.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!semester || !department || !condition) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("subject", subject);
      formData.append("semester", semester);
      formData.append("department", department);
      formData.append("condition", condition);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("contactInfo", contactInfo);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await booksAPI.create(formData);

      toast({
        title: "Book Listed!",
        description: "Your book has been listed on the marketplace successfully.",
      });

      navigate("/dashboard");
    } catch (error: unknown) {
      toast({
        title: "Failed to List Book",
        description: getErrorMessage(error, "Something went wrong. Please try again."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                <Input id="title" placeholder="e.g. Engineering Mathematics I" required className="mt-1.5" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} />
              </div>
              <div>
                <Label htmlFor="author">Author *</Label>
                <Input id="author" placeholder="e.g. Erwin Kreyszig" required className="mt-1.5" value={author} onChange={(e) => setAuthor(e.target.value)} disabled={isLoading} />
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="e.g. Mathematics" required className="mt-1.5" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={isLoading} />
              </div>
              <div>
                <Label>Semester *</Label>
                <Select value={semester} onValueChange={setSemester} disabled={isLoading}>
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
                <Select value={department} onValueChange={setDepartment} disabled={isLoading}>
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
                <Select value={condition} onValueChange={setCondition} disabled={isLoading}>
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
                <Input id="price" type="number" placeholder="e.g. 500" required className="mt-1.5" value={price} onChange={(e) => setPrice(e.target.value)} disabled={isLoading} />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe the book condition, any highlights, missing pages, etc." className="mt-1.5" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoading} />
            </div>

            <div>
              <Label>Book Image</Label>
              <div className="mt-1.5 flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Upload className="h-4 w-4" />
                  Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isLoading} />
                </label>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="h-20 w-16 rounded-md object-cover" />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="contact">Contact Info</Label>
              <Input id="contact" placeholder="Phone number or email" className="mt-1.5" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} disabled={isLoading} />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2 font-semibold" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Listing book...
                </>
              ) : (
                <>
                  <BookPlus className="h-4 w-4" /> List Book for Sale
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellBook;
