import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATLAS | Dijital Ekosistem",
  description: "ATLAS ulusal dijital ekosistem prototipi",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
