import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrandBySlug } from "@/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return {
      title: "Brand not found",
    };
  }

  return {
    title: brand.name,
    description:
      brand.description?.slice(0, 150) ||
      `${brand.name} – profil marki aparatów i systemów fotograficznych.`,
  };
}

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
        <div className="mt-8 whitespace-pre-line leading-7 text-neutral-800">
          {brand.description}
        </div>
      )}
    </main>
  );
}