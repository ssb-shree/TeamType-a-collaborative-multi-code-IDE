import React from "react";

import styles from "./Hero.module.css";
import Link from "next/link";

import { MailIcon } from "lucide-react";

const Loginform = () => {
  return (
    <div className="flex items-center justify-center hero px-4 bg-[#0f172]">
      <div className="w-screen bg-opacity-5 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md shadow-cyan-300">
        <form className="space-y-5 flex flex-col justify-center items-center ">
          <div className="w-full">
            <label
              className={`block text-blue-100 mb-1 ${styles.title}`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="you@example.com"
            />
          </div>
          <div className="w-full">
            <label
              className={`block text-blue-100 mb-1 ${styles.title}`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="••••••••"
            />
          </div>
          <button type="button" className={`${styles.button}`}>
            Log In
          </button>
          <span className="">
            Dont have an account ?{" "}
            <Link href="/register" className=" text-cyan-300">
              Get one
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
