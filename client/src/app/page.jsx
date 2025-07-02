import Features from "@/components/home/Features";
import React from "react";
import Hero from "@/components/home/Hero";

export const metadata = {
  title: "TeamType – Real-Time Collaborative Code Editor",
  description:
    "Code together, from anywhere. TeamType is a real-time collaborative IDE built for developers and teams. Share, edit, and build in sync.",
  keywords: [
    "TeamType",
    "collaborative code editor",
    "real-time IDE",
    "online code editor",
    "pair programming",
    "live coding",
    "developer tools",
    "multi-user coding",
  ].join(", "),
  authors: [{ name: "Shree Bavachikar", url: "https://ssb.is-a.dev/" }],
  creator: "Shree Bavachikar",
  openGraph: {
    title: "TeamType – Real-Time Collaborative Code Editor",
    description:
      "Build software together in real-time. TeamType offers live code sharing, multi-language support, and seamless teamwork.",
    url: "https://team-type-a-collaborative-multi-cod.vercel.app",
    siteName: "TeamType",
    images: [
      {
        url: "https://images.unsplash.com/photo-1751467987837-0079a2030053",
        width: 1200,
        height: 630,
        alt: "TeamType collaborative IDE preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeamType – Real-Time Collaborative IDE",
    description:
      "Join TeamType to experience seamless real-time coding with your team.",
    images: ["https://images.unsplash.com/photo-1751467987837-0079a2030053"], // optional
    creator: "@sde.shree", // optional
  },
  metadataBase: new URL(
    "https://team-type-a-collaborative-multi-cod.vercel.app"
  ),
  robots: "index, follow",
  manifest: "/site.webmanifest", // optional
};

const Home = () => {
  return (
    <main className="h-screen w-screen overflow-x-hidden">
      <Hero />
      <Features />
    </main>
  );
};

export default Home;
