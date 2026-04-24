'use client';

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import MobileMenu from "@/components/ui/MobileMenu";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-[var(--border-light)] px-4 py-3 transition-colors duration-300 sm:px-6 sm:py-4">
        <div className="mx-auto max-w-[1500px]">
          {/* Mobile/Tablet: Logo + Hamburger Menu */}
          <div className="flex items-center justify-between md:hidden">
            <Link href="/">
              <Image src="/luma-logo.svg" alt="Luma" width={100} height={32} />
            </Link>
            <MobileMenu />
          </div>

          {/* Desktop: 3-column grid layout */}
          <div className="hidden md:grid grid-cols-[1fr_220px_1fr] items-center gap-4">
            <nav className="flex min-w-0 items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] transition-colors duration-300 lg:gap-8">
              <Link
                href="/kolekcja"
                className="whitespace-nowrap transition hover:text-[var(--accent-hover)]"
              >
                Kolekcja
              </Link>
              <Link
                href="/brands"
                className="whitespace-nowrap transition hover:text-[var(--accent-hover)]"
              >
                Marki
              </Link>
              <Link
                href="/o-nas"
                className="whitespace-nowrap transition hover:text-[var(--accent-hover)]"
              >
                O Nas
              </Link>
            </nav>

            <div className="flex justify-center">
              <Link href="/">
                <Image src="/luma-logo.svg" alt="Luma Camera Encyclopedia" width={120} height={40} />
              </Link>
            </div>

            <div className="flex items-center justify-end gap-4 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] transition-colors duration-300">
              <Link
                href="/cameras"
                className="whitespace-nowrap transition hover:text-[var(--accent-hover)]"
              >
                Aparaty
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {children}
      <ScrollToTopButton />
    </>
  );
}
