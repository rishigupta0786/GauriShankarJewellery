import { collection } from "@/data/collection";
import Link from "next/link";
import Image from "next/image";

export default function Catalogue() {
  return (
    <section className="py-10 relative z-20 bg-linear-to-b from-gray-950 to-gray-900 text-amber-200">
      {/* Section Title */}
      <div className="text-center text-4xl md:text-5xl allura-regular tracking-wide mb-12">
        Our Collections
      </div>

      {/* Category Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
        {collection.map((cat) => (
          <Link key={cat.name} href={cat.slug} className="group">
            <div
              className="relative h-64 rounded-2xl 
                         bg-linear-to-b from-gray-900 to-gray-950
                         border border-gray-800
                         overflow-hidden
                         transition-all duration-300
                         shadow-lg
                         group-hover:shadow-[0px_0px_30px_rgba(255,191,0,0.85)]
                         group-hover:-translate-y-5"
            >
              {/* Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={220}
                  height={220}
                  // fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text at Bottom */}
              <div
                className="absolute bottom-0 w-full text-center py-4
                           bg-linear-to-t from-black/70 to-transparent"
              >
                <span
                  className="text-3xl tracking-wide allura-regular
                             group-hover:text-white transition"
                >
                  {cat.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
