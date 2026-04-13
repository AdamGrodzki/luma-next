"use client";

/**
 * Loading skeleton dla strony szczegółów aparatu
 */
export default function CameraDetailLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] py-8 sm:py-12 md:py-16 text-[var(--text-primary)]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section Skeleton */}
        <section className="rounded-lg sm:rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-card)] px-4 sm:px-5 md:px-8 py-6 sm:py-8 md:py-10">
          <div className="grid gap-6 xl:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-3 w-32 bg-[var(--border-light)] rounded animate-pulse"></div>
                <div className="h-8 w-48 bg-[var(--border-light)] rounded-lg animate-pulse"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-[var(--border-light)] rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden xl:flex justify-end">
              <div className="h-96 w-96 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Gallery Section Skeleton */}
        <section className="rounded-lg sm:rounded-[24px] border border-[var(--border-light)] bg-[linear-gradient(180deg,var(--bg-dark)_0%,var(--bg-darker)_100%)] px-4 sm:px-5 md:px-8 py-6 sm:py-8 md:py-10 space-y-6">
          <div className="h-6 w-40 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-96 flex-1 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
            <div className="hidden sm:flex flex-col gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 w-20 bg-[var(--bg-darker)] rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs Section Skeleton */}
        <section className="rounded-lg sm:rounded-[24px] border border-[var(--border-light)] bg-[linear-gradient(180deg,var(--bg-dark)_0%,var(--bg-darker)_100%)] px-4 sm:px-5 md:px-8 py-6 sm:py-8 md:py-10 space-y-6">
          <div className="h-6 w-40 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>

          {/* Specs Grid */}
          <div className="grid gap-5 xl:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
