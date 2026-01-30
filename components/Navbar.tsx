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

  // Fetch catalogue data
  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/catalogue");

        if (!res.ok) {
          throw new Error(`Failed to fetch catalogue: ${res.status}`);
        }

        const data = await res.json();
        setCatalogue(data.items || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching catalogue:", err);
        setError("Failed to load catalogue. Please try again later.");
        setCatalogue([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogue();
  }, []);

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
      {/* Fixed Navbar Container */}
      <nav className="fixed top-0 left-0 right-0 z-50 pt-2 px-6 bg-gray-950/60 md:bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Separated on left */}
          <motion.div whileHover={{ scale: 1.05 }} className="shrink-0">
            <Link href="/">
              <Image
                src="/navlogo.png"
                alt="Luxury Logo"
                width={120}
                height={45}
                className="hover:drop-shadow-[0_0_15px_rgba(255,191,0,0.5)] p-1.5 transition-all duration-300"
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
            className="hidden md:flex relative"
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
                  {mainNavLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {link.hasDropdown ? (
                        // Collections Dropdown Trigger
                        <button
                          onClick={toggleCollections}
                          className="relative flex items-center gap-2 py-2 px-4  rounded-full group"
                        >
                          {activeLink === link.name && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute p-2 inset-0 bg-linear-to-r from-amber-500/15 to-yellow-500/10 rounded-full"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}

                          <span className="relative text-amber-300/80 group-hover:text-amber-200 transition-all duration-300">
                            {link.icon}
                          </span>
                          <span className="relative text-lg font-normal text-amber-100/80 group-hover:text-white transition-colors duration-300 tracking-normal">
                            {link.name}
                          </span>
                          <motion.span
                            animate={{ rotate: collectionsOpen ? 180 : 0 }}
                            className="relative transition-transform duration-300"
                          >
                            <ChevronDown className="w-4 h-4 text-amber-300/60 group-hover:text-amber-200" />
                          </motion.span>
                          <span className="absolute bottom-0 left-3 right-3 h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </button>
                      ) : (
                        // Regular Link
                        <Link
                          href={link.href}
                          onClick={() => setActiveLink(link.name)}
                          className="relative flex items-center gap-2 px-4 py-2 rounded-full group"
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

                          <span className="relative text-amber-300/80 group-hover:text-amber-200 transition-all duration-300">
                            {link.icon}
                          </span>

                          <span className="relative text-lg font-normal text-amber-100/80 group-hover:text-white transition-colors duration-300 tracking-normal">
                            {link.name}
                          </span>

                          <span className="absolute bottom-0 left-3 right-3 h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Collections Dropdown */}
            <AnimatePresence>
              {collectionsOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setCollectionsOpen(false)}
                    className="fixed inset-0 z-0"
                  />

                  {/* Dropdown Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 z-50"
                  >
                    <div className="relative bg-linear-to-br from-slate-900 to-slate-950/95 backdrop-blur-xl border border-amber-500/20 rounded-2xl shadow-2xl shadow-black/30 p-4 overflow-hidden">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-400/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent"></div>

                      {/* Header */}
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-500/10">
                        <div className="p-1 bg-linear-to-br from-amber-500/20 to-yellow-500/10 rounded-lg">
                          <FolderOpen className="w-4 h-4 text-amber-300" />
                        </div>
                        <h3 className="text-lg font-light text-amber-100 allura-regular tracking-wider">
                          Browse Collections
                        </h3>
                        {catalogue.length > 0 && (
                          <span className="ml-auto text-xs text-amber-300/60 bg-amber-500/10 px-2 py-1 rounded-full">
                            {catalogue.length} items
                          </span>
                        )}
                      </div>

                      {/* Collections List - No Scroll */}
                      <div className="space-y-1 max-h-[60vh]">
                        {loading ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="relative">
                              <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin"></div>
                            </div>
                            <span className="ml-3 text-sm text-amber-300/70">
                              Loading collections...
                            </span>
                          </div>
                        ) : error ? (
                          <div className="text-center py-4">
                            <span className="text-sm text-amber-300/70">
                              {error}
                            </span>
                          </div>
                        ) : catalogue.length === 0 ? (
                          <div className="text-center py-2">
                            <Sparkles className="w-8 h-8 text-amber-300/40 mx-auto mb-2" />
                            <span className="text-sm text-amber-300/70">
                              No collections available
                            </span>
                          </div>
                        ) : (
                          catalogue.map((cat, index) => (
                            <motion.div
                              key={cat._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.02, x: 5 }}
                              className="relative"
                            >
                              <Link
                                href={`/catalogue/${cat._id}?title=${encodeURIComponent(cat.title)}`}
                                onClick={() => {
                                  setActiveLink("Collections");
                                  setCollectionsOpen(false);
                                }}
                                className="group flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-transparent hover:border-amber-500/10"
                              >
                                {/* Collection Image or Icon */}
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center">
                                  {cat.imageUrl ? (
                                    <img
                                      src={cat.imageUrl}
                                      alt={cat.title}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231e293b"/><text x="50" y="50" font-family="Arial" font-size="40" fill="%23fbbf24" text-anchor="middle" dy=".3em">💎</text></svg>';
                                      }}
                                    />
                                  ) : (
                                    <Sparkles className="w-5 h-5 text-amber-300/60" />
                                  )}
                                </div>

                                {/* Collection Info */}
                                <div className="flex-1 min-w-0 ">
                                  <h4 className="text-lg font-medium text-amber-100 truncate group-hover:text-white transition-colors allura-regular ">
                                    {cat.title}
                                  </h4>
                                  <p className="text-xs  text-amber-300/60 truncate ">
                                    {cat.subtitle || "Explore collection"}
                                  </p>
                                </div>

                                {/* Arrow Indicator */}
                                <motion.div
                                  initial={{ x: 0 }}
                                  whileHover={{ x: 3 }}
                                  className="text-amber-300/40 group-hover:text-amber-300 transition-colors"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </motion.div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                              </Link>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-full group z-50"
          >
            <div className="absolute inset-0 bg-linear-to-r from-amber-500/10 to-yellow-300/10 rounded-full border border-amber-500/20 group-hover:border-amber-400/30 transition-all duration-300"></div>

            <div className="relative flex flex-col items-center justify-center space-y-1">
              <motion.div
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-4 h-0.5 bg-linear-to-r from-amber-300 to-yellow-200 rounded-full"
              />
              <motion.div
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-2 h-0.5 bg-linear-to-r from-amber-300 to-yellow-200 rounded-full"
              />
              <motion.div
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-4 h-0.5 bg-linear-to-r from-amber-300 to-yellow-200 rounded-full"
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
                          Menu
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

                  {/* Menu Items - No Scroll */}
                  <div className="flex-1 p-4">
                    <div className="space-y-2">
                      {mainNavLinks.map((link, index) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {link.name === "Collections" &&
                          catalogue.length > 0 ? (
                            // Collections with dropdown in mobile
                            <div className="relative">
                              <button
                                onClick={() =>
                                  setCollectionsOpen(!collectionsOpen)
                                }
                                className="w-full"
                              >
                                <div
                                  className={`flex items-center justify-between py-2 px-1 rounded-xl transition-all duration-300 ${
                                    activeLink === link.name
                                      ? "bg-linear-to-r from-amber-500/15 to-amber-500/5 border border-amber-500/20"
                                      : "hover:bg-slate-800/40 border border-transparent hover:border-amber-500/10"
                                  }`}
                                >
                                  {/* Left side with icon and text */}
                                  <div className="flex items-center ml-2 space-x-4">
                                    {/* Icon Container */}
                                    <div
                                      className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        activeLink === link.name
                                          ? "bg-linear-to-br from-amber-500/20 to-yellow-500/10"
                                          : "bg-slate-800/50 group-hover:bg-slate-700/50"
                                      }`}
                                    >
                                      <div
                                        className={`relative transition-all duration-300 ${
                                          activeLink === link.name
                                            ? "text-amber-300"
                                            : "text-amber-300/60 group-hover:text-amber-300"
                                        }`}
                                      >
                                        {link.icon}
                                      </div>
                                    </div>

                                    {/* Link Text */}
                                    <div>
                                      <span
                                        className={`block allura-regular text-2xl font-light tracking-wide transition-all duration-300 -mb-2 ${
                                          activeLink === link.name
                                            ? "text-amber-100"
                                            : "text-amber-100/80 group-hover:text-amber-100"
                                        }`}
                                      >
                                        {link.name}
                                      </span>
                                      <span className="text-xs text-amber-300/60">
                                        {catalogue.length} collections
                                      </span>
                                    </div>
                                  </div>

                                  {/* Arrow Indicator */}
                                  <motion.div
                                    animate={{
                                      rotate: collectionsOpen ? 180 : 0,
                                    }}
                                    className="transition-transform duration-300"
                                  >
                                    <ChevronDown className="w-5 h-5 text-amber-300/60" />
                                  </motion.div>
                                </div>
                              </button>

                              {/* Mobile Collections Dropdown */}
                              <AnimatePresence>
                                {collectionsOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="ml-10 mt-1 space-y-1"
                                  >
                                    {loading ? (
                                      <div className="text-center py-2">
                                        <span className="text-sm text-amber-300/70">
                                          Loading...
                                        </span>
                                      </div>
                                    ) : error ? (
                                      <div className="text-center py-2">
                                        <span className="text-sm text-amber-300/70">
                                          {error}
                                        </span>
                                      </div>
                                    ) : (
                                      catalogue.map((cat) => (
                                        <Link
                                          key={cat._id}
                                          href={`/catalogue/${cat._id}?title=${encodeURIComponent(cat.title)}`}
                                          onClick={() => {
                                            setActiveLink("Collections");
                                            setIsOpen(false);
                                          }}
                                          className="flex items-center gap-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                                        >
                                          <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center">
                                            <img
                                              src={cat.imageUrl}
                                              alt={cat.title}
                                              className="w-full h-full object-cover"
                                              onError={(e) => {
                                                (
                                                  e.target as HTMLImageElement
                                                ).src =
                                                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231e293b"/><text x="50" y="50" font-family="Arial" font-size="40" fill="%23fbbf24" text-anchor="middle" dy=".3em">💎</text></svg>';
                                              }}
                                            />
                                          </div>
                                          <span className="text-lg text-amber-100/80 allura-regular ">
                                            {cat.title}
                                          </span>
                                        </Link>
                                      ))
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            // Regular link
                            <Link
                              href={link.href}
                              onClick={() => {
                                setActiveLink(link.name);
                                setIsOpen(false);
                              }}
                              className="relative group"
                            >
                              <div
                                className={`flex items-center justify-between py-2 px-1 rounded-xl transition-all duration-300 ${
                                  activeLink === link.name
                                    ? "bg-linear-to-r from-amber-500/15 to-amber-500/5 border border-amber-500/20"
                                    : "hover:bg-slate-800/40 border border-transparent hover:border-amber-500/10"
                                }`}
                              >
                                {/* Left side with icon and text */}
                                <div className="flex items-center ml-2 space-x-4">
                                  {/* Icon Container */}
                                  <div
                                    className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                                      activeLink === link.name
                                        ? "bg-linear-to-br from-amber-500/20 to-yellow-500/10"
                                        : "bg-slate-800/50 group-hover:bg-slate-700/50"
                                    }`}
                                  >
                                    <div
                                      className={`relative transition-all duration-300 ${
                                        activeLink === link.name
                                          ? "text-amber-300"
                                          : "text-amber-300/60 group-hover:text-amber-300"
                                      }`}
                                    >
                                      {link.icon}
                                    </div>
                                  </div>

                                  {/* Link Text */}
                                  <div>
                                    <span
                                      className={`block allura-regular text-2xl font-light tracking-wide transition-all duration-300 -mb-2 ${
                                        activeLink === link.name
                                          ? "text-amber-100"
                                          : "text-amber-100/80 group-hover:text-amber-100"
                                      }`}
                                    >
                                      {link.name}
                                    </span>
                                  </div>
                                </div>

                                {/* Arrow Indicator */}
                                <motion.div
                                  animate={{ x: 0 }}
                                  className={`transition-all duration-300 ${
                                    activeLink === link.name
                                      ? "text-amber-300"
                                      : "text-amber-300/30 group-hover:text-amber-300/60"
                                  }`}
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </motion.div>
                              </div>
                            </Link>
                          )}
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
