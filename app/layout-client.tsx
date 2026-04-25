'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import MobileMenu from "@/components/ui/MobileMenu";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:left-4 focus:top-4 focus:rounded-lg focus:bg-[var(--accent-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2"
      >
        Skip to main content
      </a>

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
            <nav className="flex min-w-0 items-center gap-4 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 lg:gap-8">
              <Link
                href="/kolekcja"
                className={`whitespace-nowrap transition-all duration-200 ${isActive('/kolekcja')
                    ? 'text-[var(--accent-primary)] font-semibold border-b-2 border-[var(--accent-primary)] pb-1'
                    : 'text-[var(--text-muted)] hover:text-[var(--accent-hover)]'
                  }`}
              >
                Kolekcja
              </Link>
              <Link
                href="/brands"
                className={`whitespace-nowrap transition-all duration-200 ${isActive('/brands')
                    ? 'text-[var(--accent-primary)] font-semibold border-b-2 border-[var(--accent-primary)] pb-1'
                    : 'text-[var(--text-muted)] hover:text-[var(--accent-hover)]'
                  }`}
              >
                Marki
              </Link>
              <Link
                href="/o-nas"
                className={`whitespace-nowrap transition-all duration-200 ${isActive('/o-nas')
                    ? 'text-[var(--accent-primary)] font-semibold border-b-2 border-[var(--accent-primary)] pb-1'
                    : 'text-[var(--text-muted)] hover:text-[var(--accent-hover)]'
                  }`}
              >
                O Nas
              </Link>
            </nav>

            <div className="flex justify-center">
              <Link href="/">
                <Image src="/luma-logo.svg" alt="Luma Camera Encyclopedia" width={120} height={40} />
              </Link>
            </div>

            <div className="flex items-center justify-end gap-4 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300">
              <Link
                href="/cameras"
                className={`whitespace-nowrap transition-all duration-200 ${isActive('/cameras')
                    ? 'text-[var(--accent-primary)] font-semibold border-b-2 border-[var(--accent-primary)] pb-1'
                    : 'text-[var(--text-muted)] hover:text-[var(--accent-hover)]'
                  }`}
              >
                Aparaty
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        {children}
      </main>
      <ScrollToTopButton />
    </>
  );
}
