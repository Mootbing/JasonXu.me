import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import BlobCursor from "./components/BlobCursor";

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Jason Xu",
  description: "Jason Xu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${montserrat.variable} antialiased`}>
        <BlobCursor />
        {children}
      </body>
    </html>
  );
}
