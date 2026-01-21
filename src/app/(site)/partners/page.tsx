"use client"
import React, { useState, useEffect } from "react";
// components
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Table from "@/components/table";
import { Alert } from "@/components/alert";
import { useRouter } from "next/navigation";
import { CirclePlusIcon } from "@/assets/icons";
// api
import PartnersService from "@/services/partners";

const tableHeader = [
  {
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "NIPT",
    accessorKey: "nipt",
  },
  {
    header: "Phone Number",
    accessorKey: "phone",
  },
];

const tableActions = [
  {
    name: "edit",
    label: "Edit"
  },
  {
    name: "delete",
    label: "Delete"
  }
]

export default function Partners() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [meta, setMeta] = useState<any>({ total: 0, last_page: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getData(page: number = 1, page_size: number = 50) {
    setIsLoading(true)
    try {
      const body: any = {
        page,
        page_size
      }
      const result = await PartnersService.getList(body);
      if (result?.data?.success) {
        setData(result?.data?.data)
        setMeta({
          total: result?.data?.meta?.total,
          last_page: result?.data?.meta?.last_page,
        })
      } else {
        setError(result?.data?.message ?? "The list could not be fetched at the moment! Please try again!")
      }
    } catch (responseError: any) {
      setError(responseError?.response?.data?.message ?? "The list could not be fetched at the moment! Please try again!")
    } finally {
      setIsLoading(false)
    }
  }

    const RenderTableHeader = () => {
        return (
            <>
                <div className="flex justify-between px-7.5 py-4.5">
                    <div className="relative z-20 w-full max-w-[414px]">
                    </div>
                    <button
                        className="flex justify-center items-center gap-1  bg-dark px-4 py-[8px] font-medium text-gray-2 hover:shadow-1 dark:border-dark-3 dark:text-white"
                        type="button"
                        onClick={() => { router.push(`/partners/add`) }}
                    >
                        <CirclePlusIcon />
                        Add New Partner
                    </button>
                </div>
            </>
        )
    }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Breadcrumb pageName="Partners" />

      <div className="grid grid-cols-1 gap-5 md:gap-7 2xl:gap-10">
        {error && (
          <Alert
            variant="error"
            title={error}
            description=""
          />
        )}
        <Table
          tableHeader={tableHeader}
          data={data ?? []}
          getData={getData}
          tableActions={tableActions}
          RenderTableHeader={RenderTableHeader}
          hasPagination={true}
          meta={meta}
          loading={isLoading}
          onEdit={(id: string) => { router.push(`/partners/edit/${id}`) }}
          onDelete={(id: string) => { }}
        />
      </div>
    </>
  );
}
