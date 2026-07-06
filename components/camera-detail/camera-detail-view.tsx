import { CameraHero } from "./camera-hero";
import { CameraGallery } from "./camera-gallery";
import { CameraStory } from "./camera-story";
import { CameraSpecs } from "./camera-specs";
import { CameraRelated } from "./camera-related";
import { CameraStickyNav } from "./camera-sticky-nav";
import { RevealOnScroll } from "./reveal-on-scroll";
import { getNavItems, CAMERA_DETAIL_REVEALS } from "@/src/utils/camera-detail";
import type { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraDetailView({ camera }: Props) {
  const navItems = getNavItems(camera);

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[var(--accent-primary)]/10 blur-3xl md:h-[420px] md:w-[420px]" />
        <div className="absolute right-0 top-[30%] h-[220px] w-[220px] rounded-full bg-white/[0.03] blur-3xl md:h-[320px] md:w-[320px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-3 py-4 sm:px-4 sm:py-6 md:gap-10 md:px-6 md:py-8 xl:gap-12 xl:px-8 xl:py-10">
        <CameraStickyNav items={navItems} />

        <RevealOnScroll y={CAMERA_DETAIL_REVEALS.HERO_Y_OFFSET}>
          <CameraHero camera={camera} />
        </RevealOnScroll>

        <RevealOnScroll delay={CAMERA_DETAIL_REVEALS.GALLERY_DELAY}>
          <CameraGallery camera={camera} />
        </RevealOnScroll>

        <RevealOnScroll delay={CAMERA_DETAIL_REVEALS.STORY_DELAY}>
          <CameraStory camera={camera} />
        </RevealOnScroll>

        <RevealOnScroll delay={CAMERA_DETAIL_REVEALS.SPECS_DELAY}>
          <CameraSpecs camera={camera} />
        </RevealOnScroll>

        <RevealOnScroll delay={CAMERA_DETAIL_REVEALS.RELATED_DELAY}>
          <CameraRelated camera={camera} />
        </RevealOnScroll>
      </div>
    </main>
  );
}