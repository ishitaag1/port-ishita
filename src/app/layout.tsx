import type { Metadata, Viewport } from "next";
import { profile } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: profile.siteUrl ? new URL(profile.siteUrl) : undefined,
  title: "Ishita Agrawal — Software, AI & Data",
  description:
    "Ishita Agrawal is a fourth-year NIT Rourkela student exploring software engineering, applied AI, and data through practical projects.",
  alternates: profile.siteUrl ? { canonical: profile.siteUrl } : undefined,
  openGraph: {
    title: "Ishita Agrawal — Software, AI & Data",
    description:
      "A fourth-year NIT Rourkela student learning by building practical software, AI, and data projects.",
    type: "website",
    images: profile.siteUrl ? [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Ishita Agrawal — Software, AI and Data" }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishita Agrawal — Software, AI & Data",
    description:
      "A fourth-year NIT Rourkela student learning by building practical software, AI, and data projects.",
    images: profile.siteUrl ? ["/og-image.svg"] : undefined,
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#132321",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
