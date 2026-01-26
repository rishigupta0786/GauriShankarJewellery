import { FiImage } from "react-icons/fi";

interface ItemCardProps {
  item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    articleCode: string;
    designName: string;
    purity: string;
  };
  onClick: () => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Image Section */}
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <FiImage className="text-4xl text-gray-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
          <span className="font-bold text-blue-600">
            ₹{parseFloat(item.price.toString()).toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          {item.articleCode && (
            <div className="text-gray-600">
              <span className="font-medium">Code:</span> {item.articleCode}
            </div>
          )}
          {item.designName && (
            <div className="text-gray-600">
              <span className="font-medium">Design:</span> {item.designName}
            </div>
          )}
          {item.purity && (
            <div className="text-gray-600">
              <span className="font-medium">Purity:</span> {item.purity}
            </div>
          )}
        </div>

        <div className="text-xs text-gray-400 border-t pt-2">
          Click to view details
        </div>
      </div>
    </div>
  );
}