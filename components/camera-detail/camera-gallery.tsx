"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraGallery({ camera }: Props) {
  const images = useMemo(() => {
    const list = [camera.image, ...(camera.gallery ?? [])].filter(
      (img): img is string => Boolean(img)
    );

    return [...new Set(list)];
  }, [camera.image, camera.gallery]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImage = images[activeIndex] ?? null;

  useEffect(() => {
    setActiveIndex(0);
    setIsLightboxOpen(false);
  }, [camera.slug]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowRight" && images.length > 1) {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }

      if (event.key === "ArrowLeft" && images.length > 1) {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, isLightboxOpen]);

  function openLightbox(index: number) {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  }

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  if (!images.length || !activeImage) return null;

  return (
    <>
<section
  id="gallery"
  className="scroll-mt-24 space-y-6 rounded-[24px] border border-[#1f1914] bg-[linear-gradient(180deg,#080808_0%,#060606_100%)] px-4 py-6 sm:rounded-[28px] sm:px-5 sm:py-8 md:px-8 md:py-10 xl:rounded-[32px] xl:px-10 xl:py-12"
>
        <div className="text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#a07f5e]">
            Visual archive
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#f6efe7] md:text-5xl">
            Galeria Modelu
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#aa9f93] md:text-base">
            Zobacz detale korpusu, konstrukcję i charakter wizualny modelu w
            bardziej dopracowanym układzie galerii.
          </p>
        </div>

          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
          <div className="rounded-[28px] border border-[#2a2119] bg-[linear-gradient(180deg,#101010_0%,#0b0b0b_100%)] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#806d5b]">
                Featured frame
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#806d5b]">
                {activeIndex + 1} / {images.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => openLightbox(activeIndex)}
              className="group relative block w-full overflow-hidden rounded-[22px] border border-[#382b1f] bg-[#0b0b0b]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={activeImage}
                  alt={camera.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.32),transparent_35%,transparent_70%,rgba(0,0,0,0.12))]" />
              </div>

              <div className="absolute bottom-4 left-4 rounded-full border border-[#3a2d21] bg-[rgba(10,10,10,0.75)] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#f6efe7] backdrop-blur-md transition group-hover:border-[#c79b63]">
                Otwórz podgląd
              </div>
            </button>
          </div>

          <div className="rounded-[28px] border border-[#241d17] bg-[linear-gradient(180deg,#0d0d0d_0%,#090909_100%)] p-5 md:p-6">
            <div className="mb-5">
              <h3 className="text-2xl font-bold text-[#f6efe7]">
                Ujęcia dodatkowe
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#9f9387]">
                Kliknij miniaturę, aby zmienić główny podgląd zdjęcia albo
                otworzyć je w pełnym ekranie.
              </p>
            </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-2">
              {images.map((image, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={`${image}-${index}`}
                    className={`group relative overflow-hidden rounded-[18px] border transition ${
                      isActive
                        ? "border-[#c79b63] ring-1 ring-[#c79b63]/40"
                        : "border-[#211a14] hover:border-[#3b2d20]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="block w-full"
                    >
                      <div className="relative aspect-[4/3] bg-[#0b0b0b]">
                        <Image
                          src={image}
                          alt={`${camera.name} ${index + 1}`}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                        <div
                          className={`pointer-events-none absolute inset-0 transition ${
                            isActive
                              ? "bg-[linear-gradient(to_top,rgba(199,155,99,0.16),rgba(0,0,0,0.05))]"
                              : "bg-[linear-gradient(to_top,rgba(0,0,0,0.28),rgba(0,0,0,0.02))]"
                          }`}
                        />
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => openLightbox(index)}
                      className="absolute bottom-2 right-2 rounded-full border border-[#34271d] bg-[rgba(10,10,10,0.8)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f3eadf] opacity-0 backdrop-blur-md transition group-hover:opacity-100"
                    >
                      Zoom
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen && activeImage ? (
        <div
          className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.94)]"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="flex h-dvh w-full flex-col px-4 py-4 md:px-6 md:py-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
               <div className="sticky top-0 z-20 mb-3 flex items-start justify-between gap-3 rounded-[18px] border border-[#2b2118] bg-[rgba(10,10,10,0.78)] px-3 py-3 backdrop-blur-xl sm:mb-4 sm:rounded-[20px] sm:px-4">
                <div className="min-w-0 pr-2">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#9b8772]">
                    Fullscreen preview
                  </p>
                    <h3 className="mt-1 max-w-[140px] truncate text-base font-semibold text-[#f6efe7] sm:max-w-none sm:text-lg md:text-2xl">
                    {camera.name}
                  </h3>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                    <div className="rounded-full border border-[#34271d] bg-[rgba(14,14,14,0.82)] px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-[#d8c8b8] sm:px-4 sm:text-xs sm:tracking-[0.2em]">
                    {activeIndex + 1} / {images.length}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(false)}
                    aria-label="Zamknij podgląd"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#34271d] bg-[rgba(14,14,14,0.82)] text-lg leading-none text-[#f6efe7] transition duration-300 hover:scale-[1.04] hover:border-[#c79b63] hover:text-[#c79b63] sm:h-11 sm:w-11 sm:text-xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[28px] border border-[#2b2118] bg-[#0b0b0b] shadow-[0_25px_100px_rgba(0,0,0,0.45)]">
                <div className="relative h-full max-h-full w-full">
                  <Image
                    src={activeImage}
                    alt={`${camera.name} fullscreen`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#3a2d21] bg-[rgba(10,10,10,0.82)] px-3 py-2 text-xs font-semibold text-[#f6efe7] backdrop-blur-md transition hover:border-[#c79b63] hover:text-[#c79b63] sm:left-3 sm:px-4 sm:py-3 sm:text-sm md:left-4"
                      aria-label="Poprzednie zdjęcie"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#3a2d21] bg-[rgba(10,10,10,0.82)] px-3 py-2 text-xs font-semibold text-[#f6efe7] backdrop-blur-md transition hover:border-[#c79b63] hover:text-[#c79b63] sm:right-3 sm:px-4 sm:py-3 sm:text-sm md:right-4"
                      aria-label="Następne zdjęcie"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-3 shrink-0 overflow-x-auto pb-1 sm:mt-4">
                  <div className="grid min-w-max grid-flow-col gap-3">
                    {images.map((image, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <button
                          key={`${image}-lightbox-${index}`}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          className={`relative w-20 overflow-hidden rounded-xl border transition sm:w-24 sm:rounded-2xl md:w-28 ${isActive
                            ? "border-[#c79b63] ring-1 ring-[#c79b63]/40"
                            : "border-[#241d17] hover:border-[#3b2d20]"
                            }`}
                        >
                          <div className="relative aspect-[4/3] bg-[#0b0b0b]">
                            <Image
                              src={image}
                              alt={`${camera.name} thumb ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}