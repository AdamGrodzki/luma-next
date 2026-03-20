import Link from "next/link";
import { getBrands } from "@/lib/queries";

export const revalidate = 60;

export default async function BrandsPage() {
  const brands = await getBrands();


  if (brands.length === 0) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold">Marki</h1>
        <p className="mt-4 text-neutral-600">Brak danych w Contentful.</p>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold">Marki</h1>
        <p className="mt-3 text-neutral-600">
          Przegląd producentów aparatów i systemów fotograficznych.
        </p>
      </div>


      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {brands.map((brand: any) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="rounded-2xl border p-5 transition hover:shadow-sm"
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