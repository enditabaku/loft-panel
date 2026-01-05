'use client'
import { BoltIcon } from "../../icons";
import {
  DollarIcon
} from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { currency } from "@/config";
import { Role } from "@/types/user/role";

type PropsType = {
    className?: string;
    data: any,
    role: Role
};

export default function PowerConsumptionCard({
    className,
    data,
    role
}: PropsType) {
    const isMobile = useIsMobile();
    const router = useRouter();
    return (
        <div
            className={cn(
                "grid grid-rows-[auto_1fr] gap-9",
                isMobile ? "grid-cols-1" : "grid-cols-2",
                className,
            )}
        >
            <div
                className="rounded-[10px] bg-white w-full shadow-1 bg-cover bg-no-repeat dark:bg-gray-dark dark:shadow-card p-2 md:p-4 xl:p-6"
                style={{
                    backgroundImage: "url('/images/icon/lights-bg.png')"
                }}
                onClick={() => {
                    if(role == Role.SuperAdmin) {router.push('/tower-stations/sessions-cost')}
                    else {router.push('/tower-stations/sessions')}
                }}
            >
                <h6 className="mb-6 text-heading-6 font-bold text-dark dark:text-white">
                    Total Sessions Costs
                </h6>
                <div className="flex items-center gap-1 my-6 mt-10 justify-center w-full">
                    <div>
                        <BoltIcon width={70} height={70} color='#22d6a9' />
                    </div>
                    <div>
                        <h2 className="font-bold text-heading-3">{data?.total_session_costs ?? 0}</h2>
                    </div>
                    <div>
                        <span className="font-bold ms-1 text-heading-6">{currency}</span>
                    </div>
                </div>
                <div className={`flex justify-between ${isMobile ? 'flex-col' : 'flex-row'}`}>
                    <div className="flex items-center gap-1 mt-6 justify-center w-full">
                        <div>
                            <DollarIcon width={30} height={30} color='#ed891dff' />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Gross Value: {data?.total_session_costs ?? 0} {currency}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mt-6 justify-center w-full">
                        <div>
                            <DollarIcon width={30} height={30} color='#22d652ff' />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Net Value: {data?.total_session_costs_net ?? 0} {currency}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-7.5 cursor-pointer hover:scale-105 hover:-translate-y-1 duration-300 transition ease-in-out delay-150"
            >
                <div className="flex flex-col items-start justify-between h-full">
                        <h6 className="mb-2 text-heading-6 font-bold text-dark dark:text-white">
                           Energy Consumption
                        </h6>
                        <div className="flex items-center gap-1 justify-start w-full">
                            <div>
                                <BoltIcon width={70} height={70} color='#22d6a9' />
                            </div>
                            <div>
                                <h2 className="font-bold text-heading-3">{data?.total_energy_consumption ?? 0}</h2>
                            </div>
                            <div>
                                <span className="font-bold ms-1 text-heading-6">kWh</span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}