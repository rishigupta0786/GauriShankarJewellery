"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Particles from "@/components/Particles";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const socialLinks = [
    {
      name: "WhatsApp",
      color: "#25D366",
      image: "/whatsapp.png",
      href: "https://wa.me/919795551369",
    },
    {
      name: "Facebook",
      color: "#1877F2",
      image: "/facebook.png",
      href: "https://facebook.com/your-profile",
    },
    {
      name: "Instagram",
      color: "#E4405F",
      image: "/instagram.png",
      href: "https://www.instagram.com/gaurishankar_jewellers1569?utm_source=qr&igsh=MWgxbjVnZDd1OGxx",
    },
    {
      name: "Phone",
      color: "#d600f0de",
      image: "/phone.png",
      href: "tel:+919795551369",
    },
    {
      name: "VisitingCard",
      color: "#e73535",
      image: "/visiting_card.png",
      href: "#",
    },
    {
      name: "SMS",
      color: "#00b0f0",
      image: "/message.png",
      href: "sms:+919795551369",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0">
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

      {/* Main Content - Added top padding for navbar */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4  ">
        {/* Header with proper spacing */}
        <motion.div
          className="text-center pt-12 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="allura-regular text-4xl md:text-6xl lg:text-7xl text-amber-400 mb-4 mt-4">
            Get In Touch
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl allura-regular px-4">
            Connect with us through your favorite platform
          </p>
        </motion.div>

        {/* Social Cards Grid - Updated with grid layout */}
        <div className="w-full max-w-4xl px-4 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={
                  social.name === "Phone" || social.name === "SMS"
                    ? undefined
                    : "_blank"
                }
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1 + 0.3,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
                onMouseEnter={() => setActiveCard(social.name)}
                onMouseLeave={() => setActiveCard(null)}
                className="relative group h-full"
              >
                {/* Card - Updated to rectangular and taller */}
                <div className="relative h-full rounded-3xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 group-hover:border-amber-500/50 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30">
                  {/* Hover Glow */}
                  {activeCard === social.name && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      style={{ backgroundColor: social.color }}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/30" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-6 ">
                    {/* Icon Container */}
                    <motion.div
                      className="relative w-28 h-28 mb-4"
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-2xl" />
                      <Image
                        src={social.image}
                        alt={social.name}
                        fill
                        className="object-contain p-4"
                        priority
                      />

                      {/* Pulsing Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: social.color }}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    {/* Social Name */}
                    <motion.h3
                      className="text-3xl md:text-4xl allura-regular text-center "
                      whileHover={{ scale: 1.05 }}
                      style={{ color: social.color }}
                    >
                      {social.name}
                    </motion.h3>

                    {/* Click Indicator */}
                    <motion.div
                      className="flex items-center justify-center gap-1"
                      animate={{
                        opacity: activeCard === social.name ? 1 : 0.7,
                      }}
                    >
                      <span className="text-amber-400/80 text-xl allura-regular">
                        Click to connect
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Hover Indicator */}
                <AnimatePresence>
                  {activeCard === social.name && (
                    <motion.div
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <div className="w-6 h-6 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
