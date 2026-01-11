// app/anklets/page.tsx
"use client";
import ProductCollectionPage from "@/components/ProductCollectionPage";
import { anklet } from "@/data/anklet"; // You'll need to create this data file

export default function AnkletsPage() {
  return (
    <ProductCollectionPage
      title="Anklets Collection"
      subtitle="Delicate foot jewelry for graceful steps"
      products={anklet}
      emptyStateEmoji="👣"
      emptyStateMessage="No anklets found matching your criteria"
      searchPlaceholder="Search for beautiful anklets..."
    />
  );
}