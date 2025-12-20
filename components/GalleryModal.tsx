"use client";

import Image from "next/image";

type GalleryModalProps = {
  images: string[];
  current: number;
  setCurrent: (i: number) => void;
  onClose: () => void;
};

export default function GalleryModal({
  images,
  current,
  setCurrent,
  onClose,
}: GalleryModalProps) {
  const prev = () =>
    setCurrent((current - 1 + images.length) % images.length);

  const next = () =>
    setCurrent((current + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative w-[92vw] max-w-4xl h-[60vh] bg-black border border-gray-800 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 z-10
            text-gray-400 hover:text-red-700
            transition text-xl
          "
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={images[current]}
            alt="Product view"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Bottom Controls */}
        <div
          className="
            absolute bottom-3 left-1/2 -translate-x-1/2
            flex items-center gap-6
            bg-black/70 px-4 py-2
            rounded-full border border-gray-700
          "
        >
          <button
            onClick={prev}
            className="
              text-white text-xs
              tracking-wide
              hover:text-green-400
              transition
            "
          >
            ← prev
          </button>

          <span className="text-gray-500 text-xs">
            {current + 1}/{images.length}
          </span>

          <button
            onClick={next}
            className="
              text-white text-xs
              tracking-wide
              hover:text-green-400
              transition
            "
          >
            next →
          </button>
        </div>
      </div>
    </div>
  );
}
