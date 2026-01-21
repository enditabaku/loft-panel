"use client";
import React, { useState } from "react";
import BlogCategoryService from "@/services/blog/category";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ImageUploaderCrop from "@/app/(site)/website/add/ImageUploaderCrop";

const AddConnector = () => {
  const [data, setData] = useState<any>({
    name: "",
  });

  const [file, setFile] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (e: any) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
  };

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await BlogCategoryService.createCategory(data);
      if (result?.data?.success) {
        toast.success("Category created successfully");
        router.push("/news/category");
      } else {
        toast.error(result?.data?.message ?? "There was a problem trying to create the category. Please check all fields!");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "There was a problem trying to create the category. Please check all fields!");
    } finally {
      setLoading(false);
    }
  }
  
  const handleUpdate = (value: any) => {
    console.log(value)
  };


  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Modify Staff Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={submitForm}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={data?.name}
                        onChange={(e) => handleChange?.(e)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="surname"
                    >
                      Surname
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="surname"
                        id="surname"
                        defaultValue={data?.surname}
                        onChange={(e) => handleChange?.(e)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="position"
                    >
                      Position
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="position"
                        id="position"
                        defaultValue={data?.position}
                        onChange={(e) => handleChange?.(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full" style={{flex: 1}}>
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="photo"
                    >
                      Photo
                    </label>
                    <div className="relative">
                      <ImageUploaderCrop aspect={6/6} setImage={(img: any) => {handleUpdate(img)}} />
                    </div>
                  </div>
                  <div style={{flex: 3}}></div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center  border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="button"
                    onClick={() => {router.push('/staff')}}
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
        </div>
      </div>
    </>
  );
};

export default AddConnector;
