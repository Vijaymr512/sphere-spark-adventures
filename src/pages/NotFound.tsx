
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-gradient-to-b from-kidz-background to-white">
        <div className="kidz-container text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <span className="text-9xl font-bold gradient-text">404</span>
              <div className="absolute -top-4 -right-4 bg-kidz-primary text-white text-lg font-bold rounded-full h-12 w-12 flex items-center justify-center transform rotate-12 animate-wiggle">
                Oops!
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            We can't seem to find the page you're looking for. Let's get you back to somewhere fun!
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-kidz-primary hover:bg-kidz-dark text-white">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-kidz-primary hover:bg-kidz-light">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
