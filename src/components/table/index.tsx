"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/assets/icons";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { HeaderType } from "@/types/table";
import { PreviewIcon, TrashIcon, PencilSquareIcon } from "./icons";
import { paginationRange } from "./pagination";
import { BadgeTwo } from "../Badges/BadgeTwo";
import { renderVariant } from "@/lib/utils";
import Image from "next/image";

interface TableProps {
    tableHeader: ColumnDef<any>[],
    data: any[],
    getData: any,
    tableActions: HeaderType[],
    RenderTableHeader: any,
    hasPagination: boolean,
    meta: any,
    onView?: any,
    onEdit?: any,
    onDelete?: any,
    onTransfer?: any,
    onPreview?: any,
    hasMultiselect?: boolean,
    onSelectionChange?: (rows: any[]) => void,
    loading: boolean
}

export default function Table({
    tableHeader,
    data,
    getData,
    tableActions,
    RenderTableHeader,
    hasPagination,
    meta,
    onView,
    onEdit,
    onDelete,
    onTransfer,
    onPreview,
    hasMultiselect,
    onSelectionChange,
    loading = false
}: TableProps) {
    const [page, setPage] = useState<number>(0);
    const [filteredData, setFilteredData] = useState<any[]>(data);
    const [rowsPerPage, setRowsPerPage] = useState<number>(50);
    const [rowSelection, setRowSelection] = useState<any>({});

    const selectionColumn: ColumnDef<any> = {
        id: "select",
        header: () => (<></>),
        cell: () => (<></>),
    };

    const finalColumns = [selectionColumn, ...tableHeader];

    const table = useReactTable({
        data: filteredData,
        columns: hasMultiselect ? finalColumns : tableHeader,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableRowSelection: hasMultiselect,
        state: { rowSelection },
        onRowSelectionChange: setRowSelection,
        getRowId: (row) => row.id,
    });

    useEffect(() => {
        getData(page + 1, rowsPerPage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage])

    useEffect(() => {
        const tableHeaders = [...tableHeader].map((header: any) => header?.accessorKey);
        const newList = data?.map((el: any) => {
            const ordered: any = {};
            tableHeaders.forEach((key) => {
                if (Object.prototype.hasOwnProperty.call(el, key)) {
                    ordered[key] = el[key];
                }
            });
            return ordered;
        });
        setFilteredData(newList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (hasMultiselect) {
            const selectedRows = table.getSelectedRowModel().flatRows.map(r => r.original);
            onSelectionChange?.(selectedRows);
        }
    }, [rowSelection]);

    useEffect(() => {
        table.setPageSize(rowsPerPage);
    }, [rowsPerPage, table]);


    return (
        <section className="data-table-common data-table-two rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <RenderTableHeader />
            <div className="grid grid-cols-1 overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center w-full h-24 mt-4">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <table className="datatable-table !border-collapse px-4 md:px-8">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup: any) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header: any) => {
                                        const headerKey = header.id;
                                        if (headerKey == 'id') {
                                            return;
                                        }
                                        return (
                                            <th
                                                key={headerKey}
                                                className="cursor-pointer"
                                            >
                                                <div className="flex items-center">
                                                    <span>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>

                        <tbody>
                            {table.getRowModel().rows.length === 0 && (
                                <tr>
                                    <td colSpan={tableHeader.length} className="py-12 text-center">
                                        There's nothing here...
                                    </td>
                                </tr>
                            )}

                            {table.getRowModel().rows.map((row: any) => {
                                return (
                                    <tr key={row?.original.id}
                                        onClick={row.getToggleSelectedHandler()}
                                    >
                                        {/* Checkbox cell */}
                                        {hasMultiselect && (
                                            <td className="px-3 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={row.getIsSelected()}
                                                    disabled={!row.getCanSelect()}
                                                    onChange={row.getToggleSelectedHandler()}
                                                    className="
                                                        cursor-pointer
                                                        w-4 h-4
                                                        accent-primary
                                                        rounded-md
                                                        border-2 border-gray-300
                                                        checked:border-primary
                                                        checked:bg-primary
                                                        disabled:opacity-50
                                                    "
                                                />
                                            </td>
                                        )}
                                        {Object.entries(row.original).map(([key, value]: any) => {
                                            if (key == 'id') return;
                                            if (key == 'status') return (
                                                <td key={key} className="content-center">
                                                    <BadgeTwo variant={renderVariant(String(value))}>
                                                        {typeof value == 'boolean' ? (value ? 'active' : 'deactive') : String(value)}
                                                    </BadgeTwo>
                                                </td>
                                            )
                                            if (key == 'image') return (
                                                <td key={key} className="content-center">
                                                    {value ? (
                                                        <Image src={String(value)} width={48} height={48} alt="image" className="rounded-full h-12 w-12" />
                                                    ) : "--"}
                                                </td>
                                            )
                                            return (
                                                <td key={key} className="content-center">
                                                    {value ? String(value) : "--"}
                                                </td>
                                            )
                                        })}
                                        {tableActions?.length > 0 && (
                                            <td className="content-center">
                                                <div className="flex items-center justify-start gap-x-3.5">
                                                    {tableActions?.map((action: any) => {
                                                        if (action.name == 'view') {
                                                            return (
                                                                <button key="view" className="hover:text-primary" onClick={() => { onView(row?.original.id) }}>
                                                                    <span className="sr-only">{action.label}</span>
                                                                    <PreviewIcon fill="#a6ed46" />
                                                                </button>
                                                            )
                                                        }
                                                        if (action.name == 'edit') {
                                                            return (
                                                                <button key="edit" className="hover:text-primary" onClick={() => { onEdit(row?.original.id) }}>
                                                                    <span className="sr-only">{action.label}</span>
                                                                    <PencilSquareIcon fill="#38bdf8" />
                                                                </button>
                                                            )
                                                        }
                                                        if (action.name == 'delete') {
                                                            return (
                                                                <button key="delete" className="hover:text-primary" onClick={() => { onDelete(row?.original.id) }}>
                                                                    <span className="sr-only">{action.label}</span>
                                                                    <TrashIcon fill="#DC2626" />
                                                                </button>
                                                            )
                                                        }
                                                        return;
                                                    })}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            {hasPagination && (
                <div className="flex items-center justify-between px-6 py-5">
                    <p className="font-medium">
                        Total {meta?.total ?? 0} entries
                    </p>

                    <div className="flex items-center font-medium">
                        <p className="pl-2 text-dark dark:text-current">Per Page:</p>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                            className="bg-transparent pl-2.5"
                        >
                            {[10, 20, 50, 100].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex">
                        <button
                            className="flex cursor-pointer items-center justify-center rounded-[3px] p-[7px] px-[7px] hover:bg-primary hover:text-white disabled:opacity-50"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft width={18} height={18} />
                        </button>

                        {paginationRange({ meta, table }).map((current_page, i) => {
                            if (typeof current_page === "string") {
                                return (
                                    <span key={i} className="mx-1 px-2 text-gray-500">...</span>
                                );
                            }

                            return (
                                <button
                                    key={current_page}
                                    onClick={() => setPage(current_page)}
                                    className={`${page === current_page &&
                                        "bg-primary text-white"
                                        } mx-1 flex cursor-pointer items-center justify-center rounded-[3px] p-1.5 px-[15px] hover:bg-primary hover:text-white`}
                                >
                                    {current_page + 1}
                                </button>
                            );
                        })}


                        <button
                            className="flex cursor-pointer items-center justify-center rounded-[3px] p-[7px] px-[7px] hover:bg-primary hover:text-white disabled:opacity-50"
                            onClick={() => setPage(page + 1)}
                            disabled={(meta?.last_page == page || meta?.last_page == 1)}
                        >
                            <ChevronRight width={18} height={18} />
                        </button>
                    </div>
                </div>
            )}

        </section>
    );
}
