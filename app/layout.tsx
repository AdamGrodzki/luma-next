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
          <div className="mx-auto grid max-w-[1500px] grid-cols-[1fr_220px_1fr] items-center gap-4">
            <nav className="flex min-w-0 items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-[#8e867d] md:gap-8">
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
              <Link
                href="/"
                className="whitespace-nowrap text-center font-serif text-3xl tracking-[0.14em] text-[#f1e4d3] transition hover:text-white md:text-4xl"
              >
                Luma
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
        </header>

        {children}
      </body>
    </html>
  );
}