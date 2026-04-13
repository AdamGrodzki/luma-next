import HeroSection from "@/components/home/HeroSection";
import FeaturedBrands from "@/components/home/FeaturedBrands";
import FeaturedCameras from "@/components/home/FeaturedCameras";
import { getBrands } from "@/src/lib/contentful/brands";
import { getCameras } from "@/src/lib/contentful/cameras";

export const revalidate = 60;

export default async function HomePage() {
  const [brands, cameras] = await Promise.all([getBrands(), getCameras()]);

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)]">
      <HeroSection />
      <FeaturedBrands brands={brands} />
      <FeaturedCameras cameras={cameras} />
    </main>
  );
}