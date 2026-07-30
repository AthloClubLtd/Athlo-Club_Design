import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import AuthSessionProvider from "@/components/session-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Brand tokens v1 (styles/tokens.css) — Space Grotesk for display/headings,
// Geist for body/UI. Loaded here so both are available site-wide as CSS
// variables; existing pages keep using --font-inter until migrated.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://athloclub.com"),
  title: {
    default: "Athlo Club — Discover strength sports events and clubs",
    template: "%s — Athlo Club",
  },
  description:
    "Athlo Club is the platform for weightlifting, powerlifting, CrossFit, and fitness racing — discover events, run competitions, and track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${GeistSans.variable}`}
    >
      <body className="min-h-screen bg-navy font-sans text-white antialiased">
        <AuthSessionProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
