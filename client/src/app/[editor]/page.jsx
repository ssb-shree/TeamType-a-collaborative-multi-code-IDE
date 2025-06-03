"use client";
import React from "react";

import { useAuthStore, setAuthdata, clearAuthdata } from "@/store/user";

const Editorpage = () => {
  const { authData, setAuthData, clearAuthData } = useAuthStore();
  return (
    <div>
      <span>{authData.name}</span>
      <span>{authData.ID}</span>
      <span>{authData.auth ? "true" : "false"}</span>
    </div>
  );
};

export default Editorpage;
