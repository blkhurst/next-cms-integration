import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import DraftIndicator from "@/components/draft-indicator";

const interVariable = localFont({
  src: "../assets/fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CMS Integration",
  description: "",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${interVariable.variable} antialiased`}>
        <Header />
        <DraftIndicator />
        {children}
      </body>
    </html>
  );
}
