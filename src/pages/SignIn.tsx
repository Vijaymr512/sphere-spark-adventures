
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Supabase later
    console.log("Form submitted:", formData);
    // For now, let's simulate a successful sign in by redirecting to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-gradient-to-b from-kidz-background to-white">
        <div className="kidz-container max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-kidz-light">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue the adventure!</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="parent@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-kidz-light focus:border-kidz-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-kidz-light focus:border-kidz-primary"
                />
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-kidz-dark hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full bg-kidz-primary hover:bg-kidz-dark text-white">
                  Sign In
                </Button>
              </div>
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-kidz-accent hover:underline font-medium">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
