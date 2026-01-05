"use client";
import React, { useEffect } from "react";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";
import ToastContext from "../context/ToastContext";
import useAuth from "@/hooks/use-auth";
import { redirect } from 'next/navigation';

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const state = useAuth();

  // useEffect(() => {
  //   if (!state?.isLoggedIn && state?.isInitialized) {
  //    redirect('/auth/login');
  //   }
  // }, [state]);

  // Do not render sidebar and header on these pages
  if (
    ["/coming-soon", "/two-step-verification", "/under-maintenance"].some(
      (value) => pathname.endsWith(value),
    )
  ) {
    return (
      <>
        {children}
        <ToastContext />
      </>
    );
  }

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="w-full bg-gray-2 dark:bg-[#030303]">
            <Header />

            <main className="mx-auto w-full max-w-screen-3xl overflow-inherit p-4 md:p-6 2xl:p-10">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>

      <ToastContext />
    </>
  );
}
