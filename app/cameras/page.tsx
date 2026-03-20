import Link from "next/link";
import { getCameras } from "@/lib/queries";

export const revalidate = 60;

export default async function CamerasPage() {
  const cameras = await getCameras();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold">Aparaty</h1>
        <p className="mt-3 text-neutral-600">
          Katalog modeli aparatów pobieranych z Contentful.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cameras.map((camera) => (
          <Link
            key={camera.id}
            href={`/cameras/${camera.slug}`}
            className="rounded-2xl border p-5 transition hover:shadow-sm"
          >
            <p className="text-sm text-neutral-500">{camera.brand.name}</p>
            <h2 className="mt-1 text-xl font-semibold">{camera.name}</h2>
            <p className="mt-2 text-sm text-neutral-600">
              {camera.cameraType || "Camera"} • {camera.releaseYear || "—"}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}