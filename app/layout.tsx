import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import type { Viewport } from 'next'
import Nav from "./_components/layout/nav"
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextjs with Auth.js",
  description: "Next.js + TypeScript Starter With Tailwind CSS and Auth.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-gradient-to-br from-violet-50 via-white to-indigo-100`}
      >
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
