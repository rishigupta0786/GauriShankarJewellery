// app/rings/page.tsx
"use client";
import { rings } from "@/data/rings";
import ProductCollectionPage from "@/components/ProductCollectionPage";

export default function RingsPage() {
  return (
    <ProductCollectionPage
      title="Rings Collection"
      subtitle="Timeless elegance meets unparalleled craftsmanship in every piece"
      products={rings}
      emptyStateEmoji="💍"
      emptyStateMessage="No rings found matching your criteria"
      searchPlaceholder="Search for exquisite rings..."
    />
  );
}