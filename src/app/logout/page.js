"use client";
import { useEffect } from "react";

export default function Logout() {

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
    }
  }, []);

  return <>Logout Page</>;
}

