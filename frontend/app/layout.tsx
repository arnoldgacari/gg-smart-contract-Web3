import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "GG Token DApp",
  description: "Portfolio decentralized application for GGToken",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
