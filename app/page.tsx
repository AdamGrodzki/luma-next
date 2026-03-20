import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold">Luma Camera Encyclopedia</h1>
      <p className="mt-4 text-neutral-600">
        Next.js + Contentful starter dla marek i aparatów.
      </p>

      <div className="mt-8 flex gap-4">
        <Link href="/brands" className="rounded-xl border px-4 py-2">
          Marki
        </Link>
        <Link href="/cameras" className="rounded-xl border px-4 py-2">
          Aparaty
        </Link>
      </div>
    </main>
  );
}