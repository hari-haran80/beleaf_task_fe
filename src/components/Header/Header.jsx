import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/Logo/logo.png";
import { BorderAnimation } from "./BorderAnimation/BorderAnimation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-80 backdrop-blur-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <BorderAnimation />
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Company Logo"
            className="h-10 md:h-12 transition-all duration-300"
          />
        </div>

        <nav className="hidden md:flex space-x-8">
          <a
            href="#"
            className=" font-medium text-red-600 hover:text-red-600 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#"
            className=" font-medium hover:text-red-600 transition-colors duration-200 opacity-70"
          >
            About
          </a>
          <a
            href="#"
            className=" font-medium hover:text-red-600 transition-colors duration-200 opacity-70"
          >
            Contact
          </a>
        </nav>

        <button className="bg-transparent border-2  px-6 py-2 rounded-full font-medium border-black hover:border-white hover:shadow-md shadow-black hover:bg-white hover:text-red-600 transition-colors duration-300">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
