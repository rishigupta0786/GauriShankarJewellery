// app/bangles/page.tsx
"use client";
import ProductCollectionPage from "@/components/ProductCollectionPage";
import { bangle } from "@/data/bangle"; // You'll need to create this data file

export default function BanglesPage() {
  return (
    <ProductCollectionPage
      title="Bangles Collection"
      subtitle="Timeless circles of elegance and tradition"
      products={bangle}
      emptyStateEmoji="💫"
      emptyStateMessage="No bangles found matching your criteria"
      searchPlaceholder="Search for stunning bangles..."
    />
  );
}