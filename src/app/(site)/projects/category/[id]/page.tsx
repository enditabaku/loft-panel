"use client";
import React, { useState, useEffect } from "react";
import { imageToBase64 } from "@/lib/utils";
import ProjectsCategoryService from "@/services/projects/category";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import ImageUploaderCrop from "@/app/(site)/website/add/ImageUploaderCrop";
import { Alert } from "@/components/alert";

const CategoryDetails = () => {
  const pathname = useParams();
  const [file, setFile] = useState<string | undefined>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = async (e: any) => {
    if (e.target.name === "image") {
      const file = await imageToBase64(e.target?.files[0]);
      setData({
        ...data,
        image: file,
      });
      setFile(file);
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  async function getData() {
    setIsLoading(true)
    try {
      const result = await ProjectsCategoryService.getDetails(String(pathname?.id));
      if (result?.data?.success) {
        setData(result?.data?.data);
      } else {
        setError(result?.data?.message ?? "The category could not be fetched at the moment! Please try again!")
      }
    } catch (responseError: any) {
      setError(responseError?.response?.data?.message ?? "The category could not be fetched at the moment! Please try again!")
    } finally {
      setIsLoading(false)
    }
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await ProjectsCategoryService.updateCategory(String(pathname?.id), data);
      if (result?.data?.success) {
        toast.success("Category updated successfully");
        router.push("/projects/category");
      } else {
        toast.error(result?.data?.message ?? "There was a problem trying to update the category. Please check all fields!");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "There was a problem trying to update the category. Please check all fields!");
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdate = (value: any) => {
    console.log(value)
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {error && (
        <Alert
          variant="error"
          title={error}
          description=""
          className="mb-2"
        />
      )}
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Category Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={submitForm}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="name_en"
                    >
                      Name in EN
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="name_en"
                        id="name_en"
                        defaultValue={data?.name_en}
                        onChange={(e) => handleChange?.(e)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="name_sq"
                    >
                      Name in SQ
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="name_sq"
                        id="name_sq"
                        defaultValue={data?.name_sq}
                        onChange={(e) => handleChange?.(e)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="name_de"
                    >
                      Name in DE
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="name_de"
                        id="name_de"
                        defaultValue={data?.name_de}
                        onChange={(e) => handleChange?.(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="name_fr"
                    >
                      Name in FR
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="name_fr"
                        id="name_fr"
                        defaultValue={data?.name_fr}
                        onChange={(e) => handleChange?.(e)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="name_es"
                    >
                      Name in ES
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="name_es"
                        id="name_es"
                        defaultValue={data?.name_es}
                        onChange={(e) => handleChange?.(e)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="name_ar"
                    >
                      Name in AR
                    </label>
                    <div className="relative">
                      <input
                        className="w-full  border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="name_ar"
                        id="name_ar"
                        defaultValue={data?.name_ar}
                        onChange={(e) => handleChange?.(e)}
                      />
                    </div>
                  </div>
                </div>
                  <div className="w-full md:w-1/4">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="icon"
                    >
                      Icon
                    </label>
                    <div className="relative">
                      <ImageUploaderCrop aspect={6/6} setImage={(img: any) => {handleUpdate(img)}} />
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
                    {isLoading ? (
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

export default CategoryDetails;
