"use client";

import React from "react";

import { usePathname } from "next/navigation";

import styles from "../home/Hero.module.css";

import { Press_Start_2P, Space_Grotesk } from "next/font/google";
import Loginform from "./Loginform";
import Registerform from "./Registerform";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weigth: "500",
  subsets: ["latin"],
});

const Hero = () => {
  const pathName = usePathname();
  return (
    <section className="bg-[#1e293b] w-full h-screen flex flex-col items-center text-slate-300">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col w-full items-center mb-4">
          <h1
            className={`${pressStart2P.className} ${styles.title} text-2xl md:text-6xl`}
          >
            {pathName == "/login" ? "Login" : "Register"}
          </h1>
          <p
            className={`${spaceGrotesk.className} text-sm  md:text-xl md:text-nowrap mt-2`}
          >
            {pathName == "/login"
              ? "Welcome back! Please enter your credentials to continue."
              : "One editor. Infinite collaboration. Welcome aboard."}
          </p>
        </div>
        <div>{pathName == "/login" ? <Loginform /> : <Registerform />}</div>
      </div>
    </section>
  );
};

export default Hero;
