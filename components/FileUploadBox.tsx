import { useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface FileUploadBoxProps {
  type: "main" | "side1" | "side2" | "side3";
  label: string;
  previewUrl: string;
  onFileSelect: (type: "main" | "side1" | "side2" | "side3", file: File | null) => void;
  onRemoveFile: (type: "main" | "side1" | "side2" | "side3") => void;
  isRequired?: boolean;
}

export default function FileUploadBox({
  type,
  label,
  previewUrl,
  onFileSelect,
  onRemoveFile,
  isRequired = false
}: FileUploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/jpg",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      onFileSelect(type, file);
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveFile(type);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {isRequired && "*"}
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all h-40 flex flex-col items-center justify-center ${
          previewUrl
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
        onClick={handleBoxClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative w-full h-full">
            <img
              src={previewUrl}
              alt={`${label} preview`}
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <FiX className="text-sm" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <FiUpload className="mx-auto text-gray-400 text-2xl" />
            <p className="text-gray-700 font-medium text-sm">
              Upload {label.toLowerCase()}
            </p>
            <p className="text-gray-500 text-xs">
              {isRequired ? "Required" : "Optional"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}