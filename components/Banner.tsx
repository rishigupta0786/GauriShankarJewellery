"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MetalPrices = {
  gold: number;
  silver: number;
};

export default function Banner() {
  const [prices, setPrices] = useState<MetalPrices | null>(null);

  const USD_INR = 90;
  const OUNCE_TO_GRAM = 31.1035;
  const INDIA_FACTOR = 1.08; // Approx import + GST

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
    const interval = setInterval(fetchPrices, 60 * 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[70vh] relative flex flex-col gap-10 items-center justify-center bg-linear-to-b from-gray-900 to-gray-950 text-amber-300">
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/bannerlogo.png"
          alt="BannerLogo"
          width={300}
          height={100}
        />
        <div className="luxurious-roman-regular text-3xl md:text-5xl">
          Gauri Shankar Jewellers
        </div>
      </div>

      <div className=" bottom-6 flex flex-col sm:flex-row gap-4">
        <div className="flex items-center justify-center px-6 py-3 border border-gray-700 rounded-xl bg-gray-800/70 backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_5px_rgba(255,191,0,0.5)] transition-all duration-300">
          <span className="font-sans text-sm text-amber-400 font-medium">
            GOLD :- {prices ? `₹${prices.gold.toFixed(0)}/g` : "Loading..."}
          </span>
        </div>

        <div className="flex items-center justify-center px-6 py-3 border border-gray-700 rounded-xl bg-gray-800/70 backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_5px_rgba(192,192,192,0.5)] transition-all duration-300">
          <span className="font-sans text-sm text-gray-300 font-medium">
            SILVER :- {prices ? `₹${prices.silver.toFixed(0)}/g` : "Loading..."}
          </span>
        </div>
      </div>
    </section>
  );
}
