"use client";
import { useEffect } from "react";
import useAuth from "@/hooks/use-auth";
import { redirect } from 'next/navigation';
import ToastContext from "../context/ToastContext";

export default function AuthLayout({ children }: any) {
  const state = useAuth();


  useEffect(() => {
    if (state?.isLoggedIn && state?.isInitialized) {
      return redirect("/dashboard")
    }
  }, [state]);


  return <>
    {children}
    <ToastContext />
  </>
}
