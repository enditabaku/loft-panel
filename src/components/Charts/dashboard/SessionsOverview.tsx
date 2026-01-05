import { cn } from "@/lib/utils";
import { SessionsOverviewChart } from "./chart";

type PropsType = {
  className?: string;
  data: any
};

export function SessionssOverview({
  className,
  data
}: PropsType) {
  
  return (
    <div
      className={cn(
        "grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Sessions Overview
        </h2>
      </div>

      <SessionsOverviewChart failed={data?.total_stopped ?? 0} success={data?.total_started ?? 0}/>

      <dl className="grid divide-stroke text-center dark:divide-dark-3 sm:grid-cols-2 sm:divide-x [&>div]:flex [&>div]:flex-col-reverse [&>div]:gap-1">
        <div className="dark:border-dark-3 max-sm:mb-3 max-sm:border-b max-sm:pb-3">
          <dt className="text-xl font-bold text-dark dark:text-white">
            {data?.total_stopped}
          </dt>
          <dd className="font-medium dark:text-dark-6">Stopped Sessions</dd>
        </div>

        <div>
          <dt className="text-xl font-bold text-dark dark:text-white">
            {data?.total_started}
          </dt>
          <dd className="font-medium dark:text-dark-6">Started Succeded</dd>
        </div>
      </dl>
    </div>
  );
}
