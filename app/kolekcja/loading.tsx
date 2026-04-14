"use client";

/**
 * Loading skeleton dla strony kolekcji
 */
export default function CollectionLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-4 sm:py-5">
        {/* Mobile Drawers Skeleton */}
        <div className="flex items-center justify-between rounded-2xl border border-[var(--border-light)] bg-[var(--bg-darker)] px-4 py-3 xl:hidden animate-pulse">
          <div className="h-6 w-20 bg-[var(--bg-darker)] rounded-full"></div>
          <div className="h-6 w-20 bg-[var(--bg-darker)] rounded-full"></div>
        </div>

        {/* Main Grid */}
        <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-6 xl:grid-cols-[230px_minmax(0,1fr)_300px]">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden xl:block space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-[var(--bg-darker)]rounded-lg animate-pulse"></div>
            ))}
          </div>

          {/* Main Content */}
          <section className="rounded-lg sm:rounded-[22px] border border-[#1f1a14] bg-[var(--bg-darker)] px-4 sm:px-6 md:px-8 py-5 sm:py-6 xl:px-10 xl:py-7">
            {/* Header Skeleton */}
            <div className="mb-6 space-y-3">
              <div className="h-8 w-32 bg-[var(--bg-dark)] rounded-lg animate-pulse"></div>
              <div className="h-6 w-24 bg-[var(--bg-dark)] rounded-lg animate-pulse"></div>
            </div>

            {/* Grid of Cards */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="overflow-hidden rounded-lg border border-[#1f1a14] bg-[var(--bg-dark)]">
                  {/* Image Skeleton */}
                  <div className="aspect-[4/3] bg-[var(--bg-dark)] animate-pulse"></div>
                  {/* Text Skeleton */}
                  <div className="p-3 sm:p-4 space-y-2">
                    <div className="h-3 w-16 bg-[var(--bg-darker)] rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-[var(--bg-darker)] rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-[var(--bg-darker)] rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Sidebar - Hidden on mobile */}
          <div className="hidden xl:block space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
