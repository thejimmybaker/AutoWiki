import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "AI-VE — AI‑Verifiable Encyclopedia",
  description: "Every sentence with receipts. Beautiful, minimal, evidence-first UI.",
  metadataBase: new URL("https://ai-ve.vercel.app"),
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "AI-VE — AI‑Verifiable Encyclopedia",
    description: "Every sentence with receipts.",
    siteName: "AI-VE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>{children}</body>
    </html>
  );
}
