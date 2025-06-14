import React, { useState } from "react";
import toast from "react-hot-toast";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import styles from "./Hero.module.css";
import { toastMessage } from "@/services/toastMessage";

import axiosInstance from "@/services/axios";

import Cookies from "js-cookie";
import { useAuthStore } from "@/store/user";
import { useProjectStore } from "@/store/project";

const Loginform = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect_url");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { authData, setAuthData, clearAuthData } = useAuthStore();
  const { setProjectData } = useProjectStore();

  const [loading, setLoading] = useState(false);

  const getProjectInfo = async () => {
    try {
      const projectID = redirectUrl.split("/editor/")[1];

      const token = Cookies.get("token");
      const res = await axiosInstance.get(`/api/v1/projects/${projectID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setProjectData(res.data.project);
      router.push(redirectUrl);
    } catch (error) {
      toast.custom(toastMessage(false, "Failed to Load Project Details"));
      console.log(error.message || error);
    }
  };

  const submitForm = async () => {
    const { email, password } = userData;

    // check for any empty fields
    if (!email || !password) {
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
        "/api/v1/auth/login",
        userData,
        { withCredentials: true }
      );

      toast.custom(
        toastMessage(true, response.data.message || "Failed to Register")
      );
      if (response.data.success) {
        Cookies.set("token", response.data.token);

        const { name, ID } = response.data.userData;

        setAuthData({
          name,
          userID: ID,
          token: response.data.token,
          auth: response.data.success,
        });

        redirectUrl ? getProjectInfo() : router.push("/my-projects");
      }
    } catch (error) {
      console.log(error);
      toast.custom(
        toastMessage(false, error.response.data.message || "Failed to Login")
      );
      clearAuthData();
    } finally {
      setLoading((prev) => !prev);
    }
  };

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
            onClick={submitForm}
            type="button"
            className={`${styles.button}`}
          >
            {loading ? "Wait a min" : "Log in"}
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
