'use client'
import { useRouter } from "next/navigation";
import {
  UserIcon
} from "@/assets/icons";

export default function UsersCards({data}: any) {
  const router = useRouter();
  const dataStatsList = [
  {
    title: "All Users",
    value: data?.total ?? 0
  },
  {
    title: "SuperAdmin Users",
    value: data?.super_admins ?? 0
  },
  {
    title: "All Companies",
    value: data?.companies ?? 0
  },
  {
    title: "Total Clients",
    value: data?.clients ?? 0
  },
  {
    title: "Total Fleet Users",
    value: data?.fleet_users ?? 0
  }
  ];

  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 md:gap-6 2xl:gap-7.5`}>
      {dataStatsList.map((item, index) => (
        <div
          key={index}
          className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-7.5 cursor-pointer hover:scale-105 hover:-translate-y-1 duration-300 transition ease-in-out delay-150"
          onClick={() => {router.push('/users/system')}}
        >
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-heading-5 font-bold text-dark dark:text-white flex items-center gap-2">
                <UserIcon /> {item.value}
              </h3>
              <p className="font-medium">{item.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}