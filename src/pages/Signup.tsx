import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, semesters } from "@/data/mockBooks";
import { BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const campuses = [
  "Pulchowk Campus",
  "Thapathali Campus",
  "Paschimanchal Campus",
  "Purwanchal Campus",
  "Chitwan Engineering Campus",
  "Dharan Engineering Campus",
];

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [campus, setCampus] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!campus || !department || !semester) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name,
        email,
        password,
        campus,
        department,
        semester: Number(semester),
      });
      toast({
        title: "Account Created!",
        description: "Welcome to ReRead IOE. Your account has been created successfully.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join the IOE book marketplace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-card">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" placeholder="Your full name" required className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
            </div>
            <div>
              <Label htmlFor="email">IOE Email *</Label>
              <Input id="email" type="email" placeholder="you@ioe.edu.np" required className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            </div>
            <div>
              <Label>Campus *</Label>
              <Select value={campus} onValueChange={setCampus} disabled={isLoading}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select campus" /></SelectTrigger>
                <SelectContent>
                  {campuses.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Department *</Label>
                <Select value={department} onValueChange={setDepartment} disabled={isLoading}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Dept." /></SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Semester *</Label>
                <Select value={semester} onValueChange={setSemester} disabled={isLoading}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Sem." /></SelectTrigger>
                  <SelectContent>
                    {semesters.map((s) => (
                      <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password *</Label>
              <Input id="password" type="password" placeholder="At least 8 characters" required className="mt-1.5" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            </div>
            <Button type="submit" className="w-full gap-2 font-semibold" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Creating account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
