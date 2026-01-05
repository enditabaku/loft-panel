"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthService from "@/services/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

export default function TwoStepVerification() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.slice(-1); // only keep last digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (value && index == inputsRef.current.length - 1) {
      handleSubmit(newOtp.join(""))
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return; // only numbers

    const digits = pastedData.slice(0, otp.length).split("");
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = digit;
      }
    });

    setOtp(newOtp);

    // focus the last filled input
    const lastIndex = digits.length - 1;
    if (inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex]!.focus();
      handleSubmit(newOtp.join(""))
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  async function resendCode() {
    try {
      const email = await secureLocalStorage.getItem('@EMAIL')
      const result = await AuthService.sendPasswordOtp({ email });
      if (result?.data?.success) {
        toast.success("Code sent!");
      } else {
        toast.error(result?.data?.message ?? "There was a problem trying to send the code.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "There was a problem trying to send the code.");
    }
  };

  async function handleSubmit(newOtp: string = "") {
    try {
      const email = await secureLocalStorage.getItem('@EMAIL')
      const result = await AuthService.validateOtp({ email, otp: newOtp?.length > 0 ? newOtp : otp.join("") });
      if (result?.data?.success) {
        toast.success("OTP verified successfully!");
        await secureLocalStorage.setItem('@RESETID', result?.data?.data)
        router.push("/auth/reset-password");
      } else {
        toast.error(result?.data?.message ?? "There was a problem trying to verify the code. Please check the typed code!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "There was a problem trying to verify the code. Please check the typed code!");
    }
  };

  return (
    <div className="bg-dark px-4 dark:bg-dark-2 sm:px-8">
      <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="no-scrollbar overflow-y-auto py-20">
          <div className="mx-auto w-full">
            <div className="text-center">
              <div className="bg-white p-4 shadow-card-10 dark:bg-gray-dark lg:p-7.5 xl:p-12.5">
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
                    Verify Your Account
                  </p>
                </div>
                <p className="mb-7.5 font-lught text-dark-4 dark:text-dark-6">
                  Enter the 6 digit code sent to the registered email id.
                </p>

                <form>
                  <div className="flex items-center gap-4.5">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(el) => {
                          inputsRef.current[index] = el;
                        }}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="h-12.5 w-12 rounded-md border-[1.5px] border-stroke bg-transparent text-center text-2xl text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      />
                    ))}
                  </div>
                  <p className="mb-5 mt-4 text-left font-medium text-dark dark:text-white">
                    Did not receive a code?{" "}
                    <button className="text-primary" type="button" onClick={resendCode}>Resend</button>
                  </p>
                  <button type="button" onClick={() => { handleSubmit("") }} className="flex w-full justify-center bg-dark p-[13px] font-bold text-gray hover:bg-opacity-90">
                    Verify
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
