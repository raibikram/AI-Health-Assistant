import { Brain } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function Nav() {
  return (
    <>
      {" "}
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Link href={"/"}>
                {" "}
                <Brain className="h-6 w-6 text-white" />
              </Link>
            </div>
            <span className="text-xl font-bold text-gray-900">
              AI Health Assistant
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#security"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Security
            </a>
            {/* <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Sign In
            </Button> */}
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href={"/rag"}> Get Started </Link>
            </Button>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Nav;
