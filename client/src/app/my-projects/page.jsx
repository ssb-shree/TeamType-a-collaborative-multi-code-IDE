"use client";
import axiosInstance from "@/services/axios";
import React, { useEffect, useState } from "react";

const myProjects = () => {
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.post(
          "/api/v1/auth/check-auth",
          {},
          { withCredentials: true }
        );
        console.log(res);
        setAuth(true);
      } catch (error) {
        console.log(error);
        setAuth(false);
      }
    };
    checkAuth();
  }, []);
  return <div>{isAuth ? "U are Authenticated" : "U are not autheticated"}</div>;
};

export default myProjects;
