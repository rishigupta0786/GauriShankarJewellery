import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { rings } from "@/data/rings";

export default function RingsPage() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900 px-6 py-20">
        <h1 className="text-center text-4xl allura-regular text-amber-200 m-10">
          Rings Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {rings.map((ring) => (
            <ProductCard
              key={ring.articleCode}
              // image={ring.gallery.image}
              // altimage={ring.gallery.side1}
              gallery = {ring.gallery}
              articleCode={ring.articleCode}
              grossWeight={ring.grossWeight}
              netWeight={ring.netWeight}
              designName={ring.designName}
              purity={ring.purity}
            />
          ))}
        </div>
      </section>
    </>
  );
}
