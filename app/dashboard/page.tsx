"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiPlus,
  FiLogOut,
  FiTrash2,
  FiUpload,
  FiX,
  FiEdit2,
  FiChevronRight,
  FiPackage,
  FiEye,
  FiGrid,
  FiImage,
  FiFileText,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiShoppingBag,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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
  const [form, setForm] = useState({ title: "", subtitle: "" });

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
    });
    setPreviewUrl(item.imageUrl);
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
      let imageUrl = "";

      // If a file is selected, upload it to Cloudinary
      if (selectedFile) {
        const uploadedUrl = await uploadImageToCloudinary();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          setLoading(false);
          return;
        }
      } else if (isEditMode && !selectedFile && previewUrl && !previewUrl.startsWith('blob:')) {
        // In edit mode, keep the existing image if no new file is selected
        imageUrl = previewUrl;
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
          alert("Category updated successfully!");
          setIsOpen(false);
          resetForm();
          fetchItems();
        } else {
          const error = await res.json();
          alert(error.error || "Error updating category!");
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
          alert("Category added successfully!");
          setIsOpen(false);
          resetForm();
          fetchItems();
        } else {
          const error = await res.json();
          alert(error.error || "Error adding category!");
        }
      }
    } catch (error) {
      alert("Failed to save category!");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", subtitle: "" });
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
        alert("Error deleting category!");
      }
    } catch (error) {
      alert("Failed to delete category!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-900 to-black pt-20">
      {/* Modern Elegant Header */}
      <header className=" top-0 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/30 shadow-2xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Logo & Brand */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              {/* Animated Logo Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-amber-500 to-amber-600 rounded-2xl blur-xl opacity-70"></div>
                <div className="relative p-2.5 bg-linear-to-br from-amber-500 to-amber-600 rounded-2xl shadow-2xl shadow-amber-500/30 border border-amber-400/20">
                  <FiShoppingBag className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Brand Text */}
              <div>
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold bg-linear-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent allura-regular tracking-tight"
                >
                 Jewelry Collection
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className=" text-gray-400 allura-regular  font-light tracking-wider"
                >
                  Collection Management Portal
                </motion.p>
              </div>
            </motion.div>
            
            {/* logoit button*/}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="group relative flex items-center gap-2.5 px-4 py-2.5 bg-linear-to-r from-gray-800 to-gray-900 text-gray-300 hover:text-white rounded-xl hover:bg-gray-700/50 transition-all border border-gray-700/50 hover:border-gray-600/50"
              >
                <div className="absolute inset-0 bg-linear-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <FiLogOut className="w-4 h-4 relative z-10" />
                <span className="font-medium text-sm relative z-10 hidden sm:inline">Sign Out</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Dashboard Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          {/* Background Gradient Effects */}
          <div className="absolute inset-0 bg-linear-to-r from-amber-900/5 via-transparent to-violet-900/5 rounded-3xl blur-3xl"></div>
          
          {/* Content Container */}
          <div className="relative bg-linear-to-br from-gray-800/30 to-gray-900/20 backdrop-blur-xl rounded-3xl border border-gray-700/30 shadow-2xl shadow-black/20 overflow-hidden">
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-amber-600/10 via-violet-600/10 to-amber-600/10 animate-gradient-x"></div>
            
            {/* Inner Content */}
            <div className="relative p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                {/* Left - Title & Description */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-linear-to-br from-amber-500/20 to-amber-600/20 rounded-xl border border-amber-500/20">
                      <FiGrid className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                        Admin Dashboard
                      </span>
                    </div>
                  </div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
                  >
                    <span className="bg-linear-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
                      Your Collections
                    </span>
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-400 max-w-2xl leading-relaxed"
                  >
                    Manage and showcase your exquisite jewellery collections with our premium dashboard. 
                    Create, organize, and display your masterpieces effortlessly.
                  </motion.p>
                </div>
                
                {/* Right - Create Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="lg:self-start"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      resetForm();
                      setIsOpen(true);
                    }}
                    className="group relative px-8 py-4 bg-linear-to-r from-amber-600 via-amber-500 to-amber-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 overflow-hidden"
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    {/* Button Content */}
                    <div className="relative flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg group-hover:rotate-90 transition-transform duration-300">
                        <FiPlus className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg ">New Collection</div>
                        <div className="text-sm text-amber-200/70 font-light">
                          Add masterpiece
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Collections Grid */}
        {fetching ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-600/20 border-t-amber-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FiPackage className="w-8 h-8 text-amber-600 animate-pulse" />
              </div>
            </div>
            <p className="mt-6 font-medium text-gray-300 allura-regular text-5xl">Loading collections...</p>
            <p className="text-gray-500 allura-regular text-5xl">Preparing your beautiful catalogue</p>
          </div>
        ) : items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border-2 border-dashed border-gray-700/50 backdrop-blur-sm"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-amber-900/20 to-amber-800/20 rounded-3xl mb-6">
              <FiPackage className="text-4xl text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No collections yet
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Start by creating your first jewellery collection to showcase your products
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetForm();
                setIsOpen(true);
              }}
              className="px-8 py-3.5 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg hover:shadow-amber-500/20"
            >
              Create First Collection
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {items.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => handleCardClick(item._id, item.title)}
                className="group bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                {/* Image Section with Gradient Overlay */}
                <div className="relative h-56 overflow-hidden bg-linear-to-br from-gray-800 to-gray-900">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className=" p-2 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23d97706;stop-opacity:0.1" /><stop offset="100%" style="stop-color:%23b45309;stop-opacity:0.1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23grad)"/></svg>';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <FiPackage className="w-16 h-16 text-gray-600 mx-auto " />
                        <p className="text-gray-500 text-sm">No image</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleEditClick(item, e)}
                      className="p-2.5 bg-gray-900/90 backdrop-blur-sm text-amber-400 hover:text-amber-300 hover:bg-gray-800 rounded-xl shadow-lg transition border border-gray-700"
                      title="Edit collection"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleDelete(item._id, e)}
                      className="p-2.5 bg-gray-900/90 backdrop-blur-sm text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-xl shadow-lg transition border border-gray-700"
                      title="Delete collection"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-xl mb-2 group-hover:text-amber-400 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="ml-3">
                      <div className="p-2 bg-linear-to-br from-amber-900/20 to-amber-800/20 rounded-lg group-hover:from-amber-800/30 group-hover:to-amber-700/30 transition-colors border border-amber-800/20">
                        <FiChevronRight className="w-4 h-4 text-amber-500 group-hover:text-amber-400 transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FiEye className="w-3 h-3" />
                      <span>View Products</span>
                    </div>
                    <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300 font-medium">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Modern Dark Elegant Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50"
            >
              {/* Modal Header */}
              <div className="relative p-8 border-b border-gray-700/50">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 via-amber-600 to-amber-700"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/30">
                      {isEditMode ? (
                        <FiEdit2 className="w-6 h-6 text-white" />
                      ) : (
                        <FiPlus className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {isEditMode ? "Edit Collection" : "Create New Collection"}
                      </h2>
                      <p className="text-gray-400 mt-1">
                        {isEditMode 
                          ? "Update your collection details" 
                          : "Add a new jewellery collection to your catalogue"
                        }
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsOpen(false);
                      resetForm();
                    }}
                    className="p-2.5 hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Title Field */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      <FiFileText className="w-4 h-4" />
                      Collection Name
                    </label>
                    <div className="relative">
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all text-lg text-white placeholder-gray-500 backdrop-blur-sm"
                        placeholder="Enter collection name"
                      />
                      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-amber-500/5 to-amber-600/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Subtitle Field */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      <FiFileText className="w-4 h-4" />
                      Description
                    </label>
                    <div className="relative">
                      <input
                        name="subtitle"
                        value={form.subtitle}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all text-lg text-white placeholder-gray-500 backdrop-blur-sm"
                        placeholder="Describe your collection"
                      />
                      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-amber-500/5 to-amber-600/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      <FiImage className="w-4 h-4" />
                      Collection Image
                    </label>
                    
                    {/* File Upload Card */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative rounded-2xl border-3 border-dashed transition-all cursor-pointer overflow-hidden group ${
                        selectedFile || previewUrl
                          ? "border-amber-500 bg-linear-to-br from-amber-900/20 to-amber-800/20"
                          : "border-gray-700 hover:border-amber-500/50 hover:bg-gray-800/30"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />

                      {selectedFile || previewUrl ? (
                        <div className="p-8">
                          <div className="relative max-w-md mx-auto">
                            <div className="relative h-64 rounded-xl overflow-hidden shadow-2xl">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23d97706;stop-opacity:0.2" /><stop offset="100%" style="stop-color:%23b45309;stop-opacity:0.2" /></linearGradient></defs><rect width="600" height="400" fill="url(%23grad)"/></svg>';
                                }}
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                            </div>
                            
                            {selectedFile && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700"
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium text-white truncate">
                                      {selectedFile.name}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                      {(selectedFile.size / 1024).toFixed(2)} KB
                                    </p>
                                  </div>
                                  <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveFile();
                                    }}
                                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                  >
                                    <FiX className="w-4 h-4" />
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-12 text-center">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-900/30 to-amber-800/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 border border-amber-800/20">
                            <FiUpload className="w-8 h-8 text-amber-500" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-white mb-2">
                              Drop or click to upload
                            </p>
                            <p className="text-gray-400 mb-4">
                              Upload a beautiful image for your collection
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 border border-gray-700">
                              <span>JPG, PNG, GIF</span>
                              <span className="text-gray-600">•</span>
                              <span>Max 5MB</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {isEditMode && previewUrl && !selectedFile && (
                      <p className="text-sm text-gray-400 text-center mt-4">
                        Current image will be retained. Upload a new image to replace it.
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-8">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsOpen(false);
                        resetForm();
                      }}
                      disabled={loading || uploading}
                      className="flex-1 px-6 py-4 bg-gray-800 border-2 border-gray-700 text-gray-300 rounded-xl hover:border-gray-600 hover:bg-gray-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading || uploading}
                      className="flex-1 px-6 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-3"
                    >
                      {uploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Uploading Image...
                        </>
                      ) : loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {isEditMode ? "Updating..." : "Creating..."}
                        </>
                      ) : isEditMode ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Update Collection
                        </>
                      ) : (
                        <>
                          <FiPlus className="w-5 h-5" />
                          Create Collection
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}