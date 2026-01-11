// app/bracelets/page.tsx
"use client";
import ProductCollectionPage from "@/components/ProductCollectionPage";
import { bracelet } from "@/data/braclet"; // You'll need to create this data file

export default function BraceletsPage() {
  return (
    <ProductCollectionPage
      title="Bracelets Collection"
      subtitle="Elegant wrist adornments crafted with precision"
      products={bracelet}
      emptyStateEmoji="📿"
      emptyStateMessage="No bracelets found matching your criteria"
      searchPlaceholder="Search for exquisite bracelets..."
    />
  );
}