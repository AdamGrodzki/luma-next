"use client";

/**
 * Loading skeleton dla strony katalog aparatów
 */
export default function CamerasLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] py-8 sm:py-12 md:py-16 text-[var(--text-primary)]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="max-w-2xl space-y-4 mb-12">
          <div className="h-4 w-24 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
          <div className="h-12 w-48 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
          <div className="h-6 w-96 max-w-full bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
        </div>

        {/* Grid of Camera Cards */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg sm:rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-card)]"
            >
              {/* Image Skeleton */}
              <div className="overflow-hidden rounded-lg sm:rounded-[18px] border border-[var(--border-light)] bg-[var(--bg-darker)]">
                <div className="h-40 sm:h-48 md:h-56 w-full bg-[var(--bg-darker)] animate-pulse"></div>
              </div>

              {/* Text Content Skeleton */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="h-3 w-20 bg-[var(--bg-darker)] rounded animate-pulse"></div>
                <div className="h-5 w-full bg-[var(--bg-darker)] rounded animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-24 bg-[var(--bg-darker)] rounded-full animate-pulse"></div>
                  <div className="h-6 w-20 bg-[var(--bg-darker)] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
