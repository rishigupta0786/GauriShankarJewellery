import { useState } from "react";
import { FiImage, FiPackage, FiUpload, FiX, FiDollarSign, FiTag, FiEdit3, FiBox } from "react-icons/fi";
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
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.price.trim() !== "" &&
      parseFloat(formData.price) > 0 &&
      formData.articleCode.trim() !== "" &&
      formData.grossWeight.trim() !== "" &&
      formData.netWeight.trim() !== "" &&
      formData.designName.trim() !== "" &&
      formData.purity.trim() !== ""
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEditMode ? "Edit Jewelry Item" : "Add New Jewelry Item"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {isEditMode ? "Update the jewelry details" : "Fill in all required jewelry details"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={onSubmit} className="p-4 sm:p-6">
            <div className="space-y-6">
              {/* Image Upload Section */}
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <FiImage className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Upload Images</h3>
                </div>
                
                <p className="text-sm text-gray-400 mb-5">
                  Main image is <span className="text-amber-300 font-medium">required</span>. 
                  Side images are optional for additional views.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUploadBox
                    type="main"
                    label="Main Image"
                    previewUrl={previewUrls.main}
                    onFileSelect={onFileSelect}
                    onRemoveFile={onRemoveFile}
                    isRequired={true}
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
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/30 rounded-lg">
                    <FiPackage className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Basic Information</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Item Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={onFormChange}
                      onBlur={() => handleBlur("name")}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                      placeholder="e.g., Diamond Ring"
                    />
                    {touched.name && !formData.name.trim() && (
                      <p className="text-red-400 text-sm mt-2">Item name is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={onFormChange}
                      onBlur={() => handleBlur("description")}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 resize-none transition-all"
                      placeholder="Detailed description of the jewelry..."
                    />
                    {touched.description && !formData.description.trim() && (
                      <p className="text-red-400 text-sm mt-2">Description is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Price (₹) *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <FiDollarSign className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={onFormChange}
                        onBlur={() => handleBlur("price")}
                        required
                        step="0.01"
                        min="0.01"
                        className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                    {touched.price && (!formData.price.trim() || parseFloat(formData.price) <= 0) && (
                      <p className="text-red-400 text-sm mt-2">Valid price is required</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-900/30 rounded-lg">
                    <FiBox className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Specifications</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Article Code *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <FiTag className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        name="articleCode"
                        value={formData.articleCode}
                        onChange={onFormChange}
                        onBlur={() => handleBlur("articleCode")}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                        placeholder="e.g., RK1001"
                      />
                    </div>
                    {touched.articleCode && !formData.articleCode.trim() && (
                      <p className="text-red-400 text-sm mt-2">Article code is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Design Name *
                    </label>
                    <input
                      name="designName"
                      value={formData.designName}
                      onChange={onFormChange}
                      onBlur={() => handleBlur("designName")}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                      placeholder="e.g., Rajkot"
                    />
                    {touched.designName && !formData.designName.trim() && (
                      <p className="text-red-400 text-sm mt-2">Design name is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Gross Weight *
                    </label>
                    <div className="relative">
                      <input
                        name="grossWeight"
                        value={formData.grossWeight}
                        onChange={onFormChange}
                        onBlur={() => handleBlur("grossWeight")}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-12"
                        placeholder="e.g., 1.235"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        grams
                      </div>
                    </div>
                    {touched.grossWeight && !formData.grossWeight.trim() && (
                      <p className="text-red-400 text-sm mt-2">Gross weight is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Net Weight *
                    </label>
                    <div className="relative">
                      <input
                        name="netWeight"
                        value={formData.netWeight}
                        onChange={onFormChange}
                        onBlur={() => handleBlur("netWeight")}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-12"
                        placeholder="e.g., 1.210"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        grams
                      </div>
                    </div>
                    {touched.netWeight && !formData.netWeight.trim() && (
                      <p className="text-red-400 text-sm mt-2">Net weight is required</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Purity *
                    </label>
                    <input
                      name="purity"
                      value={formData.purity}
                      onChange={onFormChange}
                      onBlur={() => handleBlur("purity")}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                      placeholder="e.g., 18K Gold"
                    />
                    {touched.purity && !formData.purity.trim() && (
                      <p className="text-red-400 text-sm mt-2">Purity is required</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading || uploading}
                  className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading || !isFormValid()}
                  className="flex-1 px-4 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Uploading...
                    </>
                  ) : loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      {isEditMode ? "Updating..." : "Adding..."}
                    </>
                  ) : isEditMode ? (
                    "Update Item"
                  ) : (
                    "Add Item"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}