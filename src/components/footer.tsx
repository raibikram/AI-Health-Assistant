import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 md:px-8 text-xs tracking-tighter">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Main Copyright Text */}
        <p className="font-extralight">&copy; {currentYear} All Rights Reserved.</p>

        {/* Developer Credit (Smaller & Separate) */}
        <p className="font-extralight text-[10px] md:text-xs mt-2 md:mt-0">
          Developed by  
          <a
            className="text-violet-700 hover:underline ml-1"
            href="https://bikram-rai.com.np"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bikram Rai
          </a>
        </p>
      </div>
    </footer>
  );
}
