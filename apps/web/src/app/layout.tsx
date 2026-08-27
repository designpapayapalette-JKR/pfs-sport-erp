import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ERPProvider } from "@/context/erp-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PFS Sport — Worldwide Sports Solutions | B2B Dealer ERP",
    template: "%s | PFS Sport",
  },
  description:
    "PFS Sport is a global manufacturer of padel, pickleball, acrylic, polyurethane and EPDM sports surfacing systems, serving distributors and contractors in 95+ countries. Official B2B Dealer Portal & ERP.",
  applicationName: "PFS Sport ERP",
  keywords: [
    "sports flooring",
    "acrylic court surface",
    "pickleball court",
    "tennis court",
    "padel turf",
    "ITF certified flooring",
    "BWF Grade 1",
    "modular PP tiles",
    "PFS Sport",
    "sports infrastructure India",
    "wholesale court materials",
  ],
  authors: [{ name: "PFS Sport", url: "https://www.pfs.sport" }],
  creator: "PFS Sport",
  publisher: "PFS Sport — Worldwide Sports Solutions",
  metadataBase: new URL("https://www.pfs.sport"),
  openGraph: {
    type: "website",
    siteName: "PFS Sports — Worldwide Sports Solution",
    title: "PFS Sport — Precision-Engineered Sports Surfacing Systems",
    description:
      "25+ years manufacturing padel, pickleball, acrylic, polyurethane and EPDM surfacing systems for courts, tracks and playgrounds — 50,000+ projects across 95+ countries.",
    url: "https://www.pfs.sport",
    images: [
      {
        url: "/pfs-favicon-192.png",
        width: 192,
        height: 192,
        alt: "PFS Sport Logo",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "PFS Sport — Precision-Engineered Sports Surfacing Systems",
    description:
      "ISO, CE & SGS certified padel, pickleball, acrylic and polyurethane surfacing systems trusted by 2,000+ distributors worldwide.",
  },
  icons: {
    icon: [
      { url: "/pfs-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/pfs-favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/pfs-apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/pfs-favicon-32.png",
  },
  manifest: undefined,
};

export const viewport: Viewport = {
  themeColor: "#0A2A57",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-neutral-900 font-sans">
        <ERPProvider>{children}</ERPProvider>
      </body>
    </html>
  );
}