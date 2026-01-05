"use client"
import React from 'react';
import { useRouter } from "next/navigation";
// assets & project imports
import { CirclePlusIcon } from "@/assets/icons";
import Table from "@/components/table";
import WebsiteService from '@/services/website';
import toast from "react-hot-toast";
import { Alert } from "@/components/alert";

const tableHeader = [
    {
        accessorKey: "id",
    },
    {
        header: "Slug",
        accessorKey: "slug",
    },
    {
        header: "Title",
        accessorKey: "title",
    },
    {
        header: "Date Created",
        accessorKey: "created_at",
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

const PagesList = () => {
    const router = useRouter();
    const [modalDelete, setModalDelete] = React.useState<boolean>(false);

    const [data, setData] = React.useState<any[]>([]);
    const [meta, setMeta] = React.useState<any>({ total: 0, last_page: 1 });
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [selectedId, setSelectedId] = React.useState<string>('');

    // Sidebar logic state (equivalent to the 'open' prop in your styled component)
    const [drawerOpen] = React.useState(false);

    async function getData(page: number = 1, page_size: number = 10) {
        setLoading(true);
        try {
            let params: any = {
                page: page === 0 ? 1 : page,
                page_size: page_size
            };

            const result: any = await WebsiteService.getPages(params);
            setMeta({
                total: result?.data?.meta?.total,
                last_page: result?.data?.meta?.last_page,
            })

            const tableHeaders = tableHeader.map((header: any) => header.id);
            const newList: any = JSON.parse(JSON.stringify(result?.data?.data));

            newList.forEach((el: any) => {
                Object.keys(el).forEach((item) => {
                    if (!tableHeaders.includes(item)) delete el[item];
                });
            });

            //const sortedList = newList.map((el: any) => sortObjectKeys(el, tableHeaders));
            setError(null);
            setData(newList);
        } catch (err: any) {
            setError(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    async function deleteData(id: string) {
        setLoading(true);
        try {
            const result: any = await WebsiteService.deletePage(id);
            if (result?.data?.success) {
                toast.success("The page was removed successfully!")
            }
            await getData();
        } catch (err: any) {
            toast.error(err?.response?.data?.message ?? "There was a problem trying to remove the article. Please retry again!");
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getData();
    }, []);

    const RenderTableHeader = () => {
        return (
            <>
                <div className="flex justify-between px-7.5 py-4.5">
                    <div className="relative z-20 w-full max-w-[414px]">
                    </div>
                    <button
                        className="flex justify-center items-center gap-1  bg-dark px-4 py-[8px] font-medium text-gray-2 hover:shadow-1 dark:border-dark-3 dark:text-white"
                        type="button"
                        onClick={() => { router.push(`/website/add`) }}
                    >
                        <CirclePlusIcon />
                        Add New Article
                    </button>
                </div>
            </>
        )
    }


    return (
        <div className="w-full">

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
                    onEdit={(id: string) => { router.push(`/news/articles/${id}`) }}
                    onDelete={(id: string) => {
                        setSelectedId(id)
                        setModalDelete(true)
                    }}
                />
            </div>
        </div>
    );
}

PagesList.Layout = "authGuard";
export default PagesList;