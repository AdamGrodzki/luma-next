import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import RootLayoutClient from "../app/layout-client";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luma Camera Encyclopedia",
    template: "%s | Luma Camera Encyclopedia",
  },
  description: "Encyklopedia marek i aparatów oparta o Next.js i Contentful.",
  icons: {
    icon: "/luma-logo.svg",
    apple: "/luma-logo.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Luma Cameras",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
  themeColor: "#F9F8F6",
  colorScheme: "dark light",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning data-theme="dark">
      <body className={`${montserrat.variable} bg-[var(--bg-dark)] text-[var(--text-primary)] antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}