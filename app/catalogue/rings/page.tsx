"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";
import ProductCard from "@/components/ProductCard";
import GalleryModal from "@/components/GalleryModal";
import { rings } from "@/data/rings";

export default function RingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "weight" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "gold" | "diamond" | "platinum"
  >("all");

  // Modal state at page level
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalCurrent, setModalCurrent] = useState(0);
  const [modalProduct, setModalProduct] = useState<{
    articleCode: string;
    grossWeight: string;
    netWeight: string;
    designName: string;
    purity: string;
  } | null>(null);

  // Function to open modal from ProductCard
  const openModal = (product: any) => {
    const images = [
      product.gallery.image,
      product.gallery.side1,
      product.gallery.side2,
      product.gallery.side3,
    ];
    setModalImages(images);
    setModalCurrent(0);
    setModalProduct({
      articleCode: product.articleCode,
      grossWeight: product.grossWeight,
      netWeight: product.netWeight,
      designName: product.designName,
      purity: product.purity,
    });
    setIsModalOpen(true);
  };

  // Filter and sort rings
  const filteredRings = useMemo(() => {
    let result = [...rings];

    // Apply category filter
    if (activeFilter !== "all") {
      result = result.filter((ring) => {
        const name = ring.designName.toLowerCase();
        if (activeFilter === "gold")
          return name.includes("gold") || name.includes("yellow");
        if (activeFilter === "diamond")
          return name.includes("diamond") || name.includes("solitaire");
        if (activeFilter === "platinum")
          return name.includes("platinum") || name.includes("white");
        return true;
      });
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (ring) =>
          ring.designName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ring.articleCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.designName.localeCompare(b.designName)
            : b.designName.localeCompare(a.designName);
        } else {
          const weightA = parseFloat(a.netWeight);
          const weightB = parseFloat(b.netWeight);
          return sortOrder === "asc" ? weightA - weightB : weightB - weightA;
        }
      });
    }

    return result;
  }, [searchTerm, sortBy, sortOrder, activeFilter]);

  const toggleSort = (type: "name" | "weight") => {
    if (sortBy === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(type);
      setSortOrder("asc");
    }
  };

  const clearAll = () => {
    setSearchTerm("");
    setSortBy("");
    setSortOrder("asc");
    setActiveFilter("all");
  };

  // Fixed: Properly typed variants with explicit Variants type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const filterVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  // Entrance animation variants
  const titleVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const dividerVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: "80%",  
      transition: {
        delay: 0.5,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  const buttonHoverAnimation = {
    scale: 1.05 as const,
    y: -2 as const,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  };

  const buttonTapAnimation = {
    scale: 0.95 as const,
  };

  return (
    <>
      {/* <Navbar /> */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-950 px-4 sm:px-6 py-16 relative overflow-hidden"
      >
        {/* Animated Glowing Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/3 rounded-full blur-3xl"
        />

        {/* Enhanced Particles */}
        <div className="absolute inset-0">
          <Particles
            className="w-full h-full"
            particleColors={["#FFD700", "#FFE55C", "#FFAA33", "#FF8800"]}
            particleCount={400}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Enhanced Title Section */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-linear-to-r from-amber-500/20 to-rose-500/20 blur-2xl rounded-full"></div>
              <h1 className="relative text-5xl sm:text-7xl lg:text-8xl allura-regular text-transparent bg-clip-text bg-linear-to-br from-amber-200 via-amber-100 to-rose-100 py-3 ">
                Rings Collection
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-gray-300 text-2xl allura-regular font-light tracking-wider max-w-2xl mx-auto"
            >
              Timeless elegance meets unparalleled craftsmanship in every piece
            </motion.p>

            {/* Decorative divider */}
            <motion.div
              variants={dividerVariants}
              initial="hidden"
              animate="visible"
              className="h-px bg-linear-to-r w-full from-transparent via-amber-400 to-transparent mx-auto my-6"
            />
          </motion.div>

          {/* Enhanced Filter Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className=" mb-10 px-4 sm:px-0"
          >
            {/* Search and Sort - Enhanced Layout */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 "
            >
              {/* Luxury Search Bar */}
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative grow max-w-xl"
              >
                <div className="absolute inset-0 bg-linear-to-r from-amber-500/10 to-rose-500/10 blur-sm rounded-xl"></div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for exquisite rings..."
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all text-base"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Sort Buttons */}
              <motion.div className="flex items-center gap-3">
                <motion.button
                  whileHover={buttonHoverAnimation}
                  whileTap={buttonTapAnimation}
                  onClick={() => toggleSort("name")}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 backdrop-blur-sm border ${
                    sortBy === "name"
                      ? "bg-linear-to-r from-amber-600 to-amber-700 text-white border-amber-500 shadow-lg shadow-amber-500/30"
                      : "bg-gray-900/50 text-gray-300 border-gray-700 hover:bg-gray-800/50 hover:border-amber-400/30"
                  }`}
                >
                  <span>📝</span>
                  Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </motion.button>

                <motion.button
                  whileHover={buttonHoverAnimation}
                  whileTap={buttonTapAnimation}
                  onClick={() => toggleSort("weight")}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 backdrop-blur-sm border ${
                    sortBy === "weight"
                      ? "bg-linear-to-r from-amber-600 to-amber-700 text-white border-amber-500 shadow-lg shadow-amber-500/30"
                      : "bg-gray-900/50 text-gray-300 border-gray-700 hover:bg-gray-800/50 hover:border-amber-400/30"
                  }`}
                >
                  <span>⚖️</span>
                  Weight{" "}
                  {sortBy === "weight" && (sortOrder === "asc" ? "↑" : "↓")}
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Active Filters Indicator - Enhanced */}
            <AnimatePresence mode="wait">
              {(searchTerm || sortBy || activeFilter !== "all") && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
                    <p className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-amber-400">✨</span>
                      Showing {filteredRings.length} exquisite piece
                      {filteredRings.length !== 1 ? "s" : ""}
                      {searchTerm && (
                        <span className="text-white ml-2">
                          for "
                          <span className="text-amber-300">{searchTerm}</span>"
                        </span>
                      )}
                      {sortBy && (
                        <span className="text-gray-400 ml-2">
                          • sorted by {sortBy} ({sortOrder})
                        </span>
                      )}
                      {activeFilter !== "all" && (
                        <span className="text-gray-400 ml-2">
                          • category:{" "}
                          <span className="text-amber-300">{activeFilter}</span>
                        </span>
                      )}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={clearAll}
                      className="text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                    >
                      Clear all
                      <span>✕</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Products Grid with Staggered Animation */}
          <AnimatePresence mode="wait">
            {filteredRings.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-4 sm:px-0"
              >
                {filteredRings.map((ring) => (
                  <motion.div
                    key={ring.articleCode}
                    variants={itemVariants}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                    className="relative"
                  >
                    <ProductCard
                      gallery={ring.gallery}
                      articleCode={ring.articleCode}
                      grossWeight={ring.grossWeight}
                      netWeight={ring.netWeight}
                      designName={ring.designName}
                      purity={ring.purity}
                      onOpenModal={() => openModal(ring)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="text-center py-24 px-4"
              >
                <div className="inline-block rounded-2xl bg-linear-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="text-6xl mb-4"
                  >
                    💍
                  </motion.div>
                  <p className="text-gray-400 text-xl mb-2">
                    No rings found matching your criteria
                  </p>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your search or filters
                  </p>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(217, 119, 6, 0.8)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearAll}
                    className="mt-6 px-6 py-2 rounded-full bg-linear-to-r from-amber-600 to-amber-700 text-white text-sm font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all"
                  >
                    Reset Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Luxury Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 text-amber-400/20 text-4xl"
        >
          ✦
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 text-rose-400/20 text-4xl"
        >
          ✦
        </motion.div>
      </motion.section>

      {/* Gallery Modal - Outside main content */}
      <AnimatePresence>
        {isModalOpen && modalProduct && (
          <GalleryModal
            images={modalImages}
            current={modalCurrent}
            setCurrent={setModalCurrent}
            onClose={() => setIsModalOpen(false)}
            articleCode={modalProduct.articleCode}
            grossWeight={modalProduct.grossWeight}
            netWeight={modalProduct.netWeight}
            designName={modalProduct.designName}
            purity={modalProduct.purity}
          />
        )}
      </AnimatePresence>
    </>
  );
}
