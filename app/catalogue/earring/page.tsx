// app/earrings/page.tsx
"use client";
import ProductCollectionPage from "@/components/ProductCollectionPage";
import { earring } from "@/data/earring"; // You'll need to create this data file

export default function EarringsPage() {
  return (
    <ProductCollectionPage
      title="Earrings Collection"
      subtitle="Sparkling accents that frame your beauty"
      products={earring}
      emptyStateEmoji="✨"
      emptyStateMessage="No earrings found matching your criteria"
      searchPlaceholder="Search for dazzling earrings..."
    />
  );
}