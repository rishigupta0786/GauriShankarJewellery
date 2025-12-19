"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between ">
        {/* Logo Image */}
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

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-5 text-xl text-amber-200 luxurious-roman-regular">
          <Link
            href="/"
            className="relative transition duration-300 hover:drop-shadow-[0_0_10px_rgba(255,191,0,0.8)]"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="relative transition duration- hover:drop-shadow-[0_0_10px_rgba(255,191,0,0.8)]"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="relative transition duration-300 hover:drop-shadow-[0_0_10px_rgba(255,191,0,0.8)]"
          >
            Contact
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-amber-200"></span>
            <span className="block w-6 h-0.5 bg-amber-200"></span>
            <span className="block w-6 h-0.5 bg-amber-200"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="flex flex-col px-6 py-4 space-y-2 luxurious-roman-regular text-md text-amber-200">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
