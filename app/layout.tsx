import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import RootLayoutClient from "../app/layout-client";

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
    <html lang="pl" suppressHydrationWarning data-theme="dark">
      <body className="bg-[var(--bg-dark)] text-[var(--text-primary)] antialiased transition-colors duration-300">
        <ThemeProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}