"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCollectionPage from "@/components/ProductCollectionPage";

interface Product {
  articleCode: string;
  grossWeight: string;
  netWeight: string;
  designName: string;
  purity: string;
  gallery: {
    image: string;
    side1: string;
    side2: string;
    side3: string;
  };
}

interface CatalogueItem {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  createdAt: string;
}

// Create a fallback placeholder image (data URL)
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%231f2937'/%3E%3Cpath d='M100 100L300 100L300 300L100 300Z' fill='none' stroke='%23d97706' stroke-width='2'/%3E%3Ctext x='200' y='200' text-anchor='middle' font-family='Arial' font-size='24' fill='%23d97706'%3E%3Ctspan x='200' y='180'%3E%F0%9F%92%8E%3C/tspan%3E%3Ctspan x='200' y='220' font-size='16'%3ENo Image%3C/tspan%3E%3C/text%3E%3C/svg%3E";

// Helper function to validate image URL
const getValidImageUrl = (url: string): string => {
  if (!url || url.trim() === "" || url === PLACEHOLDER_IMAGE) {
    return PLACEHOLDER_IMAGE;
  }
  return url;
};

export default function CatalogueItemPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [collection, setCollection] = useState<CatalogueItem | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const title = searchParams.get("title") || "";

  useEffect(() => {
    fetchCollectionAndProducts();
  }, [params.id]);

  const fetchCollectionAndProducts = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch collection details
      const collectionRes = await fetch(`/api/catalogue/${params.id}`);
      
      if (!collectionRes.ok) {
        throw new Error(`Failed to fetch collection: ${collectionRes.status}`);
      }
      
      const collectionData = await collectionRes.json();
      const collectionItem = collectionData.item || collectionData;
      setCollection(collectionItem);
      
      // 2. Fetch products for this collection using categoryId
      const productsRes = await fetch(`/api/items?categoryId=${params.id}`);
      
      if (!productsRes.ok) {
        throw new Error(`Failed to fetch products: ${productsRes.status}`);
      }
      
      const productsData = await productsRes.json();
      
      // Transform the items to match Product interface with proper image validation
      const productItems: Product[] = (productsData.items || []).map((item: any) => {
        const galleryImage = getValidImageUrl(item.gallery?.image || item.imageUrl || "");
        const side1Image = getValidImageUrl(item.gallery?.side1 || "");
        const side2Image = getValidImageUrl(item.gallery?.side2 || "");
        const side3Image = getValidImageUrl(item.gallery?.side3 || "");
        
        return {
          articleCode: item.articleCode || `ART${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          grossWeight: item.grossWeight || "0.00",
          netWeight: item.netWeight || "0.00",
          designName: item.designName || item.name || "Unnamed Design",
          purity: item.purity || "18K",
          gallery: {
            image: galleryImage,
            side1: side1Image,
            side2: side2Image,
            side3: side3Image
          }
        };
      });
      
      // Filter out items that might not be actual products
      const validProducts = productItems.filter(product => 
        product.designName !== "Unnamed Design" || 
        product.articleCode.startsWith("ART")
      );
      
      setProducts(validProducts);
      
    } catch (err) {
      console.error("Error fetching data:", err);
      // Set empty products array on error
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
          <p className="mt-4 text-amber-200 allura-regular text-5xl ">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-300">Collection not found</p>
          <button 
            onClick={fetchCollectionAndProducts}
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductCollectionPage
      title={title || collection.title}
      subtitle={collection.subtitle || ""}
      products={products}
    />
  );
}