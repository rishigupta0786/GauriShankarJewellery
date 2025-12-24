"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const Antigravity = dynamic(() => import("@/components/Antigravity"), {
  ssr: false,
});

export default function Contact() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Antigravity Background */}
      <div className="absolute inset-0 -z-10">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#FFFF00"
          autoAnimate
          particleVariance={1}
        />
      </div>

      {/* Foreground Centered Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="flex gap-32">
          
          {/* WhatsApp */}
          <div className="flex flex-col items-center">
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={200}
              height={200}
              priority
              className="hover:scale-110 transition-transform duration-300"
            />
            <p className="mt-4 text-2xl font-semibold text-white tracking-wide">
              WhatsApp
            </p>
          </div>

          {/* Instagram */}
          <div className="flex flex-col items-center">
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={200}
              height={200}
              priority
              className="hover:scale-110 transition-transform duration-300"
            />
            <p className="mt-4 text-2xl font-semibold text-white tracking-wide">
              Instagram
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
