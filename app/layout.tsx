import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoktoLife BD | Emergency Blood Donor Network in Bangladesh",
  description:
    "Find verified voluntary blood donors across all 64 districts of Bangladesh in real time. Request blood urgently, check blood group compatibility and register as a donor.",
  keywords: ["blood donor Bangladesh", "emergency blood", "blood bank", "RoktoLife", "রক্তদান"],
  openGraph: {
    title: "RoktoLife BD | Emergency Blood Donor Network",
    description: "Every drop counts. Save a life today in Bangladesh.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
