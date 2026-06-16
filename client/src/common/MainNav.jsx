import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Menu, X } from "lucide-react";

export default function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 sm:px-6 py-4 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl text-green-800 font-bold font-sans">
          FootGPT ⚽
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-gray-700 p-2"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 pb-4 flex flex-col gap-2">
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <Button variant="outline" className="w-full">Login</Button>
          </Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)}>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Sign Up</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
