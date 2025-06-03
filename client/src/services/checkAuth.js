import axiosInstance from "./axios";
import { useAuthStore } from "@/store/user";

import Cookies from "js-cookie";

export const checkAuth = async () => {
  const { authData, setAuthData, clearAuthData } = useAuthStore();
  // get the cookie from the browser
  const token = Cookies.get("token");
  const res = await axiosInstance.post(
    "/api/v1/auth/check-auth",
    {},
    {
      Authorization: `token ${token}`,
    }
  );
};
