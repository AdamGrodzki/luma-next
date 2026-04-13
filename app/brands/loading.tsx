"use client";

/**
 * Loading skeleton dla strony szczegółów marki
 */
export default function BrandDetailLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] py-8 sm:py-12 md:py-16 text-[var(--text-primary)]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl space-y-4 mb-10">
          <div className="h-4 w-24 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
          <div className="h-12 w-48 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
          <div className="h-6 w-full max-w-2xl bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg sm:rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-card)] p-4 sm:p-5"
            >
              <div className="h-3 w-16 bg-[var(--bg-darker)] rounded animate-pulse mb-2"></div>
              <div className="h-6 w-24 bg-[var(--bg-darker)] rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Cameras Section */}
        <div className="space-y-6">
          {/* Title */}
          <div className="h-6 w-48 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>

          {/* Grid of Camera Cards */}
          <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg sm:rounded-2xl border border-[var(--border-light)] bg-[var(--bg-card)]"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-[#2a231c] rounded-lg animate-pulse"></div>

                {/* Text */}
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-3 w-20 bg-[#2a231c] rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-[#2a231c] rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-[#2a231c] rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
