"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Particles from "./Particles";

interface CatalogueItem {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  createdAt: string;
}

export default function Catalogue() {
  const [isVisible, setIsVisible] = useState(false);
  const [catalogue, setCatalogue] = useState<CatalogueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCatalogue();
    setIsVisible(true);
  }, []);

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
  // Loading state
  if (loading) {
    return (
      <section className="relative z-20 bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden min-h-screen">
        <div className="absolute inset-0 z-0">
          <Particles
            className="w-full h-full"
            particleColors={["#ffca32", "#ffca32"]}
            particleCount={350}
            particleSpread={8}
            speed={0.15}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        <div className="pt-10"></div>

        <div className="text-center py-40">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400"></div>
          <p className="mt-4 text-amber-200 allura-regular text-6xl allura-regular">
            Loading collections...
          </p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative z-20 bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden min-h-screen">
        <div className="absolute inset-0 z-0">
          <Particles
            className="w-full h-full"
            particleColors={["#ffca32", "#ffca32"]}
            particleCount={350}
            particleSpread={8}
            speed={0.15}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        <div className="pt-10"></div>

        <div className="text-center py-40">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-red-300 text-xl mb-4">Error Loading Catalogue</p>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchCatalogue}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Empty state
  if (catalogue.length === 0) {
    return (
      <section className="relative z-20 bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden min-h-screen">
        <div className="absolute inset-0 z-0">
          <Particles
            className="w-full h-full"
            particleColors={["#ffca32", "#ffca32"]}
            particleCount={350}
            particleSpread={8}
            speed={0.15}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        <div className="pt-10"></div>

        <div className="text-center py-40">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <span className="text-3xl text-gray-400">📦</span>
          </div>
          <p className="text-amber-200 allura-regular text-3xl mb-2">
            No Collections Yet
          </p>
          <p className="text-gray-400 mb-6">
            Check back soon for our latest collections
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-20 bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* CRITICAL: Add top margin/padding to push content below sticky banner */}
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          className="w-full h-full"
          particleColors={["#ffca32", "#ffca32"]}
          particleCount={350}
          particleSpread={8}
          speed={0.15}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      <div className="pt-10"></div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/3 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-10 w-80 h-80 bg-amber-900/5 rounded-full blur-3xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Section Title */}
      <motion.div
        className="text-center mb-8 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="allura-regular text-4xl md:text-6xl lg:text-7xl text-amber-200">
          Our Collections
        </h1>
        <p className="text-gray-400 mb-4 text-2xl max-w-2xl mx-auto allura-regular">
          Discover our exquisite range of handcrafted pieces
        </p>
        <motion.div
          className="h-1 w-[70%] bg-linear-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full"
          animate={{
            scaleX: [0.5, 1, 0.5],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Category Grid with Staggered Animation */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 p-10">
        {catalogue.map((cat, index) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: index * 0.2 + 0.3,
            }}
            whileHover={{
              scale: 1.05,
              y: -10,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
            className="relative"
          >
            {/* `/dashboard/catalogue/${itemId}?title=${encodeURIComponent(itemTitle)}`, */}

            <Link
              href={`/catalogue/${cat._id}?title=${encodeURIComponent(cat.title)}`}
              className="block"
            >
              {/* Card Container */}
              <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden group">
                {/* Background Layers */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-900/90 to-gray-950/90 border border-gray-800/50 rounded-3xl"></div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border border-transparent"
                  animate={{
                    boxShadow: [
                      "inset 0 0 0px 0px rgba(251, 191, 36, 0)",
                      "inset 0 0 30px 0px rgba(251, 191, 36, 0.2)",
                      "inset 0 0 0px 0px rgba(251, 191, 36, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />

                {/* Image Container */}
                <motion.div
                  className="relative h-2/3 flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    rotate: 2,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    },
                  }}
                >
                  <div className="relative w-48 h-48 md:w-56 md:h-56">
                    {cat.imageUrl ? (
                      <Image
                        src={cat.imageUrl}
                        alt={cat.title}
                        fill
                        className="object-contain"
                        priority
                        onError={(e) => {
                          // Fallback if image fails to load
                          (e.target as HTMLImageElement).src =
                            "/fallback-image.jpg";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
                        <span className="text-4xl">📦</span>
                      </div>
                    )}

                    {/* Floating Particles */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.1,
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-2 -left-2 w-3 h-3 bg-amber-300 rounded-full"
                      animate={{
                        y: [0, 10, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Text Container */}
                <div className="absolute bottom-0 w-full py-6 px-4">
                  <div className="relative">
                    {/* Background for text */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent rounded-2xl backdrop-blur-sm group-hover:opacity-100 opacity-70 transition-opacity"></div>

                    {/* Collection Name */}
                    <motion.h3
                      className="relative text-3xl md:text-4xl text-amber-200 allura-regular text-center py-4"
                      whileHover={{
                        scale: 1.05,
                        textShadow: "0 0 25px rgba(251, 191, 36, 0.8)",
                        transition: {
                          type: "spring",
                          stiffness: 400,
                        },
                      }}
                    >
                      {cat.title}
                    </motion.h3>
                    {/* View More Indicator */}
                    <motion.div
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    </motion.div>
                  </div>
                </div>

                {/* Corner Accents */}
                <motion.div
                  className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </div>
            </Link>

            {/* Floating Tag */}
            <motion.div
              className="absolute -top-3 right-4 bg-amber-900/80 text-amber-100 text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-amber-700/30"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.8 }}
            >
              Collection
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Decorative Line */}
      <motion.div
        className="mt-16 md:mt-24 text-center pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="inline-flex items-center gap-4 text-gray-500">
          <motion.div
            className="w-12 h-px bg-linear-to-r from-transparent to-amber-600/50"
            animate={{ width: ["0px", "48px", "0px"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <span className="text-sm">Scroll to explore more</span>
          <motion.div
            className="w-12 h-px bg-linear-to-l from-transparent to-amber-600/50"
            animate={{ width: ["0px", "48px", "0px"] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
