import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TeamType - Real-Time Collaborative Multi-Code IDE for Developers",
  description:
    "TeamType is a powerful, web-based collaborative IDE enabling real-time multi-user coding, syntax highlighting, multi-language support, and seamless project sharing. Code together effortlessly, anytime, anywhere!",
  keywords: [
    "real-time code editor",
    "collaborative IDE",
    "multi-user coding",
    "online code editor",
    "live programming platform",
    "multi-language IDE",
    "web-based code collaboration",
    "team coding tool",
    "pair programming",
    "code synchronization",
  ].join(", "),
  author: "Shree Bavachikar",
  robots: "index, follow",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
