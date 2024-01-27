import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const alien = localFont({
  src: [
    {
      path : '../public/fonts/alien.ttf',
      weight: '400'
    }
  ],
  variable: '--font-alien',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alien.variable} bg-gray-800`}>
       <body className={inter.className}>{children}</body>
    </html>
  );
}