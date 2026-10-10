import type { Metadata } from "next";
import { Montserrat, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { PREFS_SCRIPT } from "./prefs-script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NetPlus — Smarter Aviation Solutions",
  description:
    "NetPlus is an operations control platform for airlines and business-aviation operators — from the commercial request to the closure of every flight, in one application. Coming soon.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFS_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
