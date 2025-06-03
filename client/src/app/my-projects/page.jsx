"use client";

import { Press_Start_2P, Space_Grotesk } from "next/font/google";

import axiosInstance from "@/services/axios";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { useEffect, useState } from "react";

import {} from "@/components/ui/typewriter-effect";

import styles from "./Hero.module.css";

import LoadingPage from "../loading";
import Project from "@/components/myProject/Projects";
import { useAuthStore } from "@/store/user";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weigth: "500",
  subsets: ["latin"],
});

const myProjects = () => {
  const router = useRouter();
  const { authData, setAuthData, clearAuthData } = useAuthStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserInfo = async () => {
      const token = Cookies.get("token");
      try {
        const res = await axiosInstance.post(
          "/api/v1/auth/check-auth",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { ID, name } = res.data.data;
        if (!res.data.success) {
          clearAuthData();
          router.push("/login");
        }
        setAuthData({ name, ID, auth: res.data.success });
        setLoading(false);
      } catch (error) {
        clearAuthData();
        router.push("/login");
      }
    };
    getUserInfo();
  }, []);
  return loading ? (
    <LoadingPage />
  ) : (
    <section className={`h-screen w-screen bg-[#1e293b] overflow-x-hidden`}>
      <div
        className={`${styles.hero}  flex flex-col justify-center items-center  w-full h-[20%] gap-x-10`}
      >
        <div className="w-screen px-10 ">
          <h1
            className={`${pressStart2P.className} text-2xl md:text-4xl ${styles.title}`}
          >
            Welcome,{authData.name.split(" ")[0]}
          </h1>
          <p
            className={`${spaceGrotesk.className} text-sm  md:text-xl md:text-nowrap text-slate-300 mt-5`}
          >
            Pick up right where you left off with Team Type
          </p>
        </div>
      </div>
      <Project name={authData.name} />
    </section>
  );
};

export default myProjects;
