'use client'
import { useRouter } from "next/navigation";

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        {pageName}
      </h1>

      <nav aria-label="breadcrumb">
        <ol className="flex items-center gap-2 font-medium">
          <li onClick={() => {router.push('/dashboard')}} className="cursor-pointer">Dashboard</li>

          <li aria-hidden role="presentation">
            /
          </li>

          <li className="text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
