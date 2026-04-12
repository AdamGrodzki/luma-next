import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Luma Camera Encyclopedia",
    template: "%s | Luma Camera Encyclopedia",
  },
  description: "Encyklopedia marek i aparatów oparta o Next.js i Contentful.",
  viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
  icons: {
    icon: "/luma-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="bg-[#040607] text-[#f3eadf] antialiased">
        <header className="border-b border-[#2a231c] px-4 py-3 sm:px-6 sm:py-4">
          <div className="mx-auto max-w-[1500px]">
            {/* Mobile/Tablet: Stacked layout */}
            <div className="grid grid-cols-[1fr_auto] items-center gap-2 md:hidden">
              <div className="flex justify-start">
                <Link href="/">
                  <Image src="/luma-logo.svg" alt="Luma" width={100} height={32} />
                </Link>
              </div>
              <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[#8e867d]">
                <Link
                  href="/kolekcja"
                  className="whitespace-nowrap transition hover:text-[#dcc2a2]"
                >
                  Kol.
                </Link>
                <Link
                  href="/brands"
                  className="whitespace-nowrap transition hover:text-[#dcc2a2]"
                >
                  Marki
                </Link>
                <Link
                  href="/cameras"
                  className="whitespace-nowrap transition hover:text-[#dcc2a2]"
                >
                  Ap.
                </Link>
              </nav>
            </div>

            {/* Desktop: 3-column grid layout */}
            <div className="hidden md:grid grid-cols-[1fr_220px_1fr] items-center gap-4">
              <nav className="flex min-w-0 items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-[#8e867d] lg:gap-8">
                <Link
                  href="/kolekcja"
                  className="whitespace-nowrap transition hover:text-[#dcc2a2]"
                >
                  Kolekcja
                </Link>
                <Link
                  href="/brands"
                  className="whitespace-nowrap transition hover:text-[#dcc2a2]"
                >
                  Marki
                </Link>
              </nav>

              <div className="flex justify-center">
                <Link href="/">
                  <Image src="../luma-logo.svg" alt="Luma Camera Encyclopedia" width={120} height={40} />
                </Link>
              </div>

              <div className="flex justify-end text-[11px] uppercase tracking-[0.22em] text-[#8e867d]">
                <Link
                  href="/cameras"
                  className="whitespace-nowrap transition hover:text-[#dcc2a2]"
                >
                  Aparaty
                </Link>
              </div>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}