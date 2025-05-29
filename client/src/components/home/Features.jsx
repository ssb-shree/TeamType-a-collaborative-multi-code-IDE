"use client";

import React, { useEffect } from "react";

import { GlareCard } from "../ui/glare-card";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],
});

import styles from "./Hero.module.css";
import { Footer } from "./Footer";

const Features = () => {
  return (
    <section className="h-full w-full bg-[#1e293b] flex flex-col">
      <div className="h-[80%] w-full shadow-sm shadow-cyan-400 flex flex-col justify-start items-center gap-y-10 pt-10">
        <h1
          className={`${poppins.className} ${styles.title} text-purple-500 text-2xl md:text-6xl`}
        >
          Why Choose Team Type ?
        </h1>
        <div className="gap-x-10 grid grid-cols-1 overflow-x-scroll md:overflow-hidden md:grid-cols-3 grid-rows-none flex-wrap">
          <GlareCard className={`bg-[#0f172a] shadow-lg shadow-cyan-300 h-6`}>
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-3 text-xl text-nowrap">
                <span>⚡</span>
                <h1 className={styles.title}> Real-Time Collaboration</h1>
              </div>
              <p className="text-lg text-slate-400">
                Work together instantly with live code sync, shared cursors, and
                seamless updates — just like magic. No delays. No refresh. Just
                flow.
              </p>
            </div>
          </GlareCard>
          <GlareCard className={`bg-[#0f172a] shadow-lg shadow-cyan-300`}>
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-3 text-xl text-nowrap">
                <span>🧩</span>
                <h1 className={styles.title}>Seamless Session Resuming </h1>
              </div>
              <p className="text-lg text-slate-400">
                Your sessions are auto-saved, so you never lose progress. Come
                back anytime, exactly where you left off.
              </p>
            </div>
          </GlareCard>
          <GlareCard className={`bg-[#0f172a] shadow-lg shadow-cyan-300`}>
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-3 text-xl text-nowrap">
                <span>💡</span>
                <h1 className={styles.title}> AI-Powered Assistance</h1>
              </div>
              <p className="text-lg text-slate-400">
                Interact with intelligent AI that understands your coding needs
                and offers insightful suggestions and guidance to help you build
                better, faster, and smarter.
              </p>
            </div>
          </GlareCard>
        </div>
      </div>
      <div className="h-[20%] w-full">
        <Footer />
      </div>
    </section>
  );
};

export default Features;
