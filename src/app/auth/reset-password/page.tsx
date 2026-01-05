import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ResetPassword from "@/components/Auth/ResetPassword";
import type { Metadata } from "next";

export default async function ResetPasswordPage() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="bg-dark shadow-1 dark:bg-gray-dark dark:shadow-card pt-14" style={{ minHeight: '100vh' }}>
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full p-7.5 xl:block xl:w-1/2">
              <div className="bg-white overflow-hidden px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
                <div className="text-center justify-items-center">
                  <Image
                    className="hidden dark:block"
                    src={"/images/logo.png"}
                    alt="Logo"
                    width={100}
                    height={10}
                  />
                  <Image
                    className="dark:hidden"
                    src={"/images/light_logo.png"}
                    alt="Logo"
                    width={60}
                    height={10}
                  />
                  <p className="text-xl font-medium text-dark dark:text-white mt-4">
                    Create New Password
                  </p>
                </div>
                <div className="w-full p-4 sm:p-12.5 xl:p-15">
                  <ResetPassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
