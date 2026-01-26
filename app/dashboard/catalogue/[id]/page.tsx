"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
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
  price: number;
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
    price: "",
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

  const handleFileSelect = (type: "main" | "side1" | "side2" | "side3", file: File | null) => {
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

  const uploadImageToCloudinary = async (file: File | null): Promise<string> => {
    if (!file) return "";
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
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
      price: item.price.toString(),
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
            uploadImageToCloudinary(selectedFiles[type]).then(url => {
              uploadResults[type] = url;
            })
          );
        }
      }

      await Promise.all(uploadPromises);

      // Use existing URLs for edit mode if no new file uploaded
      if (isEditMode && editingItemId) {
        const existingItem = items.find(item => item._id === editingItemId);
        if (!uploadResults.main && existingItem) uploadResults.main = existingItem.imageUrl;
        if (!uploadResults.side1 && existingItem?.gallery) uploadResults.side1 = existingItem.gallery.side1;
        if (!uploadResults.side2 && existingItem?.gallery) uploadResults.side2 = existingItem.gallery.side2;
        if (!uploadResults.side3 && existingItem?.gallery) uploadResults.side3 = existingItem.gallery.side3;
      }

      const itemData: any = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
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
      price: "",
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getItemImages = (item: ItemDetail) => {
    return [
      item.imageUrl,
      item.gallery?.side1,
      item.gallery?.side2,
      item.gallery?.side3,
    ].filter(img => img && img.trim() !== "");
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <FiArrowLeft />
              Back to Dashboard
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{categoryTitle}</h1>
              <p className="text-gray-500 text-sm">Manage jewelry items</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Add Button */}
        <div className="mb-8">
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiPlus />
            Add New Item
          </button>
        </div>

        {/* Items Grid */}
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FiPlus className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
            <p className="text-gray-500 mb-6">Add your first jewelry item to this category</p>
            <button
              onClick={handleAddItem}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} onClick={() => handleCardClick(item)} />
            ))}
          </div>
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
          editingItem={items.find(item => item._id === editingItemId) || null}
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