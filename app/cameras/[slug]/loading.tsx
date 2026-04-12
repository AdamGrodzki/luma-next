"use client";

/**
 * Loading skeleton dla strony szczegółów aparatu
 */
export default function CameraDetailLoading() {
  return (
    <main className="min-h-screen bg-[#040607] py-8 sm:py-12 md:py-16 text-[#f3eadf]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section Skeleton */}
        <section className="rounded-lg sm:rounded-[24px] border border-[#2a2119] bg-[linear-gradient(180deg,#0b0b0b_0%,#070707_100%)] px-4 sm:px-5 md:px-8 py-6 sm:py-8 md:py-10">
          <div className="grid gap-6 xl:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-3 w-32 bg-[#2a231c] rounded animate-pulse"></div>
                <div className="h-8 w-48 bg-[#2a231c] rounded-lg animate-pulse"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-[#2a231c] rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden xl:flex justify-end">
              <div className="h-96 w-96 bg-[#2a231c] rounded-lg animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Gallery Section Skeleton */}
        <section className="rounded-lg sm:rounded-[24px] border border-[#1f1914] bg-[linear-gradient(180deg,#080808_0%,#060606_100%)] px-4 sm:px-5 md:px-8 py-6 sm:py-8 md:py-10 space-y-6">
          <div className="h-6 w-40 bg-[#2a231c] rounded-lg animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-96 flex-1 bg-[#2a231c] rounded-lg animate-pulse"></div>
            <div className="hidden sm:flex flex-col gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 w-20 bg-[#2a231c] rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs Section Skeleton */}
        <section className="rounded-lg sm:rounded-[24px] border border-[#1f1914] bg-[linear-gradient(180deg,#080808_0%,#060606_100%)] px-4 sm:px-5 md:px-8 py-6 sm:py-8 md:py-10 space-y-6">
          <div className="h-6 w-40 bg-[#2a231c] rounded-lg animate-pulse"></div>

          {/* Specs Grid */}
          <div className="grid gap-5 xl:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-[#2a231c] rounded-lg animate-pulse"></div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
