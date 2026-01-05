"use client";
import {
  CallIcon,
  EmailIcon,
  UserIcon,
  EyeIcon
} from "@/assets/icons";
import useAuth from "@/hooks/use-auth";
import React, { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import toast from "react-hot-toast";
import UserService from "@/services/user";

const AccountProfile = () => {
  const { user } = useAuth();

  const [data, setData] = useState(user);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    if (e.target.name === "profilePhoto") {
      const file = e.target?.files[0];
      setData({
        ...data,
        profilePhoto: file && URL.createObjectURL(file),
      });
      setFile(file);
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    try {
      const body = {
        password: data?.password,
        password_confirmation: data?.password_confirmation,
        current_password: data?.current_password
      }
      const result: any = await UserService.updatePassword(body);
      if (result?.data?.success) {
        toast.success("Password changed successfully!");
        //setData(user)
      } else {
        toast.error(result?.data?.message ?? "There was a problem trying to update the password. Please check all fields!");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "There was a problem trying to update the password. Please check all fields!");
    } finally{ 
      setLoading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={() => { }}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="first_name"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <UserIcon />
                      </span>
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="first_name"
                        id="first_name"
                        defaultValue={user?.first_name}
                        onChange={(e) => handleChange?.(e)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="last_name"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <UserIcon />
                      </span>
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="last_name"
                        id="last_name"
                        defaultValue={user?.last_name}
                        onChange={(e) => handleChange?.(e)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <CallIcon />
                      </span>

                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="+990 3343 7865"
                        defaultValue={user?.phone}
                        onChange={handleChange}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <EmailIcon />
                      </span>
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="email"
                        id="email"
                        defaultValue={user?.email}
                        onChange={(e) => handleChange?.(e)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="registration_type"
                    >
                      Registration Type
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <UserIcon />
                      </span>
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="registration_type"
                        id="registration_type"
                        defaultValue={user?.registration_type}
                        onChange={(e) => handleChange?.(e)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="profile"
                    >
                      Role
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="profile"
                        id="profile"
                        defaultValue={user?.profile}
                        onChange={handleChange}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center  border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center  bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    type="submit"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        Saving{" "}
                        <span
                          className={`h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-dark dark:border-t-transparent`}
                        ></span>
                      </span>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
        {/* <div className="col-span-5 xl:col-span-2">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Your Photo
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={() => { }}>
                <div className="mb-4 flex items-center gap-3">
                  <Image
                    src={data.profilePhoto}
                    width={55}
                    height={55}
                    alt="User"
                    className="size-14 rounded-full object-cover"
                    quality={90}
                  />

                  <div>
                    <span className="mb-1.5 font-medium text-dark dark:text-white">
                      Edit your photo
                    </span>
                    <span className="flex gap-3">
                      <button
                        type="button"
                        className="text-body-sm hover:text-red"
                      >
                        Delete
                      </button>
                      <button className="text-body-sm hover:text-primary">
                        Update
                      </button>
                    </span>
                  </div>
                </div>

                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
                >
                  <input
                    type="file"
                    name="profilePhoto"
                    id="profilePhoto"
                    onChange={handleChange}
                    accept="image/png, image/jpg, image/jpeg"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                      <UploadIcon />
                    </div>
                    <p className="mt-2.5 text-body-sm font-medium">
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="mt-1 text-body-xs">
                      SVG, PNG, JPG or GIF (max, 800 X 800px)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center  border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex items-center justify-center  bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    type="submit"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        Saving{" "}
                        <span className="inline-block size-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-dark dark:border-t-transparent" />
                      </span>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}
        {user?.profile == "companyAdmin" && (
          <div className="col-span-12 xl:col-span-12">
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
                <h3 className="font-medium text-dark dark:text-white">
                  Company Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={() => { }}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="name"
                          id="name"
                          defaultValue={user?.company?.name}
                          onChange={(e) => handleChange?.(e)}
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                        htmlFor="nipt"
                      >
                        NIPT
                      </label>
                      <div className="relative">
                        <input
                          className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="nipt"
                          id="nipt"
                          defaultValue={user?.company?.nipt}
                          onChange={(e) => handleChange?.(e)}
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <div className="relative">
                        <input
                          className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="address"
                          id="address"
                          placeholder="+990 3343 7865"
                          defaultValue={user?.company?.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center  border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center  bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    type="submit"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        Saving{" "}
                        <span
                          className={`h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-dark dark:border-t-transparent`}
                        ></span>
                      </span>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div> */}
                </form>
              </div>
            </div>
          </div>
        )}


        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Password
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={changePassword}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <div className="relative">
                      <InputGroup
                        type="password"
                        label="Current Password"
                        className="mb-5 [&_input]:py-[15px]"
                        placeholder="Enter your current password"
                        name="current_password"
                        handleChange={(e) => handleChange?.(e)}
                        icon={<EyeIcon />}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="relative">
                      <InputGroup
                        type="password"
                        label="New Password"
                        className="mb-5 [&_input]:py-[15px]"
                        placeholder="Enter your current password"
                        name="password"
                        handleChange={(e) => handleChange?.(e)}
                        icon={<EyeIcon />}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="relative">
                      <InputGroup
                        type="password"
                        label="Confirm New Password"
                        className="mb-5 [&_input]:py-[15px]"
                        placeholder="Confirm your new password"
                        name="password_confirmation"
                        handleChange={(e) => handleChange?.(e)}
                        icon={<EyeIcon />}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center  border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center  bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    type="submit"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        Saving{" "}
                        <span
                          className={`h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-dark dark:border-t-transparent`}
                        ></span>
                      </span>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountProfile;
