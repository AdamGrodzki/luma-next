import Link from "next/link";
import { getCameras } from "../../src/lib/queries";

export const revalidate = 60;

export default async function CamerasPage() {
  const cameras = await getCameras();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Aparaty</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cameras.map((camera) => (
          <Link
            key={camera.id}
            href={`/cameras/${camera.slug}`}
            className="rounded-2xl border p-5 hover:shadow-sm"
          >
            <p className="text-sm text-neutral-500">{camera.brand.name}</p>
            <h2 className="text-xl font-semibold">{camera.name}</h2>
            <p className="mt-2 text-sm text-neutral-600">
              {camera.cameraType || "Camera"} • {camera.releaseYear || "—"}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}