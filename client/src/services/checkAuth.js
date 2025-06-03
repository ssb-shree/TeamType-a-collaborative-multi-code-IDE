import axiosInstance from "./axios";
import { useAuthStore } from "@/store/user";

import Cookies from "js-cookie";

const { authData, setAuthData, clearAuthData } = useAuthStore();

export const checkAuth = async () => {
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
