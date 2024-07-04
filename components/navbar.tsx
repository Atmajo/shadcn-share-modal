import { Github, HeartHandshake, Share2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-4 md:px-20 lg:px-44">
      <Share2 className="w-5 h-5" />
      <div className="flex items-center gap-x-2">
        <Link href="https://github.com/atmajo/shadcn-share-modal">
          <Button>
            <Github className="w-5 h-5" />
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
