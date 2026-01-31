import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiDollarSign,
  FiTag,
  FiInfo,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface Gallery {
  side1: string;
  side2: string;
  side3: string;
}

interface ItemDetail {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  articleCode: string;
  grossWeight: string;
  netWeight: string;
  designName: string;
  purity: string;
  createdAt: string;
  gallery: Gallery;
}

interface ItemViewModalProps {
  item: ItemDetail;
  currentImageIndex: number;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onNextImage: () => void;
  onPrevImage: () => void;
  onSetImageIndex: (index: number) => void;
}

export default function ItemViewModal({
  item,
  currentImageIndex,
  onClose,
  onEdit,
  onDelete,
  onNextImage,
  onPrevImage,
  onSetImageIndex,
}: ItemViewModalProps) {
  const getItemImages = () => {
    return [
      item.imageUrl,
      item.gallery?.side1,
      item.gallery?.side2,
      item.gallery?.side3,
    ].filter((img) => img && img.trim() !== "");
  };

  const images = getItemImages();

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.1 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      >
        {/* Glass Morphic Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-linear-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl"
        >
          {/* Close Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-gray-800/80 hover:bg-red-600 backdrop-blur-sm rounded-full z-30 transition-colors"
          >
            <FiX className="w-4 h-4 text-white" />
          </motion.button>

          <div className="flex flex-col md:flex-row h-full">
            {/* Left - Image Gallery */}
            <div className="md:w-1/2 bg-linear-to-br from-gray-900 to-gray-800 p-4">
              <div className="relative h-64 md:h-full rounded-lg overflow-hidden bg-gray-900/50">
                {images.length > 0 ? (
                  <>
                    {/* Main Image */}
                    <div className="relative w-full h-full">
                      <img
                        src={images[currentImageIndex]}
                        alt={`${item.name} - view ${currentImageIndex + 1}`}
                        className="w-full h-full  object-contain"
                      />
                      
                      {/* Navigation */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={onPrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
                          >
                            <FiChevronLeft className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={onNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
                          >
                            <FiChevronRight className="w-4 h-4 text-white" />
                          </button>
                          
                          {/* Image Counter */}
                          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                            {currentImageIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnails - Desktop only */}
                    {images.length > 1 && (
                      <div className="hidden md:flex gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
                        {images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => onSetImageIndex(idx)}
                            className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                              currentImageIndex === idx
                                ? "border-amber-400"
                                : "border-gray-600 hover:border-gray-400"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📷</div>
                      <p className="text-gray-400 text-sm">No images available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Details Panel */}
            <div className="md:w-1/2 bg-linear-to-b from-gray-800 to-gray-900 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{item.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiTag className="w-3 h-3" />
                    {item.articleCode}
                  </div>
                </div>
                {/* Description */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <FiInfo className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-medium">Description</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {item.description || "No description provided"}
                  </p>
                </div>

                {/* Specifications Grid */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-white font-medium mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Design Name</div>
                      <div className="text-sm font-medium text-white">{item.designName || "N/A"}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Purity</div>
                      <div className="text-sm font-medium text-white">{item.purity || "N/A"}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Gross Weight</div>
                      <div className="text-sm font-medium text-white">{item.grossWeight || "N/A"}g</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Net Weight</div>
                      <div className="text-sm font-medium text-white">{item.netWeight || "N/A"}g</div>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FiCalendar className="w-4 h-4" />
                  Created {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={onEdit}
                    className="flex-1 px-4 py-3 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-medium text-sm"
                  >
                    <FiEdit2 className="inline mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this item?")) {
                        onDelete(item._id);
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium text-sm"
                  >
                    <FiTrash2 className="inline mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}