"use client";

import Image from "next/image";
import Particles from "@/components/Particles";

export default function Contact() {
  return (
    <div className="relative w-full h-screen bg-gray-950 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          className="w-full h-screen"
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Foreground Content - Made click-through */}
      <div className="relative z-10 flex h-screen items-center justify-center p-4 pointer-events-none">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-32 pointer-events-auto">
          {/* WhatsApp */}
          <a 
            // href="https://wa.me/your-number" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center pointer-events-auto"
          >
            <div className="relative w-40 h-40  lg:w-52 lg:h-52">
              <Image
                src="/whatsapp.png"
                alt="WhatsApp"
                fill
                className="object-contain hover:scale-110 transition-transform duration-300 pointer-events-auto"
                priority
              />
            </div>
            <p className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-amber-400 tracking-wide allura-regular pointer-events-auto">
              WhatsApp
            </p>
          </a>

          {/* Instagram */}
          <a 
            // href="https://instagram.com/your-profile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center pointer-events-auto"
          >
            <div className="relative w-40 h-40  lg:w-52 lg:h-52">
              <Image
                src="/instagram.png"
                alt="Instagram"
                fill
                className="object-contain hover:scale-110 transition-transform duration-300 pointer-events-auto"
                priority
              />
            </div>
            <p className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-amber-400 tracking-wide allura-regular pointer-events-auto">
              Instagram
            </p>
          </a>
          {/* Facebook */}
          <a 
            // href="https://facebook.com/your-profile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center pointer-events-auto"
          >
            <div className="relative w-40 h-40  lg:w-52 lg:h-52">
              <Image
                src="/facebook.png"
                alt="Facebook"
                fill
                className="object-contain hover:scale-110 transition-transform duration-300 pointer-events-auto"
                priority
              />
            </div>
            <p className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-amber-400 tracking-wide allura-regular pointer-events-auto">
              Facebook
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}