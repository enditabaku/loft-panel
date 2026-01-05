"use client";
import { EmailIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import AuthService from "@/services/auth";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email address.");
    }

    try {
      const result = await AuthService.sendPasswordOtp({ email });
      if (result?.data?.success) {
        await secureLocalStorage.setItem('@EMAIL', email)
        toast.success("OTP code sent successfully! Please check your inbox and find your code");
        setEmail("");
         router.push("/auth/two-step-verification");
      } else {
        toast.error(result?.data?.message ?? "There was a problem trying to send the email. Please check the typed email!");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message ?? "There was a problem trying to send the email. Please check the typed email!");
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup
          type="email"
          label=""
          placeholder="Enter your email"
          className="mb-6"
          name="email"
          value={email}
          handleChange={handleChange}
          icon={<EmailIcon />}
        />

        <div className="mb-4.5">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 bg-dark p-4 font-medium text-white transition hover:bg-opacity-90"
          >
            {loading ? (
              <>
                Sending
                <span
                  className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-dark dark:border-t-transparent`}
                ></span>
              </>
            ) : (
              "Send Password Reset Code"
            )}
          </button>
        </div>

        <div className="text-center font-medium">
          <p>
            Login to your account from{" "}
            <Link href="/auth/login" className="text-primary underline">
              here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
