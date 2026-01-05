// import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { Role } from "@/types/user/role";
import { DonutChart } from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
  data: any
};

export async function UsedDevices({
  timeFrame = "monthly",
  className,
  data
}: PropsType) {

  const dataStatsList = [
  {
    name: "Super Admin",
    amount: data?.super_admins ?? 0
  },
  {
    name: "Company Admin",
    amount: data?.company_admins ?? 0
  },
  {
    name: "Clients",
    amount: data?.clients ?? 0
  },
  {
    name: "Fleet Users",
    amount: data?.fleet_users ?? 0
  }
  ];
  return (
    <div
      className={cn(
        "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Total Users
        </h2>

        {/* <PeriodPicker defaultValue={timeFrame} sectionKey="used_devices" /> */}
      </div>

      <div className="grid place-items-center">
        <DonutChart data={dataStatsList} />
      </div>
    </div>
  );
}
