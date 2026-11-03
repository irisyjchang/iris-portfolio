import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iris — UI/UX Portfolio",
  description:
    "Iris's scrapbook-style UI/UX portfolio: an iris field in gentle rain, seed-packet project previews, and editorial case studies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
