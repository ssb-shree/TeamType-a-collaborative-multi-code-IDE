export const metadata = {
  title: "Register | TeamType",
  description:
    "Sign up to TeamType – a real-time collaborative coding platform.",
  keywords: ["TeamType", "register", "code editor", "real-time collaboration"],
  openGraph: {
    title: "Register for TeamType",
    description: "Join TeamType and collaborate with your team in real-time.",
    url: "https://team-type-a-collaborative-multi-cod.vercel.app/register",
    siteName: "TeamType",
    images: [
      {
        url: "https://images.unsplash.com/photo-1751467987837-0079a2030053",
        width: 1200,
        height: 630,
        alt: "TeamType register page",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register | TeamType",
    description: "Sign up and start coding together with your team.",
    images: ["https://images.unsplash.com/photo-1751467987837-0079a2030053"],
  },
};

import React from "react";
import Hero from "@/components/auth/Hero";

const Register = () => {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <Hero />
    </main>
  );
};

export default Register;
