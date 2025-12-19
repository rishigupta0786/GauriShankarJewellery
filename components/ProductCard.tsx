import Image from "next/image";

type ProductCardProps = {
  image: string;
  sideimage:string;
  articleCode: string;
  grossWeight: string;
  netWeight: string;
  designName: string;
  purity: string;
};

export default function ProductCard({
  image,
  sideimage,
  articleCode,
  grossWeight,
  netWeight,
  designName,
  purity,
}: ProductCardProps) {
  return (
    <div
      className="bg-black border border-gray-800 rounded-xl overflow-hidden
                 shadow-lg hover:shadow-[0_0_35px_rgba(255,255,255,0.75)]
                 transition duration-300"
    >
      {/* Image */}
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={designName}
          fill  
        />
      </div>

      {/* Details */}
      <div className="text-amber-200 text-sm border-t border-gray-700">
        <Detail label="Article Code" value={articleCode} />
        <Detail label="Gross Weight" value={grossWeight} />
        <Detail label="Net Weight" value={netWeight} />
        <Detail label="Design Name" value={designName} />
        <Detail label="Purity" value={purity} />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-4 py-2 border-b border-gray-700 last:border-b-0">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
