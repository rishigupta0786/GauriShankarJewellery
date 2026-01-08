"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, UserRound, Phone, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LuxuryNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

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

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={24} /> },
    { name: "About", href: "/about", icon: <UserRound size={24} /> },
    { name: "Contact", href: "/contact", icon: <Phone size={24} /> },
  ];

  return (
    <>
      {/* Fixed Navbar Container */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Separated on left */}
          <motion.div whileHover={{ scale: 1.05 }} className="shrink-0">
            <Link href="/">
              <Image
                src="/navlogo.png"
                alt="Luxury Logo"
                width={120}
                height={45}
                className="hover:drop-shadow-[0_0_15px_rgba(255,191,0,0.5)] transition-all duration-300"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <motion.div
            initial={{ y: 0 }}
            animate={{
              y: 0,
              scale: isScrolled ? 0.9 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="hidden md:flex"
          >
            {/* Pills Container */}
            <div className="relative">
              <motion.div
                animate={{
                  opacity: isScrolled ? 0.6 : 0.4,
                }}
                className="absolute inset-0 bg-linear-to-r from-amber-400/20 to-yellow-300/20 rounded-full p-px"
              >
                <div className="w-full h-full bg-gray-950 rounded-full opacity-90"></div>
              </motion.div>

              <motion.div
                animate={{
                  backgroundColor: isScrolled
                    ? "rgba(15, 23, 42, 0.9)"
                    : "rgba(15, 23, 42, 0.85)",
                }}
                className="relative bg-slate-900/85 backdrop-blur-lg border border-amber-500/10 rounded-full shadow-lg px-2 py-1.5"
              >
                <div className="flex items-center space-x-1 allura-regular">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setActiveLink(link.name)}
                        className="relative flex items-center gap-2  px-5 py-2 rounded-full group"
                      >
                        {activeLink === link.name && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-linear-to-r from-amber-500/15 to-yellow-500/10 rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}

                        <span className="relative text-amber-300/80 group-hover:text-amber-200  transition-all duration-300">
                          {link.icon}
                        </span>

                        <span className="relative text-xl font-normal text-amber-100/80 group-hover:text-white transition-colors duration-300 tracking-normal">
                          {link.name}
                        </span>

                        <span className="absolute bottom-0 left-3 right-3 h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden relative flex items-center justify-center w-12 h-12 rounded-full group z-50"
          >
            <div className="absolute inset-0 bg-linear-to-r from-amber-500/10 to-yellow-300/10 rounded-full border border-amber-500/20 group-hover:border-amber-400/30 transition-all duration-300"></div>
            
            <div className="relative flex flex-col items-center justify-center space-y-1.5">
              <motion.div
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-linear-to-r from-amber-300 to-yellow-200 rounded-full"
              />
              <motion.div
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-4 h-0.5 bg-linear-to-r from-amber-300 to-yellow-200 rounded-full"
              />
              <motion.div
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-linear-to-r from-amber-300 to-yellow-200 rounded-full"
              />
            </div>
          </motion.button>
        </div>

        {/* Redesigned Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
              />

              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-50 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-amber-950/30"></div>
                
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[20px_20px]"></div>
                
                {/* Menu Content */}
                <div className="relative h-full flex flex-col">
                  {/* Menu Header */}
                  <div className="p-5 border-b border-amber-500/10">
                    <div className="flex items-center justify-between">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h2 className="text-4xl font-light text-amber-100 tracking-wider allura-regular">
                          Navigation
                        </h2>
                        <div className="w-full h-px bg-linear-to-r from-amber-400 to-transparent mt-1"></div>
                      </motion.div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMenu}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-amber-500/20 hover:border-amber-400/40 transition-colors"
                      >
                        <X className="w-5 h-5 text-amber-300/70" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-2">
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => {
                              setActiveLink(link.name);
                              setIsOpen(false);
                            }}
                            className="relative group"
                          >
                            <div className={`flex items-center justify-between py-2 px-1 rounded-xl transition-all duration-300 ${
                              activeLink === link.name 
                                ? 'bg-linear-to-r from-amber-500/15 to-amber-500/5 border border-amber-500/20' 
                                : 'hover:bg-slate-800/40 border border-transparent hover:border-amber-500/10'
                            }`}>
                              {/* Left side with icon and text */}
                              <div className="flex items-center space-x-4">
                                {/* Icon Container */}
                                <div className={`relative w-14 h-14  rounded-full flex items-center justify-center  transition-all duration-300 ${
                                  activeLink === link.name
                                    ? 'bg-linear-to-br from-amber-500/20 to-yellow-500/10'
                                    : 'bg-slate-800/50 group-hover:bg-slate-700/50'
                                }`}>
                                  <div className={`relative transition-all duration-300 ${
                                    activeLink === link.name 
                                      ? 'text-amber-300' 
                                      : 'text-amber-300/60 group-hover:text-amber-300'
                                  }`}>
                                    {link.icon}
                                  </div>
                                  
                                  {/* Glow effect for active link */}
                                  {activeLink === link.name && (
                                    <motion.div
                                      initial={{ scale: 0.8, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      className="absolute inset-0 rounded-full bg-amber-400/10 blur-sm"
                                    />
                                  )}
                                </div>

                                {/* Link Text */}
                                <div>
                                  <span className={`block allura-regular text-2xl font-light tracking-wide transition-all duration-300 -mb-2 ${
                                    activeLink === link.name
                                      ? 'text-amber-100'
                                      : 'text-amber-100/80 group-hover:text-amber-100'
                                  }`}>
                                    {link.name}
                                  </span>
                                  <span className="block allura-regular text-md text-amber-300/40 font-light">
                                    Navigate to {link.name}
                                  </span>
                                </div>
                              </div>

                              {/* Arrow Indicator */}
                              <motion.div
                                animate={{ x: 0 }}
                                className={`transition-all duration-300 ${
                                  activeLink === link.name
                                    ? 'text-amber-300'
                                    : 'text-amber-300/30 group-hover:text-amber-300/60'
                                }`}
                              >
                                <ChevronRight className="w-5 h-5" />
                              </motion.div>

                              {/* Hover Glow Line */}
                              <div className="absolute bottom-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-amber-400/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}