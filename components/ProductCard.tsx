"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";

type Gallery = {
  image: string;
  side1: string;
  side2: string;
  side3: string;
};

type ProductCardProps = {
  gallery: Gallery;
  articleCode: string;
  grossWeight: string;
  netWeight: string;
  designName: string;
  purity: string;
  onOpenModal: () => void;
};

export default function ProductCard({
  gallery,
  articleCode,
  grossWeight,
  netWeight,
  designName,
  purity,
  onOpenModal,
}: ProductCardProps) {
  const images = [gallery.image, gallery.side1, gallery.side2, gallery.side3];
  const [hoveredImage, setHoveredImage] = useState(0);

  // Material/Stone emojis based on design name
  const getMaterialIcon = () => {
    const name = designName.toLowerCase();
    if (name.includes("diamond")) return "💎";
    if (name.includes("gold")) return "✨";
    if (name.includes("platinum")) return "⚪";
    if (name.includes("silver")) return "🔗";
    if (name.includes("pearl")) return "🪷";
    return "💍";
  };

  return (
    <div
      className="group relative bg-linear-to-br from-gray-900 via-gray-900 to-gray-950 rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-300/30 transition-all duration-500 border border-gray-700/50"
      onMouseEnter={() => setHoveredImage(1)}
      onMouseLeave={() => setHoveredImage(0)}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-t from-amber-900/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Container */}
      <div className="relative h-72 w-full overflow-hidden">
        {/* Main Image with Elegant Overlay */}
        <div
          className="relative h-full w-full cursor-pointer"
          onClick={onOpenModal}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent z-10" />

          {/* Hover Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  hoveredImage === idx ? "bg-amber-300 w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Image Stack with Smooth Transitions */}
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-700 ${
                idx === 0
                  ? "opacity-100 group-hover:opacity-0"
                  : idx === hoveredImage
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt={`${designName} view ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Quick View Indicator */}
        <div className="absolute bottom-4 right-4 z-20">
          <button
            onClick={onOpenModal}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm rounded-full text-xs text-amber-200 hover:text-amber-100 hover:bg-gray-800/90 transition-all duration-300"
          >
            Quick View
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative z-10">
        {/* Design Name with Icon */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{getMaterialIcon()}</span>
              <h3 className="text-lg font-light text-white tracking-wide">
                {designName}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span className="text-xs text-amber-200/70 tracking-wider">
                {purity} Gold
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-serif text-amber-300 mb-1">
              {grossWeight}g
            </div>
            <div className="text-xs text-gray-400">Gross Weight</div>
          </div>
        </div>

        {/* Details Grid - Elegant Layout */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <DetailItem label="Article Code" value={articleCode} />
          <DetailItem label="Net Weight" value={`${netWeight}g`} />
        </div>
      </div>
    </div>
  );
}

// DetailItem Component
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-gray-400 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-sm text-white font-medium tracking-wide">
        {value}
      </div>
    </div>
  );
}