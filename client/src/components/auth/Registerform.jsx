import React, { useState } from "react";

import styles from "./Hero.module.css";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { toastMessage } from "@/services/toastMessage";

import axiosInstance from "@/services/axios";

import Cookies from "js-cookie";

const Registerform = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    const { name, email, password } = userData;
    // check for any empty fields
    if (!name || !email || !password) {
      toast.custom(toastMessage(false, "Fields Can't be Empty"));
      return;
    }

    // check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.custom(toastMessage(false, "Invalid Email"));
      return;
    }

    // check is pass is less than 6 characters
    if (password.length < 6) {
      toast.custom(toastMessage(false, "Password is too short"));
      return;
    }

    // make the request
    setLoading((prev) => !prev);

    try {
      const response = await axiosInstance.post(
        "/api/v1/auth/register",
        userData,
        { withCredentials: true }
      );

      toast.custom(
        toastMessage(true, response.data.message || "Failed to Register")
      );

      if (response.data.success) {
        Cookies.set("token", response.data.token);
        router.push("/my-projects");
      }
    } catch (error) {
      toast.custom(
        toastMessage(false, error.response.data.message || "Failed to Register")
      );
    } finally {
      setLoading((prev) => !prev);
    }
  };
  return (
    <div className="flex items-center justify-center hero px-4 bg-[#0f172]">
      <div className=" w-screen bg-opacity-5 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md shadow-cyan-300">
        <form className="space-y-5 flex flex-col justify-center items-center">
          <div className="w-full">
            <label
              className={`block text-blue-100 mb-1 ${styles.title}`}
              htmlFor="username"
            >
              Your name
            </label>
            <input
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              id="username"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="eg: King Von"
            />
          </div>
          <div className="w-full">
            <label
              className={`block text-blue-100 mb-1 ${styles.title}`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
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
              value={userData.password}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="••••••••"
            />
          </div>
          <button
            disabled={loading}
            type="button"
            onClick={submitForm}
            className={`${styles.button}`}
          >
            {loading ? "Wait a Moment" : "Register"}
          </button>
          <span className="">
            Already have an account ?{" "}
            <Link href="/login" className=" text-cyan-300">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Registerform;
