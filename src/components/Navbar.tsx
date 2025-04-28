
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-sm py-4 fixed w-full top-0 z-50 shadow-sm">
      <div className="kidz-container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-kidz-primary to-kidz-dark rounded-lg p-2">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="text-2xl font-bold gradient-text">KidzSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-kidz-accent transition-colors">
            Home
          </Link>
          <Link to="/about" className="font-medium hover:text-kidz-accent transition-colors">
            About
          </Link>
          <Link to="/features" className="font-medium hover:text-kidz-accent transition-colors">
            Features
          </Link>
          <Button asChild variant="outline" className="border-kidz-primary hover:bg-kidz-light hover:text-kidz-dark ml-4">
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button asChild className="bg-kidz-primary hover:bg-kidz-dark text-white">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute w-full py-4 shadow-md animated-dropdown">
          <div className="kidz-container flex flex-col gap-4">
            <Link 
              to="/" 
              className="font-medium hover:text-kidz-accent transition-colors py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="font-medium hover:text-kidz-accent transition-colors py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/features" 
              className="font-medium hover:text-kidz-accent transition-colors py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <div className="flex flex-col gap-3 py-2">
              <Button 
                asChild 
                variant="outline" 
                className="border-kidz-primary hover:bg-kidz-light hover:text-kidz-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button 
                asChild 
                className="bg-kidz-primary hover:bg-kidz-dark text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
