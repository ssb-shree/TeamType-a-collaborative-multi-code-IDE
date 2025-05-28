import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import React from "react";

const Home = () => {
  return (
    <main className="h-screen w-screen overflow-x-hidden">
      <Hero />
      <Features />
    </main>
  );
};

export default Home;
