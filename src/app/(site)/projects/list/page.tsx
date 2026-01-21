"use client"
import React, { useState, useRef, useEffect } from "react";
// assets
import { CirclePlusIcon, WarningIcon } from "@/assets/icons";
// components
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Table from "@/components/table";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Alert } from "@/components/alert";
import toast from "react-hot-toast";
// api
import ProjectsListService from "@/services/projects";

const tableHeader = [
  {
    accessorKey: "id",
  },
  {
    header: "Project Name",
    accessorKey: "name",
  },
  {
    header: "Client",
    accessorKey: "client",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Completion Date",
    accessorKey: "completion_date",
  },
  {
    header: "Year",
    accessorKey: "year",
  },
  {
    header: "Date Created",
    accessorKey: "created_at",
  },
  {
    header: "Last Updated At",
    accessorKey: "updated_at",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Actions",
    accessorKey: "actions",
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

export default function ProjectsList() {
  const [search, setSearch] = useState("");
  const searchRef = useRef<any>(null);
  const router = useRouter();
  const [modalDelete, setModalDelete] = useState<boolean>(false);

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [meta, setMeta] = useState<any>({ total: 0, last_page: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');

  async function getData(page: number = 1, page_size: number = 50) {
    setIsLoading(true)
    try {
      const body: any = {
        page,
        page_size
      }
      if (search) { body.search = search }
      const result = await ProjectsListService.getList(body);
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
            onClick={() => { router.push(`/projects/list/add`) }}
          >
            <CirclePlusIcon />
            Add New Project
          </button>
        </div>
      </>
    )
  }

  async function deleteProjectRecord() {
    setIsLoading(true)
    try {
      const result = await ProjectsListService.deleteProject(selectedId);
      if (result?.data?.success) {
        toast.success("The project was removed successfully!")
        setModalDelete(false)
        await getData();
      } else {
        toast.error(result?.data?.message ?? "There was a problem trying to remove the project. Please retry again!");
      }
    } catch (stsError: any) {
      toast.error(stsError?.response?.data?.message ?? "There was a problem trying to remove the project. Please retry again!");
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <>
      <Breadcrumb pageName="Projects List" />

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
          onEdit={(id: string) => { router.push(`/projects/list/${id}`) }}
          onDelete={(id: string) => {
            setSelectedId(id)
            setModalDelete(true)
          }}
        />
      </div>

      <Modal
        open={modalDelete}
        onClose={() => setModalDelete(false)}
        className="max-h-fit w-full max-w-[550px] rounded-[15px] bg-white px-8 py-12 text-center shadow-3 dark:bg-gray-dark dark:shadow-card md:px-15 md:py-15"
      >
        <span className="mx-auto flex h-15 w-full max-w-15 items-center justify-center rounded-full bg-[#DC2626] bg-opacity-10 text-[#DC2626]">
          <WarningIcon />
        </span>
        <h3 className="mt-5.5 mb-4 pb-2 text-xl font-bold text-dark dark:text-white sm:text-2xl">
          Are you sure you want to delete this project?
        </h3>
        <div className="-mx-2.5 flex flex-wrap gap-y-4">
          <div className="w-full px-2.5 2xsm:w-1/2">
            <button
              onClick={() => setModalDelete(false)}
              className="block w-full rounded-[7px] border border-stroke bg-gray-2 p-[11px] text-center font-medium text-dark transition hover:border-gray-3 hover:bg-gray-3 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:border-dark-4 dark:hover:bg-dark-4"
            >
              Cancel
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              className="block w-full rounded-[7px] border border-[#DC2626] bg-[#DC2626] p-[11px] text-center font-medium text-white transition hover:bg-opacity-90"
              onClick={() => {deleteProjectRecord()}}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
