"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiPlus,
  FiLogOut,
  FiTrash2,
  FiImage,
  FiUpload,
  FiX,
  FiEdit2,
  FiChevronRight,
  FiPackage,
  FiEye,
} from "react-icons/fi";
interface CatalogueItem {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [form, setForm] = useState({ title: "", subtitle: "", imageUrl: "" });

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setFetching(true);
      const res = await fetch("/api/catalogue");
      const data = await res.json();
      console.log(data);
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  // Handle clicking on a card to view its items
  const handleCardClick = (itemId: string, itemTitle: string) => {
    router.push(
      `/dashboard/catalogue/${itemId}?title=${encodeURIComponent(itemTitle)}`,
    );
  };

  // Handle edit button click
  const handleEditClick = (item: CatalogueItem, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    setIsEditMode(true);
    setEditingId(item._id);
    setForm({
      title: item.title,
      subtitle: item.subtitle,
      imageUrl: item.imageUrl,
    });
    setIsOpen(true);
  };

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

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!selectedFile) return "";

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
      return "";
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.imageUrl;

      // If a file is selected, upload it to Cloudinary
      if (selectedFile) {
        const uploadedUrl = await uploadImageToCloudinary();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          setLoading(false);
          return;
        }
      }

      if (isEditMode && editingId) {
        // Update existing item
        const res = await fetch(`/api/catalogue/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            imageUrl: imageUrl,
          }),
        });

        if (res.ok) {
          alert("Item updated successfully!");
          setIsOpen(false);
          resetForm();
          fetchItems();
        } else {
          const error = await res.json();
          alert(error.error || "Error updating item!");
        }
      } else {
        // Create new item
        const res = await fetch("/api/catalogue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            imageUrl: imageUrl,
          }),
        });

        if (res.ok) {
          alert("Item added successfully!");
          setIsOpen(false);
          resetForm();
          fetchItems();
        } else {
          const error = await res.json();
          alert(error.error || "Error adding item!");
        }
      }
    } catch (error) {
      alert("Failed to save item!");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", subtitle: "", imageUrl: "" });
    setSelectedFile(null);
    setPreviewUrl("");
    setIsEditMode(false);
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (!confirm("Are you sure you want to delete this catalogue category?"))
      return;

    try {
      const res = await fetch(`/api/catalogue/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Catalogue category deleted!");
        fetchItems();
      } else {
        alert("Error deleting item!");
      }
    } catch (error) {
      alert("Failed to delete item!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage catalogue categories
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Catalogue Categories
            </h2>
            <p className="text-gray-500 text-sm">
              Click on a category to manage its items
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <FiPlus className="text-lg" />
            Add New Category
          </button>
        </div>

        {/* Cards Grid */}
        {fetching ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-500">Loading categories...</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FiPackage className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No categories yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first catalogue category to get started
            </p>
            <button
              onClick={() => {
                resetForm();
                setIsOpen(true);
              }}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add First Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                onClick={() => handleCardClick(item._id, item.title)}
                className="group bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-300 hover:border-blue-300 cursor-pointer"
              >
                {/* Image Section */}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23f3f4f6"/><text x="200" y="100" font-family="Arial" font-size="14" fill="%239ca3af" text-anchor="middle">No Image</text></svg>';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                      <FiPackage className="text-5xl text-gray-400" />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => handleEditClick(item, e)}
                      className="p-2 bg-white text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg shadow-sm transition"
                      title="Edit category"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={(e) => handleDelete(item._id, e)}
                      className="p-2 bg-white text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg shadow-sm transition"
                      title="Delete category"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                    <FiChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors ml-2 mt-1" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t mt-4">
                    <div className="flex items-center gap-2">
                      <FiEye className="text-gray-400" />
                      <span>Click to view items</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Item Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditMode ? "Edit Category" : "Add New Category"}
                </h2>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g., Bangle Collection"
                  />
                </div>

                {/* Subtitle Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <input
                    name="subtitle"
                    value={form.subtitle}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g., Beautiful collection of traditional bangles"
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>

                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                      selectedFile || previewUrl
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {selectedFile || previewUrl ? (
                      <div className="space-y-4">
                        <div className="relative mx-auto w-48 h-32">
                          <img
                            src={previewUrl || form.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><text x="150" y="100" font-family="Arial" font-size="14" fill="%239ca3af" text-anchor="middle">Image preview</text></svg>';
                            }}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile();
                            }}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <FiX className="text-sm" />
                          </button>
                        </div>
                        {selectedFile && (
                          <div className="text-sm text-gray-600">
                            <p className="font-medium truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-gray-500">
                              {(selectedFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                          <FiUpload className="text-xl text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">
                            Click to upload image
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            JPG, PNG, GIF up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* OR Separator */}
                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* Direct URL Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or enter image URL
                    </label>
                    <input
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="https://example.com/category-image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Leave empty for default image
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    disabled={loading || uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Uploading...
                      </>
                    ) : loading ? (
                      isEditMode ? (
                        "Updating..."
                      ) : (
                        "Adding..."
                      )
                    ) : isEditMode ? (
                      "Update Category"
                    ) : (
                      "Add Category"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
