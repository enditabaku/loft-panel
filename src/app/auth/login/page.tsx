import SigninWithPassword from "@/components/Auth/SigninWithPassword";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
    <>
      <div className="bg-dark shadow-1 dark:bg-gray-dark dark:shadow-card pt-14" style={{minHeight: '100vh'}}>
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full p-4 xl:block xl:w-1/3">
            <div className="bg-white border border-1 overflow-hidden px-5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
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
                  Sign in to your account
                </p>
              </div>
            <div className="w-full p-4 sm:p-4 xl:p-6">
              <SigninWithPassword />
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
