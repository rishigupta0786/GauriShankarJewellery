// app/necklaces/page.tsx
"use client";
import { necklaces } from "@/data/necklace";
import ProductCollectionPage from "@/components/ProductCollectionPage";

export default function NecklacesPage() {
  return (
    <ProductCollectionPage
      title="Necklaces Collection"
      subtitle="Graceful elegance meets timeless craftsmanship in every piece"
      products={necklaces}
      emptyStateEmoji="📿"
      emptyStateMessage="No necklaces found matching your criteria"
      searchPlaceholder="Search for exquisite necklaces..."
    />
  );
}