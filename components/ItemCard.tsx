"use client";

import { motion } from "framer-motion";
import {
  FiImage,
  FiChevronRight,
  FiEye,
  FiPackage,
  FiHash,
  FiAward,
} from "react-icons/fi";

interface ItemCardProps {
  item: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    articleCode: string;
    designName: string;
    purity: string;
  };
  onClick: () => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
      className="group bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer backdrop-blur-sm h-full flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden  bg-linear-to-br from-gray-800 to-gray-900">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23d97706;stop-opacity:0.1" /><stop offset="100%" style="stop-color:%23b45309;stop-opacity:0.1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23grad)"/></svg>';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <FiPackage className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-xs">No image</p>
            </div>
          </div>
        )}

        {/* View Details Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-amber-400 hover:text-amber-300 hover:bg-gray-800 rounded-lg shadow transition border border-gray-700 text-xs">
            <FiEye className="w-3 h-3" />
            <span className="font-medium">View</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 grow flex flex-col">
        {/* Title and Description */}
        <div className="mb-3 grow">
          <h3 className="font-bold text-white text-lg mb-1.5 group-hover:text-amber-400 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-gray-400 text-xs line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Item Details - Full Width Horizontal Grid */}
        <div className="mb-3 w-full">
          <div className="grid grid-cols-3 gap-2 w-full">
            {/* Article Code */}
            {item.articleCode && (
              <div className="bg-gray-800/60 rounded-lg p-2 border border-gray-700/50 group-hover:border-amber-500/20 transition-colors flex flex-col items-center justify-center text-center h-full min-h-15">
                <div className="flex">
                  <FiHash className="w-3.5 h-3.5 text-amber-500 mb-1" />
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5 truncate w-full px-1">
                    Code
                  </div>
                </div>
                <div className="text-sm font-semibold text-white truncate w-full px-1">
                  {item.articleCode}
                </div>
              </div>
            )}

            {/* Design Name */}
            {item.designName && (
              <div className="bg-gray-800/60 rounded-lg p-2 border border-gray-700/50 group-hover:border-blue-500/20 transition-colors flex flex-col items-center justify-center text-center h-full min-h-15">
                {/* <FiPalette className="w-3.5 h-3.5 text-blue-500 mb-1" /> */}
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5 truncate w-full px-1">
                  Design
                </div>
                <div className="text-sm font-semibold text-white truncate w-full px-1">
                  {item.designName}
                </div>
              </div>
            )}

            {/* Purity */}
            {item.purity && (
              <div className="bg-gray-800/60 rounded-lg p-2 border border-gray-700/50 group-hover:border-emerald-500/20 transition-colors flex flex-col items-center justify-center text-center h-full min-h-15">
               <div className="flex">
                 <FiAward className="w-3.5 h-3.5 text-emerald-500 mb-1" />
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5 truncate w-full px-1">
                  Purity 
                </div>
               </div>
                <div className="text-sm font-semibold text-white truncate w-full px-1">{item.purity}</div>
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-center pt-3 border-t border-gray-800">
          <div className="flex items-center gap-1.5 text-gray-500">
            <FiChevronRight className="w-3 h-3 text-amber-500/70" />
            <span className="hover:text-amber-400 transition-colors">
              Click for details
            </span>
          </div>
          {/* <div className="px-2 py-1 bg-gray-800/50 rounded text-[10px] text-gray-400 font-medium">
            {item._id.slice(-6)}
          </div> */}
        </div>
      </div>
    </motion.div>
  );
}
