"use client";
import axiosInstance from "@/services/axios";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";

import { useAuthStore } from "@/store/user";

const myProjects = () => {
  const { authData, setAuthData, clearAuthData } = useAuthStore();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.post(
          "/api/v1/auth/check-auth",
          {},
          { withCredentials: true }
        );
        console.log("res data => ", res.data);
        Cookies.set("jwt2", res.data.data.token);
        console.log(Cookies.get("jwt2"));
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);
  return (
    <div>
      {authData.auth ? "U are Authenticated" : "U are not autheticated"}
    </div>
  );
};

export default myProjects;
