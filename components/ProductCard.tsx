// import Image from "next/image";

// type ProductCardProps = {
//   // image: string;/
//   // altimage: string;
//   gallery:{
//     image:string;
//     side1:string;
//     side2:string;
//     side3:string;
//   }
//   articleCode: string;
//   grossWeight: string;
//   netWeight: string;
//   designName: string;
//   purity: string;
// };

// export default function ProductCard({
//   // image,
//   // altimage,
//   articleCode,
//   grossWeight,
//   gallery,
//   netWeight,
//   designName,
//   purity,
// }: ProductCardProps) {
//   return (
//     <div
//       className="group bg-black border border-gray-800 rounded-xl overflow-hidden
//                  shadow-lg transition-all duration-300"
//     >
//       {/* Image Container */}
//       <div className="relative h-64 w-full overflow-hidden">
        
//         {/* Main Image */}
//         <Image
//           src={gallery.image}
//           alt={designName}
//           fill
//           className="object-cover transition-opacity duration-500 group-hover:opacity-0"
//         />

//         {/* Side Image (Slide from left → right) */}
//         <Image
//           src={gallery.side1}
//           alt={`${designName} side view`}
//           fill
//           className="
//             object-cover
//             absolute inset-0
//             -translate-x-full
//             transition-transform duration-1000 ease-in-out
//             group-hover:translate-x-0
//           "
//         />
//       </div>

//       {/* Details */}
//       <div className="text-amber-200 text-sm border-t border-gray-700">
//         <Detail label="Article Code" value={articleCode} />
//         <Detail label="Gross Weight" value={grossWeight} />
//         <Detail label="Net Weight" value={netWeight} />
//         <Detail label="Design Name" value={designName} />
//         <Detail label="Purity" value={purity} />
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex justify-between px-4 py-2 border-b border-gray-700 last:border-b-0">
//       <span className="text-gray-400">{label}:</span>
//       <span className="text-white">{value}</span>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { useState } from "react";
import GalleryModal from "./GalleryModal";
// import GalleryModal from "@/components/GalleryModal";

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
};

export default function ProductCard({
  gallery,
  articleCode,
  grossWeight,
  netWeight,
  designName,
  purity,
}: ProductCardProps) {
  const images = [
    gallery.image,
    gallery.side1,
    gallery.side2,
    gallery.side3,
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  return (
    <>
      {/* Card */}
      <div className="group bg-black border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        
        {/* Image */}
        <div
          className="relative h-64 w-full cursor-pointer overflow-hidden"
          onClick={() => {
            setCurrent(0);
            setIsOpen(true);
          }}
        >
          <Image
            src={images[0]}
            alt={designName}
            fill
            className="object-cover transition-opacity duration-1200 group-hover:opacity-0"
          />

          <Image
            src={images[1]}
            alt={`${designName} side`}
            fill
            className="object-cover absolute inset-0 -translate-x-full
                       transition-transform duration-1000 group-hover:translate-x-0"
          />
        </div>

        {/* Details */}
        <div className="text-amber-200 text-sm border-t border-gray-700">
          <Detail label="Article Code" value={articleCode} />
          <Detail label="Gross Weight" value={grossWeight} />
          <Detail label="Net Weight" value={netWeight} />
          <Detail label="Design Name" value={designName} />
          <Detail label="Purity" value={purity} />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <GalleryModal
          images={images}
          current={current}
          setCurrent={setCurrent}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-4 py-2 border-b border-gray-700 last:border-b-0">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
