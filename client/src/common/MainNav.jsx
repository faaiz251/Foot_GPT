import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button"; // Adjust the path if needed

// If you're using Geist via @fontsource or Google Fonts CDN, import it in index.css or index.html
// For now, we assume fonts are globally applied via Tailwind or CSS

export default function MainNav() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-white">
      <Link
        to="/"
        className="text-xl text-green-800 font-bold font-sans"
      >
        FootGPT ⚽
      </Link>

      <div className="space-x-2">
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </div>
    </header>
  );
}
