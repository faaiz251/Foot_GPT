import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function MainNav() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-white">
      <Link to="/" className="text-xl text-green-800 font-bold font-sans">
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
