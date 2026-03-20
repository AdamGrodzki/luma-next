import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Luma Camera Encyclopedia",
    template: "%s | Luma Camera Encyclopedia",
  },
  description: "Encyklopedia marek i aparatów oparta o Next.js i Contentful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="bg-[#040607] text-[#f3eadf] antialiased">
        <header className="border-b border-[#2a231c] px-6 py-4">
          <div className="mx-auto grid max-w-[1500px] grid-cols-3 items-center text-sm uppercase tracking-[0.25em] text-[#8e867d]">
            <nav className="flex gap-10">
              <Link href="/kolekcja" className="hover:text-[#dcc2a2]">
                Kolekcja
              </Link>
              <Link href="/brands" className="hover:text-[#dcc2a2]">
                Marki
              </Link>
            </nav>

            <Link href="/" className="text-center text-5xl font-serif tracking-[0.22em] text-[#f1e4d3] md:text-6xl">
              Luma
            </Link>

            <div className="text-right">
              <Link href="/cameras" className="hover:text-[#dcc2a2]">
                Szukaj
              </Link>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}