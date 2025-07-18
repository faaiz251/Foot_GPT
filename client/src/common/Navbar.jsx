import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-white">
      <Link to="/" className="text-xl text-green-800 font-bold font-sans">
        FootGPT ⚽
      </Link>

      <div className="space-x-2">
        <Link to="/login">
          <Button className="cursor-pointer" variant="outline">
            Log out
          </Button>
        </Link>
      </div>
    </header>
  );
}
