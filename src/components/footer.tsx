import { Brain } from "lucide-react";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">AI Health Assistant</span>
              </div>
              <p className="text-gray-400">
                Advanced AI-powered hospital report analysis for better
                healthcare outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; &copy; {currentYear} AI Health Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
    // <footer className="py-6 px-4 md:px-8 text-xs tracking-tighter">
    //   <div className="flex flex-col md:flex-row items-center justify-between">
    //     {/* Main Copyright Text */}
    //     <p className="font-extralight">&copy; {currentYear} All Rights Reserved.</p>

    //     {/* Developer Credit (Smaller & Separate) */}
    //     <p className="font-extralight text-[10px] md:text-xs mt-2 md:mt-0">
    //       Developed by
    //       <a
    //         className="text-violet-700 hover:underline ml-1"
    //         href="https://bikram-rai.com.np"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Bikram Rai
    //       </a>
    //     </p>
    //   </div>
    // </footer>
  );
}
