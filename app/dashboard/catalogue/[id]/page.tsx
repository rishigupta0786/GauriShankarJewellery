"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { FiArrowLeft, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { RiDashboardFill } from "react-icons/ri";
import ItemCard from "@/components/ItemCard";
import ItemViewModal from "@/components/ItemViewModal";
import ItemFormModal from "@/components/ItemFormModal";

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
  categoryId: string;
  createdAt: string;
  articleCode: string;
  grossWeight: string;
  netWeight: string;
  designName: string;
  purity: string;
  gallery: Gallery;
}

export default function CatalogueItemsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryId = params.id as string;
  const categoryTitle = searchParams.get("title") || "Category";

  const [items, setItems] = useState<ItemDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemDetail | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFiles, setSelectedFiles] = useState<{
    main: File | null;
    side1: File | null;
    side2: File | null;
    side3: File | null;
  }>({
    main: null,
    side1: null,
    side2: null,
    side3: null,
  });

  const [previewUrls, setPreviewUrls] = useState({
    main: "",
    side1: "",
    side2: "",
    side3: "",
  });

  const [form, setForm] = useState({
    name: "",
    description: "",
    articleCode: "",
    grossWeight: "",
    netWeight: "",
    designName: "",
    purity: "",
  });

  useEffect(() => {
    fetchItems();
  }, [categoryId]);

  const fetchItems = async () => {
    try {
      setFetching(true);
      const res = await fetch(`/api/items?categoryId=${categoryId}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleCardClick = (item: ItemDetail) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setShowViewModal(true);
  };

  const nextImage = () => {
    if (!selectedItem) return;
    const images = getItemImages(selectedItem);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!selectedItem) return;
    const images = getItemImages(selectedItem);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFileSelect = (
    type: "main" | "side1" | "side2" | "side3",
    file: File | null,
  ) => {
    setSelectedFiles((prev) => ({ ...prev, [type]: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, [type]: url }));
    }
  };

  const handleRemoveFile = (type: "main" | "side1" | "side2" | "side3") => {
    setSelectedFiles((prev) => ({ ...prev, [type]: null }));
    setPreviewUrls((prev) => ({ ...prev, [type]: "" }));
  };

  const uploadImageToCloudinary = async (
    file: File | null,
  ): Promise<string> => {
    if (!file) return "";
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
      return "";
    }
  };

  const handleAddItem = () => {
    setIsEditMode(false);
    setEditingItemId(null);
    resetForm();
    setShowAddEditModal(true);
  };

  const handleEditItem = (item: ItemDetail) => {
    setIsEditMode(true);
    setEditingItemId(item._id);
    setForm({
      name: item.name,
      description: item.description,
      articleCode: item.articleCode || "",
      grossWeight: item.grossWeight || "",
      netWeight: item.netWeight || "",
      designName: item.designName || "",
      purity: item.purity || "",
    });
    setPreviewUrls({
      main: item.imageUrl || "",
      side1: item.gallery?.side1 || "",
      side2: item.gallery?.side2 || "",
      side3: item.gallery?.side3 || "",
    });
    setSelectedFiles({ main: null, side1: null, side2: null, side3: null });
    setShowAddEditModal(true);
    setShowViewModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditMode && !selectedFiles.main) {
      alert("Please upload a main image for new items");
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      const uploadPromises = [];
      const uploadResults: Record<string, string> = {};

      // Upload images in parallel
      const imageTypes = ["main", "side1", "side2", "side3"] as const;
      for (const type of imageTypes) {
        if (selectedFiles[type]) {
          uploadPromises.push(
            uploadImageToCloudinary(selectedFiles[type]).then((url) => {
              uploadResults[type] = url;
            }),
          );
        }
      }

      await Promise.all(uploadPromises);

      // Use existing URLs for edit mode if no new file uploaded
      if (isEditMode && editingItemId) {
        const existingItem = items.find((item) => item._id === editingItemId);
        if (!uploadResults.main && existingItem)
          uploadResults.main = existingItem.imageUrl;
        if (!uploadResults.side1 && existingItem?.gallery)
          uploadResults.side1 = existingItem.gallery.side1;
        if (!uploadResults.side2 && existingItem?.gallery)
          uploadResults.side2 = existingItem.gallery.side2;
        if (!uploadResults.side3 && existingItem?.gallery)
          uploadResults.side3 = existingItem.gallery.side3;
      }

      const itemData: any = {
        name: form.name,
        description: form.description,
        categoryId,
        imageUrl: uploadResults.main,
        articleCode: form.articleCode,
        grossWeight: form.grossWeight,
        netWeight: form.netWeight,
        designName: form.designName,
        purity: form.purity,
        gallery: {
          image: uploadResults.main,
          side1: uploadResults.side1 || "",
          side2: uploadResults.side2 || "",
          side3: uploadResults.side3 || "",
        },
      };

      if (isEditMode && editingItemId) {
        itemData.id = editingItemId;
      }

      const method = isEditMode ? "PUT" : "POST";
      const res = await fetch("/api/items", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (res.ok) {
        alert(isEditMode ? "Item updated!" : "Item added!");
        setShowAddEditModal(false);
        resetForm();
        fetchItems();
      } else {
        const errorData = await res.json();
        alert(`Error saving item: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save item!");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`/api/items`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        alert("Item deleted!");
        setShowViewModal(false);
        fetchItems();
      } else {
        const data = await res.json();
        alert(data.error || "Error deleting item!");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete item!");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      articleCode: "",
      grossWeight: "",
      netWeight: "",
      designName: "",
      purity: "",
    });
    setSelectedFiles({ main: null, side1: null, side2: null, side3: null });
    setPreviewUrls({ main: "", side1: "", side2: "", side3: "" });
    setIsEditMode(false);
    setEditingItemId(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getItemImages = (item: ItemDetail) => {
    return [
      item.imageUrl,
      item.gallery?.side1,
      item.gallery?.side2,
      item.gallery?.side3,
    ].filter((img) => img && img.trim() !== "");
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.articleCode.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (fetching) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-transparent border-t-emerald-400 border-r-violet-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-violet-400 border-l-emerald-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <p className="mt-6 allura-regular text-slate-300 font-light text-5xl tracking-wider">
            Loading Collection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-slate-900">
      {/* Header with Sophisticated Design */}
      <header className="relative overflow-hidden bg-linear-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-700/50 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top,var(--tw-linear-stops))] from-emerald-500/5 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-2 lg:px-8">
          {/* Centered Title for all screen sizes */}
          <div className="text-center mb-4 pt-18">
            <h1 className="text-7xl p-2 allura-regular font-bold bg-linear-to-r from-emerald-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent tracking-wide drop-shadow-[0_2px_8px_rgba(139,92,246,0.3)]">
              {categoryTitle}
            </h1>
            <p className="text-slate-400 font-light tracking-wider text-2xl allura-regular">
              Premium Jewelry Collection
            </p>
          </div>

          {/* Desktop Layout - All in one line */}
          <div className="hidden md:flex items-center justify-between gap-4 mb-4">
            {/* Back to Dashboard Button - Left side */}
            <button
              onClick={() => router.push("/dashboard")}
              className="group relative flex items-center gap-3 px-5 py-3 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-600/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <FiArrowLeft className="text-emerald-400 text-lg group-hover:text-emerald-300 transition-colors" />
              <span className="text-slate-300 font-medium tracking-wide group-hover:text-white transition-colors whitespace-nowrap">
                Back to Dashboard
              </span>
            </button>

            {/* Search Bar - Center */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-emerald-500/10 to-violet-500/10 rounded-xl group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400  z-10">
                    <FiSearch className="text-lg" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search items by name, description, or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700/50"
                    >
                      <FiX className="text-lg" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Add New Item Button - Right side */}
            <button
              onClick={handleAddItem}
              className="group relative px-7 py-3.5 bg-linear-to-r from-emerald-600 via-emerald-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="flex items-center gap-3 relative">
                <div className="p-.5 bg-white/10 rounded-sm group-hover:rotate-90 transition-transform duration-300">
                  <FiPlus className="text-xl" />
                </div>
                <span className="tracking-wide whitespace-nowrap">Add New Item</span>
              </div>
            </button>
          </div>

          {/* Mobile Layout - Back button and Add button in same line, Search at bottom */}
          <div className="md:hidden flex flex-col gap-3">
            {/* Top Row - Back button and Add button */}
            <div className="flex items-center justify-between gap-3">
              {/* Back to Dashboard Button */}
              <button
                onClick={() => router.push("/dashboard")}
                className="group relative flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-600/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] overflow-hidden flex-1"
              >
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <FiArrowLeft className="text-emerald-400 text-base group-hover:text-emerald-300 transition-colors" />
                <span className="text-slate-300 font-medium tracking-wide group-hover:text-white transition-colors text-sm">
                 Dashboard
                </span>
              </button>

              {/* Add New Item Button */}
              <button
                onClick={handleAddItem}
                className="group relative px-4 py-3 bg-linear-to-r from-emerald-600 via-emerald-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 overflow-hidden flex-1"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="flex items-center justify-center gap-2 relative">
                  <div className="p-.5 bg-white/10 rounded-sm group-hover:rotate-90 transition-transform duration-300">
                    <FiPlus className="text-base" />
                  </div>
                  <span className="tracking-wide text-sm">Add Item</span>
                </div>
              </button>
            </div>

            {/* Bottom Row - Search bar */}
            <div className="w-full">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-emerald-500/10 to-violet-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 z-10">
                    <FiSearch className="text-base" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700/50"
                    >
                      <FiX className="text-base" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-2">
        {/* Items Grid with Luxury Hover Effects */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 md:py-24 bg-linear-to-br from-slate-800/20 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/30 shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-emerald-900/20 to-violet-900/20 rounded-full mb-6 border border-emerald-500/20 shadow-lg">
              <div className="relative">
                <FiPlus className="text-2xl md:text-3xl text-emerald-400" />
                <div className="absolute -inset-3 md:-inset-4 bg-emerald-500/10 rounded-full blur-xl"></div>
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
              No Items Found
            </h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto px-4 text-sm md:text-base">
              {searchQuery
                ? "No items match your search. Try different keywords."
                : "Begin your luxury collection by adding exquisite jewelry pieces."}
            </p>
            <button
              onClick={handleAddItem}
              className="px-6 md:px-8 py-3 md:py-3.5 bg-linear-to-r from-emerald-600 to-violet-700 text-white font-medium rounded-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              Add First Masterpiece
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50"
                >
                  <FiX className="text-sm" />
                  Clear search
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="group relative transform transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Glow Effect Container */}
                  <div className="absolute -inset-1 md:-inset-2 bg-linear-to-r from-emerald-500/10 via-violet-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                  {/* Card Container */}
                  <div className="relative bg-linear-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-emerald-500/30 shadow-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)]">
                    <ItemCard
                      item={item}
                      onClick={() => handleCardClick(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* View Item Modal */}
      {showViewModal && selectedItem && (
        <ItemViewModal
          item={selectedItem}
          currentImageIndex={currentImageIndex}
          onClose={() => setShowViewModal(false)}
          onEdit={() => handleEditItem(selectedItem)}
          onDelete={handleDeleteItem}
          onNextImage={nextImage}
          onPrevImage={prevImage}
          onSetImageIndex={setCurrentImageIndex}
        />
      )}

      {/* Add/Edit Item Modal */}
      {showAddEditModal && (
        <ItemFormModal
          isEditMode={isEditMode}
          editingItem={items.find((item) => item._id === editingItemId) || null}
          formData={form}
          previewUrls={previewUrls}
          loading={loading}
          uploading={uploading}
          onClose={() => {
            setShowAddEditModal(false);
            resetForm();
          }}
          onSubmit={handleSubmit}
          onFormChange={handleFormChange}
          onFileSelect={handleFileSelect}
          onRemoveFile={handleRemoveFile}
        />
      )}
    </div>
  );
}