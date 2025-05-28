"use client";
import React from "react";
import styles from "./Hero.module.css";
import ParticlesBackground from "./ParticalBG";

import { Press_Start_2P, Space_Grotesk } from "next/font/google";

import Link from "next/link";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weigth: "500",
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <section
      className={`relative h-[96%] w-full overflow-hidden ${styles.hero}`}
    >
      {/* Content on top */}
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white flex flex-col justify-center items-center gap-8 px-8 text-center max-w-3xl">
        {/* div one */}
        <div className="w-[80%] h-[90%] flex flex-col justify-center gap-y-5 items-center">
          <h1
            className={`${pressStart2P.className} text-2xl md:text-6xl ${styles.title}`}
          >
            TeamType
          </h1>
          <p
            className={`${spaceGrotesk.className} text-sm  md:text-xl md:text-nowrap`}
          >
            Build, collaborate, and code in real-time across multiple languages.{" "}
            <br />
            One workspace, infinite possibilities
          </p>
        </div>
        {/* div two */}
        <div>
          <Link href={"/my-projects"}>
            <button type="button" className={`${styles.button} text-nowrap`}>
              🚀 Launch Editor
            </button>
          </Link>
        </div>
      </div>
      {/* Particle background behind content */}
      <ParticlesBackground className="absolute top-0 left-0 w-full h-full z-0" />
    </section>
  );
};

export default Hero;
