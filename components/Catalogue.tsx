import Link from "next/link";
const categories = [
  { name: "Rings", slug: "/catalogue/rings" },
  { name: "Necklaces", slug: "/catalogue/necklaces" },
  { name: "Bracelets", slug: "/catalogue/bracelets" },
  { name: "Anklets", slug: "/catalogue/anklets" },
  { name: "Bangles", slug: "/catalogue/bangles" },
];
export default function Catalogue() {
  return (
<section
  className="py-13 relative z-20 bg-linear-to-b from-gray-950 to-gray-900 text-amber-200">
      {/* Section Title */}
      <div className="text-center text-4xl md:text-5xl allura-regular tracking-wide mb-14">
        Our Collection
      </div>
      {/* Category Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.slug}
            className="group"
          >
            <div className="h-60 flex items-center justify-center rounded-2xl 
                            bg-linear-to-b from-gray-900 to-gray-950 
                            border border-gray-800
                            transition-all duration-300
                            shadow-lg
                            group-hover:shadow-[0_0_30px_rgba(255,191,0,0.35)]
                            group-hover:-translate-y-1">

              <span className="text-3xl tracking-wide allura-regular
                               group-hover:text-white transition">
                {cat.name}
              </span>

            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
