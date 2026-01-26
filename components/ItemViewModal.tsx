import {
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiDollarSign,
  FiTag,
  FiBox,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

interface Gallery {
  side1: string;
  side2: string;
  side3: string;
}

interface ItemDetail {
  _id: string;
  name: string;
  description: string;
  price: number;
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                {images.length > 0 ? (
                  <>
                    <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={images[currentImageIndex]}
                        alt={`${item.name} - view ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={onPrevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                          >
                            <FiChevronLeft className="text-xl" />
                          </button>
                          <button
                            onClick={onNextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                          >
                            <FiChevronRight className="text-xl" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Image Thumbnails */}
                    {images.length > 1 && (
                      <div className="flex gap-2 mt-4">
                        {images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => onSetImageIndex(index)}
                            className={`flex-1 h-20 rounded-lg overflow-hidden border-2 ${
                              index === currentImageIndex
                                ? "border-blue-500"
                                : "border-gray-200"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </div>

              {/* Image Count */}
              <div className="text-center text-sm text-gray-500">
                {images.length} image(s) available
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiInfo className="text-blue-500" />
                  Product Information
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiDollarSign className="text-blue-500" />
                    <span className="font-medium text-gray-700">Price</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiTag className="text-green-500" />
                    <span className="font-medium text-gray-700">Code</span>
                  </div>
                  <p className="text-lg font-semibold text-green-600">
                    {item.articleCode || "N/A"}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiBox className="text-gray-500" />
                  Specifications
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Design Name
                    </label>
                    <p className="text-gray-900 font-medium">
                      {item.designName || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Purity
                    </label>
                    <p className="text-gray-900 font-medium">
                      {item.purity || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Gross Weight
                    </label>
                    <p className="text-gray-900 font-medium">
                      {item.grossWeight || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Net Weight
                    </label>
                    <p className="text-gray-900 font-medium">
                      {item.netWeight || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Creation Date */}
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Added on:{" "}
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t">
                <button
                  onClick={onEdit}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
                >
                  <FiEdit2 />
                  Edit Item
                </button>

                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this item?")) {
                      onDelete(item._id);
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center gap-2"
                >
                  <FiTrash2 />
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}