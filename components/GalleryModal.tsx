"use client";

import {
  X,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Scale,
  Hash,
  Tag,
  Sparkles,
  Weight,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type GalleryModalProps = {
  images: string[];
  current: number;
  setCurrent: (index: number) => void;
  onClose: () => void;
  articleCode: string;
  grossWeight: string;
  netWeight: string;
  designName: string;
  purity: string;
};

export default function GalleryModal({
  images,
  current,
  setCurrent,
  onClose,
  articleCode,
  grossWeight,
  netWeight,
  designName,
  purity,
}: GalleryModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation variants
  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      >
        {/* Glass Morphic Backdrop */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-gray-800/95 via-black/90 to-gray-800"
          onClick={onClose}
        />

        {/* Glass Morphic Modal Container */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-6xl h-[80vh] flex flex-col md:flex-row bg-gray-950 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Close Button */}
          <motion.button
              whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/5 hover:bg-red-700 backdrop-blur-sm text-white rounded-full transition-all duration-300 z-30"
          >
            <X className="w-4 h-4 text-red-700 hover:text-white sm:w-5 sm:h-5" />
          </motion.button>

          {/* Mobile View - Gallery with Details at Bottom */}
          {isMobile ? (
            <div className="flex flex-col h-full">
              {/* Image Gallery Section */}
              <div className="flex-1 relative bg-linear-to-br from-gray-900/30 via-gray-800/20 to-gray-900/30 backdrop-blur-sm">
                {/* Navigation Arrows */}
                <motion.button
                  // whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCurrent(current > 0 ? current - 1 : images.length - 1)
                  }
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-4 hover:bg-white/20  text-white rounded-full transition-all duration-300 z-10"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </motion.button>

                <motion.button
                  // whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCurrent(current < images.length - 1 ? current + 1 : 0)
                  }
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-4 rounded-full transition-all duration-300 z-10"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </motion.button>

                {/* Image Counter */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/40 backdrop-blur-sm text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full z-10">
                  <span className="font-medium">{current + 1}</span>
                  <span className="text-gray-300"> / {images.length}</span>
                </div>

                {/* Main Image */}
                <div className="relative w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={images[current]}
                        alt={`Product view ${current + 1}`}
                        fill
                        className="object-contain p-4 sm:p-6"
                        sizes="100vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Thumbnails */}
                <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2 px-2 sm:px-4">
                  {images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrent(idx)}
                      className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 border ${
                        current === idx
                          ? "border-amber-400 shadow-lg shadow-amber-500/30 scale-110"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 40px, 56px"
                      />
                      <div
                        className={`absolute inset-0 ${
                          current === idx ? "bg-amber-400/20" : "bg-black/30"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Details Section at Bottom - Mobile */}
              <div className="bg-linear-to-b from-gray-900/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm border-t border-white/10 p-4 overflow-y-auto max-h-[50%]">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      <Diamond className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                    <h2 className="text-lg font-light text-white">
                      Product Details
                    </h2>
                  </div>
                  <div className="h-px bg-linear-to-r from-amber-500/30 via-amber-300/50 to-transparent" />
                </div>

                {/* Design Name */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-2xl font-serif text-amber-100">
                    {designName}
                  </div> 
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-amber-500/20">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    <span className="text-md text-amber-200 font-medium">
                      {purity} Gold
                    </span>
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="space-y-3">
                  <div className="grid-cols-2 gap-3">
                    {/* Article Code */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-300 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white/10 rounded">
                          <Tag className="w-5 h-5 text-amber-300" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">
                            Article Code
                          </div>
                          <div className="text-sm font-sans text-white">
                            {articleCode}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gross Weight */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-300 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white/10 rounded">
                          <Weight className="w-5 h-5 text-amber-300" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">
                            Gross Weight
                          </div>
                          <div className="text-base font-sans text-amber-300">
                            {grossWeight}g
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Net Weight */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-300 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white/10 rounded">
                          <Scale className="w-5 h-5 text-amber-300" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">
                            Net Weight
                          </div>
                          <div className="text-base font-sans text-amber-300">  
                            {netWeight}g
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Material Info */}
                    <div className="bg-linear-to-br from-amber-900/20 to-transparent rounded-lg p-3 border border-amber-500/20 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-amber-900/30 rounded">
                          <Diamond className="w-5 h-5 text-amber-300" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Material</div> 
                          <div className="text-sm font-sans text-amber-200">
                            {purity} Gold
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop View - Split Layout */
            <>
              {/* Left Side - Image Gallery */}
              <div className="flex-1 relative bg-linear-to-br from-gray-900/30 via-gray-800/20 to-gray-900/30 ">
                {/* Navigation Arrows */}
                <motion.button
                  // whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCurrent(current > 0 ? current - 1 : images.length - 1)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 hover:bg-white/30 rounded-full transition-all duration-300 z-10"
                >
                  <ChevronLeft className="w-5 h-5 text-black" />
                </motion.button>

                <motion.button
                  // whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCurrent(current < images.length - 1 ? current + 1 : 0)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 hover:bg-white/30  text-white rounded-full transition-all duration-300 z-10"
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </motion.button>

                {/* Image Counter */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full z-10">
                  <span className="font-medium">{current + 1}</span>
                  <span className="text-gray-300"> / {images.length}</span>
                </div>

                {/* Main Image */}
                <div className="relative w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={images[current]}
                        alt={`Product view ${current + 1}`}
                        fill
                        className="object-contain p-8"
                        sizes="50vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                  {images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrent(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 border ${
                        current === idx
                          ? "border-amber-400 shadow-lg shadow-amber-500/30 scale-110"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <div
                        className={`absolute inset-0 ${
                          current === idx ? "bg-amber-400/20" : "bg-black/30"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right Side - Details Panel */}
              <div className="w-96 flex flex-col bg-linear-to-b from-gray-900/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm border-l border-white/10 p-6 overflow-y-auto">
                {/* Header */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      <Diamond className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                    <h2 className="text-xl font-light text-white">
                      Product Details
                    </h2>
                  </div>
                  <div className="h-px bg-linear-to-r from-amber-500/30 via-amber-300/50 to-transparent" />
                </div>

                {/* Design Name */}
                <div className="mb-5">
                  <h3 className="text-2xl font-serif text-amber-100 mb-2">
                    {designName}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-amber-500/20">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span className="text-sm text-amber-200 font-medium">
                      {purity} Gold
                    </span>
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-4 flex-1">
                  <div className="space-y-3">
                    <h4 className="text-base font-medium text-white flex items-center gap-2">
                      <div className="p-1 bg-white/10 rounded-lg">
                        <Hash className="w-3.5 h-3.5 text-amber-300" />
                      </div>
                      Specifications
                    </h4>

                    <div className="grid gap-3">
                      {/* Article Code */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-300 border border-white/5">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-white/10 rounded">
                            <Tag className="w-3.5 h-3.5 text-amber-300" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">
                              Article Code
                            </div>
                            <div className="text-sm font-medium text-white">
                              {articleCode}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Weights */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Gross Weight */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-300 border border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-white/10 rounded">
                              <Weight className="w-3.5 h-3.5 text-amber-300" />
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">
                                Gross Weight
                              </div>
                              <div className="text-base font-bold text-amber-300">
                                {grossWeight}g
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Net Weight */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-300 border border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-white/10 rounded">
                              <Scale className="w-3.5 h-3.5 text-amber-300" />
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">
                                Net Weight
                              </div>
                              <div className="text-base font-bold text-amber-300">
                                {netWeight}g
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material Info */}
                  <div className="bg-linear-to-br from-amber-900/20 to-transparent rounded-lg p-3 border border-amber-500/20 backdrop-blur-sm">
                    <h4 className="text-sm font-medium text-white mb-1.5">
                      Material Quality
                    </h4>
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-amber-900/30 rounded">
                        <Diamond className="w-4.5 h-4.5 text-amber-300" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-300">
                          Premium {purity} Gold
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Finest craftsmanship with certified purity
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
