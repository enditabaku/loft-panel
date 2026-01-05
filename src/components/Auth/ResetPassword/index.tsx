"use client";
import { PasswordIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AuthService from "@/services/auth";
import secureLocalStorage from "react-secure-storage";

export default function ResetPassword() {
  const [data, setData] = useState({
    newPassword: "",
    ReNewPassword: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.newPassword === "") {
      toast.error("Please enter your password.");
      return;
    }

    try {
      const reset_id = await secureLocalStorage.getItem('@RESETID')
      const result = await AuthService.resetPassword({
        reset_id: reset_id,
        password: data?.newPassword,
        password_confirmation: data?.ReNewPassword
      });
      if (result?.data?.success) {
        setData({ newPassword: "", ReNewPassword: "" });
        toast.success("Password changed successfully! You can now login with your new password.");
        router.push("/auth/login");
      } else {
        return toast.error(result?.data?.message ?? "There was a problem trying to update the password. Please check again the fields!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "There was a problem trying to update the password. Please check again the fields!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup
          type="password"
          label=""
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Enter your new password"
          name="newPassword"
          handleChange={handleChange}
          value={data.newPassword}
          icon={<PasswordIcon />}
        />

        <InputGroup
          type="password"
          label=""
          className="mb-6 [&_input]:py-[15px]"
          placeholder="Re-enter your new password"
          name="ReNewPassword"
          handleChange={handleChange}
          value={data.ReNewPassword}
          icon={<PasswordIcon />}
        />

        <div className="mb-5">
          <button
            type="submit"
            className="w-full cursor-pointer bg-dark p-4 font-medium text-white transition hover:bg-opacity-90"
          >
            Create Password
          </button>
        </div>

        <div className="mt-4.5 text-center font-medium">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
