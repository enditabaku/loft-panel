"use client";
import { EmailIcon, EyeIcon } from "@/assets/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import InputGroup from "../FormElements/InputGroup";
import useAuth from "@/hooks/use-auth";
import { Alert } from "../alert";

export default function SigninWithPassword() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const router = useRouter();
  const { signIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.email) {
      return toast.error("Please enter your email address.");
    }

    setLoading(true);
    try {
      await signIn(data?.email, data?.password).then(
        (event: any) => {
          if (event?.data?.success || event?.success) {
            toast.success("Logged in successfully");
            setLoading(false);
            router.push("/dashboard")
          } else {
            setLoading(false);
            setError(event?.message ?? "Something went wrong! Please try again!");
          }
        }
      )

    } catch (error: any) {
      setError(error?.message ?? "Something went wrong! Please try again!");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {error && (
        <Alert
          variant="error"
          title={error}
          description=""
        />
      )}
      <InputGroup
        type="email"
        label=""
        className="mb-4 mt-2 [&_input]:py-[15px]"
        placeholder="Enter your email"
        name="email"
        handleChange={handleChange}
        value={data?.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label=""
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data?.password}
        icon={<EyeIcon />}
      />

      <div className="mb-6 flex items-center justify-end gap-2 py-2 font-medium">
        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 bg-dark p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}
