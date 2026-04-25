"use client";

/**
 * Loading skeleton dla strony O Nas
 */
export default function AboutLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)]">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden border-b border-[var(--border-light)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,159,106,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            {/* Badge skeleton */}
            <div className="h-6 w-24 bg-[var(--bg-darker)] rounded-full animate-pulse"></div>
            
            {/* Title skeleton */}
            <div className="space-y-3">
              <div className="h-10 sm:h-12 md:h-14 lg:h-16 w-full max-w-2xl bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
              <div className="h-10 sm:h-12 md:h-14 lg:h-16 w-3/4 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
            </div>

            {/* Description skeleton */}
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full max-w-2xl bg-[var(--bg-darker)] rounded animate-pulse"></div>
              <div className="h-4 w-full max-w-xl bg-[var(--bg-darker)] rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-[var(--bg-darker)] rounded animate-pulse"></div>
            </div>

            {/* Stats skeleton */}
            <div className="flex flex-wrap gap-6 sm:gap-12 pt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-8 sm:h-10 md:h-12 w-20 bg-[var(--bg-darker)] rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-[var(--bg-darker)] rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[var(--border-light)]">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="max-w-3xl space-y-3 mb-8 sm:mb-12">
            <div className="h-4 w-32 bg-[var(--bg-darker)] rounded animate-pulse"></div>
            <div className="h-8 sm:h-10 w-full max-w-lg bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
          </div>

          {/* Features grid */}
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg sm:rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 sm:p-5 space-y-3"
              >
                {/* Icon skeleton */}
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
                
                {/* Title skeleton */}
                <div className="h-6 w-3/4 bg-[var(--bg-darker)] rounded animate-pulse"></div>
                
                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-[var(--bg-darker)] rounded animate-pulse"></div>
                  <div className="h-3 w-full bg-[var(--bg-darker)] rounded animate-pulse"></div>
                  <div className="h-3 w-2/3 bg-[var(--bg-darker)] rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section Skeleton */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[var(--border-light)]">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-2 items-center">
            {/* Left column */}
            <div className="space-y-4 sm:space-y-6">
              <div className="h-4 w-28 bg-[var(--bg-darker)] rounded animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-8 sm:h-10 w-full bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
                <div className="h-8 sm:h-10 w-3/4 bg-[var(--bg-darker)] rounded-lg animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-[var(--bg-darker)] rounded animate-pulse"></div>
                <div className="h-4 w-full bg-[var(--bg-darker)] rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-[var(--bg-darker)] rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-[var(--bg-darker)] rounded animate-pulse"></div>
                <div className="h-4 w-4/5 bg-[var(--bg-darker)] rounded animate-pulse"></div>
              </div>
            </div>

            {/* Right column - Card */}
            <div className="rounded-lg sm:rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-card)]">
              <div className="p-4 sm:p-6 lg:p-10 space-y-4">
                <div className="h-6 w-40 bg-[var(--bg-darker)] rounded animate-pulse"></div>
                <div className="space-y-3 sm:space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-5 w-5 bg-[var(--bg-darker)] rounded-full animate-pulse flex-shrink-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-full bg-[var(--bg-darker)] rounded animate-pulse"></div>
                        {i % 2 === 0 && (
                          <div className="h-3 w-2/3 bg-[var(--bg-darker)] rounded animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="h-4 w-32 bg-[var(--bg-darker)] rounded animate-pulse mx-auto"></div>
            <div className="space-y-3">
              <div className="h-8 sm:h-10 w-3/4 bg-[var(--bg-darker)] rounded-lg animate-pulse mx-auto"></div>
              <div className="h-8 sm:h-10 w-2/3 bg-[var(--bg-darker)] rounded-lg animate-pulse mx-auto"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full max-w-xl bg-[var(--bg-darker)] rounded animate-pulse mx-auto"></div>
              <div className="h-4 w-3/4 bg-[var(--bg-darker)] rounded animate-pulse mx-auto"></div>
            </div>

            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-3 sm:gap-4 pt-4">
              <div className="h-11 w-48 bg-[var(--bg-darker)] rounded-full animate-pulse"></div>
              <div className="h-11 w-40 bg-[var(--bg-darker)] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
