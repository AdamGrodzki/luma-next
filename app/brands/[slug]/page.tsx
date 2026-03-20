import { notFound } from "next/navigation";
import { getBrandBySlug } from "../../../src/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold">{brand.name}</h1>
      <p className="mt-3 text-neutral-600">
        {brand.country || "Unknown country"} • Founded: {brand.foundedYear || "—"}
      </p>

      {brand.description && (
        <div className="mt-8 whitespace-pre-line text-neutral-800">
          {brand.description}
        </div>
      )}
    </main>
  );
}