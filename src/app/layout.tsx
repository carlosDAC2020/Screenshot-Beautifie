import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Screenshot Beautifier | Aesthetic Mockups in Seconds",
  description: "Transform your raw screenshots into professional, aesthetic mockups for social media with beautiful gradients and shadows.",
  keywords: ["screenshot", "beautifier", "mockup", "social media", "design tool", "SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6986304369066538"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#09090b] text-[#fafafa] min-h-screen flex flex-col`}
      >

        {children}
      </body>
    </html>
  );
}
