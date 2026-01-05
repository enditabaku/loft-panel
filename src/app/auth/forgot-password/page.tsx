import ForgotPassword from "@/components/Auth/ForgotPassword";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password Page",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="bg-dark shadow-1 dark:bg-gray-dark dark:shadow-card pt-14" style={{ minHeight: '100vh' }}>
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full p-4 xl:block xl:w-1/3">
            <div className="bg-white overflow-hidden px-5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
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
                  Forget your password?
                </p>
              </div>
              <div className="w-full p-4 sm:p-5 xl:p-5">
                <ForgotPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
