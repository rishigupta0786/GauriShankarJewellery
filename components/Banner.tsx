"use client";

import { useEffect, useState } from "react";
import JewelleryHero from "./JewelleryHero";
import Image from "next/image";
import leftpeacock from "@/public/16190.png";
import rightpeacock from "@/public/16191.png";
import Particles from "@/components/Particles";

type MetalPrices = {
  gold: number;
  silver: number;
};

export default function Banner() {
  const [prices, setPrices] = useState<MetalPrices | null>(null);

  const USD_INR = 90;
  const OUNCE_TO_GRAM = 31.1035;
  const INDIA_FACTOR = 1.08;

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("https://data-asg.goldprice.org/dbXRates/USD");
        const data = await res.json();
        const goldUSD = data.items[0].xauPrice;
        const silverUSD = data.items[0].xagPrice;

        const goldINR = ((goldUSD * USD_INR) / OUNCE_TO_GRAM) * INDIA_FACTOR;
        const silverINR =
          ((silverUSD * USD_INR) / OUNCE_TO_GRAM) * INDIA_FACTOR;

        setPrices({ gold: goldINR, silver: silverINR });
      } catch (err) {
        console.error("Failed to fetch metal prices:", err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 3600000); // 1 hour
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
        h-[70vh]        
        lg:h-[80vh]
        sticky 
        top-15
        py-10
        z-10
        flex flex-col
        items-center justify-around
        bg-linear-to-b from-gray-900 to-gray-950
        text-amber-300
        overflow-hidden
      "
    >
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

      {/* Main content container */}
      <div className="w-full flex items-center justify-evenly relative z-10">
        <div className=" hidden md:flex justify-start">
          <Image 
            src={leftpeacock} 
            alt="left" 
            width={250}
          />
        </div>
        <div className="flex-none mx-4 lg:mx-8 relative z-10">
          <JewelleryHero />
        </div>
        <div className=" hidden md:flex justify-end relative z-10">
          <Image 
            src={rightpeacock} 
            alt="right" 
            width={250}
          />
        </div>
      </div>

      {/* Prices Container - Pushed to the bottom */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 px-4 relative z-10">
        <div className="flex items-center justify-center px-6 py-3 border border-gray-700 rounded-xl bg-gray-800/70 backdrop-blur-md shadow-lg hover:shadow-[0_0_15px_5px_rgba(255,191,0,0.8)] transition-all duration-300">
          <span className="font-sans text-sm text-amber-400 font-medium">
            GOLD :- {prices ? `₹${prices.gold.toFixed(0)}/g` : "Loading..."}
          </span>
        </div>

        <div className="flex items-center justify-center px-6 py-3 border border-gray-700 rounded-xl bg-gray-800/70 backdrop-blur-md shadow-lg hover:shadow-[0_0_15px_5px_rgba(192,192,192,0.8)] transition-all duration-300">
          <span className="font-sans text-sm text-gray-300 font-medium">
            SILVER :- {prices ? `₹${prices.silver.toFixed(0)}/g` : "Loading..."}
          </span>
        </div>
      </div>
    </section>
  );
}