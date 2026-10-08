import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (SIL Open Font License, see fonts/Geist-LICENSE.txt), so dev and builds
// never depend on reaching Google Fonts.
const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lockwave Systems",
  description: "Demo site: mesh radio hardware from a team of engineers based in Lithuania.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: Next turns the smooth scrolling from globals.css off while it
    // changes page, so a new page opens at its top instead of gliding up from the old position.
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
