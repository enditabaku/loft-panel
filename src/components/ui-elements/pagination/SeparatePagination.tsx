import { generatePageNumbers } from "@/lib/generate-page-numbers";
import Link from "next/link";
import React from "react";
import { Ellipsis } from "./icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "@/assets/icons";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    total: number;
    rowsPerPage: number;
    setPage: any;
    setRowsPerPage: any;
    getData: any;
}

export default function SeparatePagination({
    currentPage,
    totalPages,
    total,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    getData
}: PaginationProps) {
    const isMobile = useIsMobile();
    return (
        <nav className={`flex justify-between px-6 py-5 ${isMobile ? 'flex-col gap-2 items-start' : 'items-center'}`}>
            <p className="font-medium">
                Total {total} entries
            </p>

            <div className="flex items-center font-medium">
                <p className="pl-2 text-dark dark:text-current">Per Page:</p>
                <select
                    value={rowsPerPage}
                    onChange={(e) => { getData(currentPage, Number(e.target.value)); setRowsPerPage(Number(e.target.value)) }}
                    className="bg-transparent pl-2.5"
                >
                    {[10, 20, 50, 100].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <ul className="inline-flex flex-wrap items-center gap-2 rounded-[5px] bg-white p-2.5 shadow-card-5 dark:bg-dark-2 dark:shadow-card">
                {/* Previous Button */}
                <li>
                    <Link
                        href=""
                        onClick={() => { getData(currentPage - 1, rowsPerPage); setPage(currentPage - 1) }}
                    >
                        <ChevronLeft width={18} />
                    </Link>
                </li>

                {generatePageNumbers(totalPages, currentPage).map((page, index) => (
                    <li key={index}>
                        {typeof page === "number" ? (
                            <Link
                                href=""
                                onClick={() => { getData(page, rowsPerPage); setPage(page) }}
                                className={`flex items-center justify-center rounded-[3px] px-[7px] font-medium hover:bg-primary hover:text-white ${currentPage === page ? "bg-primary text-white" : ""
                                    }`}
                            >
                                {page}
                            </Link>
                        ) : (
                            <span className="flex items-center justify-center rounded-[3px] px-[7px] font-medium">
                                <Ellipsis />
                            </span>
                        )}
                    </li>
                ))}

                <li>
                    <Link
                        href=""
                        onClick={() => { getData(currentPage + 1, rowsPerPage); setPage(currentPage + 1) }}
                    >
                        <ChevronRight width={18} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

type NavigationLinkProps = {
    children: React.ReactNode;
    disabled?: boolean;
    onClick: any
};

function NavigationLink({ children, disabled, onClick, ...props }: NavigationLinkProps) {
    return (
        <Link
            className="flex items-center justify-center rounded-[3px] bg-[#EDEFF1] px-2.5 py-1 text-xs font-medium text-dark hover:bg-primary hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:bg-dark-4 dark:text-white dark:hover:bg-primary dark:hover:text-white"
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : undefined}
            href=""
            {...props}
        >
            {children}
        </Link>
    );
}
