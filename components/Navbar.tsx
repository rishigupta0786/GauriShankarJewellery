"use client"; // Required for useState and animations

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Install with: npm install lucide-react
import { motion, AnimatePresence } from "framer-motion"; // Install with: npm install framer-motion

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/">
          <Image
            src="/navlogo.png"
            alt="Logo"
            width={120}
            height={100}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu (Hidden on mobile) */}
        <div className="hidden md:flex space-x-5 text-xl text-amber-200 allura-regular">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition duration-300 hover:drop-shadow-[0_0_10px_rgba(255,191,0,0.8)]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-amber-200 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Pop-up Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-gray-900/95 border-b border-gray-800 md:hidden overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 space-y-6 text-2xl text-amber-200 allura-regular">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Close menu when link is clicked
                  className="transition duration-300 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}