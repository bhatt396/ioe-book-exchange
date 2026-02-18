import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, semesters } from "@/data/mockBooks";
import { BookOpen, ArrowRight } from "lucide-react";

const campuses = [
  "Pulchowk Campus",
  "Thapathali Campus",
  "Paschimanchal Campus",
  "Purwanchal Campus",
  "Chitwan Engineering Campus",
  "Dharan Engineering Campus",
];

const Signup = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              <Input id="name" placeholder="Your full name" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">IOE Email *</Label>
              <Input id="email" type="email" placeholder="you@ioe.edu.np" required className="mt-1.5" />
            </div>
            <div>
              <Label>Campus *</Label>
              <Select required>
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
                <Select required>
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
                <Select required>
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
              <Input id="password" type="password" placeholder="At least 8 characters" required className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full gap-2 font-semibold">
              Create Account <ArrowRight className="h-4 w-4" />
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
