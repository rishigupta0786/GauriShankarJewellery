"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Particles from "@/components/Particles";
import {
  Sparkles,
  Gem,
  Award,
  Heart,
  Users,
  Crown,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AboutPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("story");
  const [currentSlide, setCurrentSlide] = useState(0);

  const values = [
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Excellence",
      description: "Each piece is meticulously crafted to perfection",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion",
      description: "Driven by love for traditional craftsmanship",
      color: "text-rose-400",
      bg: "bg-rose-400/10",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Heritage",
      description: "Three generations of jewellery mastery",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Supporting local artisans and craftsmen",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  const milestones = [
    {
      year: "1985",
      title: "Foundation",
      description: "Established our first workshop in Jaipur",
    },
    {
      year: "2000",
      title: "Expansion",
      description: "Opened flagship store in Mumbai",
    },
    {
      year: "2015",
      title: "Innovation",
      description: "Introduced contemporary designs with traditional touch",
    },
    {
      year: "2023",
      title: "Global Reach",
      description: "Serving international clientele worldwide",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % milestones.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + milestones.length) % milestones.length
    );
  };

  const handleViewCollections = () => {
    router.push("/"); // Navigate to home page
  };

  const handleBookAppointment = () => {
    router.push("/contact"); // Navigate to contact page
  };

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0">
        <Particles
          className="w-full h-full"
          particleColors={["#fbbf24", "#f59e0b", "#d97706", "#ffffff"]}
          particleCount={1400}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <h1 className="allura-regular text-5xl md:text-7xl lg:text-8xl text-amber-200">
                Our Story
              </h1>
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto allura-regular">
              Where tradition meets timeless elegance
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-125 rounded-3xl overflow-hidden">
                <Image
                  src="/aboutHero.webp"
                  alt="Jewellery Workshop"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-950/70 via-transparent to-gray-950/30" />

                {/* Floating Badge */}
                <motion.div
                  className="absolute bottom-8 right-8 bg-amber-900/80 backdrop-blur-sm border border-amber-700/50 rounded-2xl p-3"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <Crown className="w-8 h-8 text-amber-400" />
                    <div>
                      <p className="text-white font-light allura-regular text-xl">
                        Since 1985
                      </p>
                      <p className="text-amber-200 text-lg font-light allura-regular ">
                        Crafting Excellence
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="allura-regular text-4xl md:text-5xl text-amber-300">
                A Legacy of Craftsmanship
              </h2>

              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Founded in 1985 by Master Goldsmith Rajesh Kumar, our journey
                  began in a small workshop in Jaipur, the heart of India's
                  jewellery heritage. What started as a passion for preserving
                  traditional techniques has evolved into a legacy spanning
                  three generations.
                </p>
                <p className="text-lg">
                  Today, we blend centuries-old craftsmanship with contemporary
                  design, creating pieces that tell stories and become
                  heirlooms. Each creation reflects our commitment to
                  excellence, ethical sourcing, and the timeless beauty of
                  Indian jewellery.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-gray-800/50">
                  <p className="text-3xl font-bold text-amber-400 allura-regular">
                    38+
                  </p>
                  <p className="text-gray-400 allura-regular">Years</p>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-gray-800/50">
                  <p className="text-3xl font-bold text-amber-400 allura-regular">
                    10K+
                  </p>
                  <p className="text-gray-400 allura-regular">Creations</p>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-gray-800/50">
                  <p className="text-3xl font-bold text-amber-400 allura-regular">
                    50+
                  </p>
                  <p className="text-gray-400 allura-regular">Artisans</p>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-gray-800/50">
                  <p className="text-3xl font-bold text-amber-400 allura-regular">
                    100%
                  </p>
                  <p className="text-gray-400 allura-regular">Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Our Values */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="allura-regular text-4xl md:text-5xl text-center text-amber-200 mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`p-6 rounded-2xl border border-gray-800/50 ${value.bg} backdrop-blur-sm`}
                >
                  <div className={`mb-4 ${value.color}`}>{value.icon}</div>
                  <h3 className="text-3xl font-light text-white mb-2 allura-regular">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline - Improved Mobile Design */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="allura-regular text-4xl md:text-5xl text-center text-amber-200 mb-12">
              Our Journey
            </h2>

            {/* Mobile Timeline - Horizontal Cards */}
            <div className="md:hidden">
              <div className="relative">
                {/* Current Card */}
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8"
                >
                  <div className="flex flex-col items-center">
                    {/* Year Marker */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-amber-900/70 backdrop-blur-sm border border-amber-700/50 rounded-full flex items-center justify-center">
                        <span className="text-amber-300 font-bold text-2xl allura-regular">
                          {milestones[currentSlide].year}
                        </span>
                      </div>
                      <motion.div
                        className="absolute inset-0 border-2 border-amber-400 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-white mb-3 allura-regular">
                        {milestones[currentSlide].title}
                      </h3>
                      <p className="text-gray-300">
                        {milestones[currentSlide].description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={prevSlide}
                    className="p-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6 text-amber-400" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex items-center gap-3">
                    {milestones.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-amber-400 scale-125"
                            : "bg-gray-600 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="p-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden md:block relative max-w-6xl mx-auto px-4">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-linear-to-b from-amber-400/20 via-amber-400/50 to-amber-400/20" />

              <div className="space-y-0">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.9 }}
                    className="relative"
                  >
                    <div className="flex items-center w-full min-h-30">
                      {/* Left Side Content - Even indices */}
                      <div
                        className={`w-1/2 ${
                          index % 2 === 0 ? "pr-16" : "opacity-0"
                        }`}
                      >
                        {index % 2 === 0 && (
                          <div className="flex justify-end">
                            <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-2xl px-6 py-3 max-w-md">
                              <h3 className="text-2xl text-center  font-light text-amber-300  allura-regular">
                                {/* <Star className="w-5 h-5 text-amber-400 shrink-0" /> */}
                                {milestone.title}
                              </h3>
                              <p className="text-gray-400">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Center Marker */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-10">
                        <div className="relative">
                          <div className="w-16 h-16 bg-amber-900/70 backdrop-blur-sm border border-amber-700/50 rounded-full flex items-center justify-center">
                            <span className="text-amber-300 font-bold text-lg allura-regular">
                              {milestone.year}
                            </span>
                          </div>
                          <motion.div
                            className="absolute inset-0 border-2 border-amber-400 rounded-full"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.2, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                            }}
                          />
                        </div>
                        {/* <div className="mt-2 text-sm text-amber-300 font-medium allura-regular">{milestone.title}</div> */}
                      </div>

                      {/* Right Side Content - Odd indices */}
                      <div
                        className={`w-1/2 ${
                          index % 2 === 1 ? "pl-16" : "opacity-0"
                        }`}
                      >
                        {index % 2 === 1 && (
                          <div className="flex justify-start">
                            <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-2xl px-6 py-3 max-w-md">
                              <h3 className="text-2xl text-center font-light text-amber-300 allura-regular">
                                {milestone.title}
                              </h3>
                              <p className="text-gray-400">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Craftsmanship Section */}
          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 md:p-12 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="allura-regular text-4xl md:text-5xl text-amber-300 mb-6">
                  The Art of Jewellery Making
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Our process combines traditional techniques with modern
                  precision. Each piece undergoes 47 meticulous steps, from
                  initial design to final polishing, ensuring perfection in
                  every detail.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Star className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-white">Hand-selected gemstones</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Star className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-white">
                      100% recycled precious metals
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Star className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-white">
                      Ethically sourced materials
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative h-75 md:h-100 rounded-2xl overflow-hidden mt-8 md:mt-0">
                <Image
                  src="/making.jpg"
                  alt="Craftsmanship"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="bg-linear-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 border border-amber-700/30 rounded-3xl p-8 md:p-12">
              <h2 className="allura-regular text-4xl md:text-5xl text-amber-200 mb-6">
                Experience Timeless Beauty
              </h2>
              <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto ">
                Visit our store or browse our collections to discover pieces
                that will become part of your story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleViewCollections}
                  className="px-6 py-3 md:px-8 md:py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 text-lg"
                >
                  View Collections
                </button>
                <button
                  onClick={handleBookAppointment}
                  className="px-6 py-3 md:px-8 md:py-3 border border-amber-600 text-amber-400 hover:bg-amber-600/10 rounded-full font-semibold transition-all duration-300 hover:scale-105  text-lg"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Quote */}
      <motion.div
        className="relative z-10 pb-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <blockquote className="allura-regular text-2xl md:text-3xl lg:text-4xl text-amber-100 italic px-4">
              "Jewellery is like the perfect spice – it always complements
              what's already there."
            </blockquote>
          </div>
          <p className="text-gray-400 mt-6 text-base md:text-lg allura-regular">
            — Rajesh Kumar, Founder
          </p>
        </div>
      </motion.div>
    </div>
  );
}
