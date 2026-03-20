import Link from "next/link";
import type { CollectionBrand } from "./types";

type Props = {
  brands: CollectionBrand[];
};

export default function BrandSidebar({ brands }: Props) {
  return (
    <aside className="rounded-[22px] border border-[#0e242c] bg-[linear-gradient(180deg,#031015_0%,#051017_100%)] p-4 shadow-[0_0_0_1px_rgba(218,180,134,0.05)]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold uppercase tracking-[0.12em] text-[#d2a777]">
          Marki sprzętowe
        </h2>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#b9b0a5]">
          Wybierz producenta
        </p>
      </div>

      <div className="max-h-[720px] space-y-3 overflow-y-auto pr-1">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/kolekcja?brand=${brand.slug}`}
            className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
              brand.active
                ? "border-[#9c7b53] bg-[#141210] shadow-[inset_0_0_0_1px_rgba(220,194,162,0.18)]"
                : "border-[#0b1c23] bg-[#071015] hover:border-[#1f3440]"
            }`}
          >
            <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-black">
              {brand.name}
            </span>
            <span
              className={`rounded-md px-2 py-1 text-xs ${
                brand.active
                  ? "bg-[#b58c63] text-black"
                  : "bg-[#141a1e] text-[#9a968f]"
              }`}
            >
              {brand.count}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}