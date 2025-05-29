import Hero from "@/components/auth/Hero";
import React from "react";

export const metadata = {
  title: "Login | TeamType",
  description:
    "Sign in to TeamType – a real-time collaborative coding platform.",
  keywords: ["TeamType", "register", "code editor", "real-time collaboration"],
  openGraph: {
    title: "Login for TeamType",
    description: "Join TeamType and collaborate with your team in real-time.",
    url: "https://team-type-a-collaborative-multi-cod.vercel.app/login",
    siteName: "TeamType",
    images: [
      {
        url: "https://postimg.cc/zLCznZ0s",
        width: 1200,
        height: 630,
        alt: "TeamType Login page",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register | TeamType",
    description: "Sign up and start coding together with your team.",
    images: ["https://postimg.cc/zLCznZ0s"],
  },
};

const Login = () => {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <Hero />
    </main>
  );
};

export default Login;
