import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full h-full p-8 mx-auto bg-zinc-100">
      <p>
        <Link href="/">
          <Home />
        </Link>
      </p>
      <h1 className="text-5xl text-center">Cool Products Site</h1>
      <p>Stuff</p>
    </div>
  );
};

export default Navbar;
