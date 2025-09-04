import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebDesk",
  description: "A minimal web desktop (PWA) starter"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b0d12" />
      </head>
      <body>{children}</body>
    </html>
  );
}
