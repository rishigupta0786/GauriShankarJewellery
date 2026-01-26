import { useState } from "react";
import { FiImage, FiPackage, FiUpload } from "react-icons/fi";
import FileUploadBox from "./FileUploadBox";

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
  gallery: Gallery;
}

interface ItemFormModalProps {
  isEditMode: boolean;
  editingItem: ItemDetail | null;
  formData: {
    name: string;
    description: string;
    price: string;
    articleCode: string;
    grossWeight: string;
    netWeight: string;
    designName: string;
    purity: string;
  };
  previewUrls: {
    main: string;
    side1: string;
    side2: string;
    side3: string;
  };
  loading: boolean;
  uploading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileSelect: (type: "main" | "side1" | "side2" | "side3", file: File | null) => void;
  onRemoveFile: (type: "main" | "side1" | "side2" | "side3") => void;
}

export default function ItemFormModal({
  isEditMode,
  editingItem,
  formData,
  previewUrls,
  loading,
  uploading,
  onClose,
  onSubmit,
  onFormChange,
  onFileSelect,
  onRemoveFile,
}: ItemFormModalProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isEditMode ? "Edit Jewelry Item" : "Add New Jewelry Item"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Image Uploads */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <FiImage className="text-blue-500" />
                Upload Images
              </h3>
              <p className="text-sm text-gray-600">
                Main image is {isEditMode ? "optional (keep existing)" : "required"}. Side
                images are optional.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadBox
                  type="main"
                  label="Main Image"
                  previewUrl={previewUrls.main}
                  onFileSelect={onFileSelect}
                  onRemoveFile={onRemoveFile}
                  isRequired={!isEditMode}
                />
                <FileUploadBox
                  type="side1"
                  label="Side View 1"
                  previewUrl={previewUrls.side1}
                  onFileSelect={onFileSelect}
                  onRemoveFile={onRemoveFile}
                />
                <FileUploadBox
                  type="side2"
                  label="Side View 2"
                  previewUrl={previewUrls.side2}
                  onFileSelect={onFileSelect}
                  onRemoveFile={onRemoveFile}
                />
                <FileUploadBox
                  type="side3"
                  label="Side View 3"
                  previewUrl={previewUrls.side3}
                  onFileSelect={onFileSelect}
                  onRemoveFile={onRemoveFile}
                />
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <FiPackage className="text-blue-500" />
                Basic Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={onFormChange}
                  onBlur={() => handleBlur("name")}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Diamond Ring"
                />
                {touched.name && !formData.name && (
                  <p className="text-red-500 text-sm mt-1">Item name is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={onFormChange}
                  onBlur={() => handleBlur("description")}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the jewelry"
                />
                {touched.description && !formData.description && (
                  <p className="text-red-500 text-sm mt-1">Description is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={onFormChange}
                  onBlur={() => handleBlur("price")}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
                {touched.price && (!formData.price || parseFloat(formData.price) <= 0) && (
                  <p className="text-red-500 text-sm mt-1">Valid price is required</p>
                )}
              </div>
            </div>

            {/* Jewelry Specifications */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Specifications</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Article Code
                </label>
                <input
                  name="articleCode"
                  value={formData.articleCode}
                  onChange={onFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., RK1001"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gross Weight
                  </label>
                  <input
                    name="grossWeight"
                    value={formData.grossWeight}
                    onChange={onFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 1.235 gm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Net Weight
                  </label>
                  <input
                    name="netWeight"
                    value={formData.netWeight}
                    onChange={onFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 1.210 gm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Design Name
                  </label>
                  <input
                    name="designName"
                    value={formData.designName}
                    onChange={onFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Rajkot"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purity
                  </label>
                  <input
                    name="purity"
                    value={formData.purity}
                    onChange={onFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 18K"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                disabled={loading || uploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploading || !formData.name || !formData.description || !formData.price}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : loading ? (
                  isEditMode ? "Updating..." : "Adding..."
                ) : isEditMode ? (
                  "Update Item"
                ) : (
                  "Add Item"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}