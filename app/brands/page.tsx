import Link from "next/link";
import { getBrands } from "../../src/lib/queries";

export const revalidate = 60;

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Marki</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="rounded-2xl border p-5 hover:shadow-sm"
          >
            <h2 className="text-xl font-semibold">{brand.name}</h2>
            <p className="mt-2 text-sm text-neutral-600">
              {brand.country || "Unknown country"} • {brand.foundedYear || "—"}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}