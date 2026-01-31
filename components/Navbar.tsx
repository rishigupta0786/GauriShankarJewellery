"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Home,
  UserRound,
  Phone,
  ChevronRight,
  ShoppingBag,
  LogIn,
  ChevronDown,
  Sparkles,
  FolderOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CatalogueItem {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  createdAt: string;
}

export default function LuxuryNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [catalogue, setCatalogue] = useState<CatalogueItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch catalogue
  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/catalogue");
        if (!res.ok) throw new Error("Failed to fetch catalogue");
        const data = await res.json();
        setCatalogue(data.items || []);
      } catch (err) {
        setError("Failed to load catalogue.");
        setCatalogue([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogue();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCollections = () => setCollectionsOpen(!collectionsOpen);

  const mainNavLinks = [
    { name: "Home", href: "/", icon: <Home size={24} /> },
    {
      name: "Collections",
      href: "#",
      icon: <ShoppingBag size={24} />,
      hasDropdown: true,
    },
    { name: "About", href: "/about", icon: <UserRound size={24} /> },
    { name: "Contact", href: "/contact", icon: <Phone size={24} /> },
    {
      name: isLoggedIn ? "Dashboard" : "Login",
      href: isLoggedIn ? "/dashboard" : "/login",
      icon: <LogIn size={24} />,
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pt-2 px-6 bg-gray-950/60 md:bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/">
              <Image src="/navlogo.png" alt="Logo" width={120} height={45} />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex relative">
            <div className="flex items-center space-x-2">
              {mainNavLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.hasDropdown ? (
                    <button
                      onClick={toggleCollections}
                      className="flex items-center gap-2 px-4 py-2 rounded-full"
                    >
                      {link.icon}
                      {link.name}
                      <ChevronDown
                        className={`transition ${
                          collectionsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setActiveLink(link.name)}
                      className="px-4 py-2"
                    >
                      {link.icon} {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Dropdown */}
            <AnimatePresence>
              {collectionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 w-80 bg-slate-900 rounded-xl p-4 z-50"
                >
                  <h3 className="flex items-center gap-2 mb-2">
                    <FolderOpen /> Browse Collections
                  </h3>

                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    catalogue.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/catalogue/${cat._id}`}
                        className="flex items-center gap-2 py-2"
                        onClick={() => setCollectionsOpen(false)}
                      >
                        {cat.imageUrl ? (
                          <img
                            src={cat.imageUrl}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <Sparkles />
                        )}
                        {cat.title}
                      </Link>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Button */}
          <button onClick={toggleMenu} className="md:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </>
  );
}
