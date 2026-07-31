import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Athlo Club — Connecting strength communities to the athletes who belong in them",
  description:
    "Organisers run events and competitions end-to-end in weightlifting, powerlifting, Hyrox, CrossFit and fitness Racing. Athletes discover the clubs and events they belong in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-text">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
