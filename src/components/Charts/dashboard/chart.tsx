"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type PropsType = {
  failed: number;
  success: number;
};

export function SessionsOverviewChart({ failed, success }: PropsType) {
  const isMobile = useIsMobile();

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        horizontal: false, // set true if you want horizontal bars
        columnWidth: "40%",
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    grid: {
      strokeDashArray: 5,
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: ["Sessions"],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { fontSize: "12px" } },
    },
    colors: ["#ce0808ff", "#a6ed46ff"],
    tooltip: { shared: true, intersect: false },
    legend: { show: false },
    stroke: {
      width: isMobile ? 2 : 3,
      colors: ["transparent"],
    },
  };

  return (
    <div className="h-[310px]">
      <Chart
        options={options}
        series={[
          {
            name: "Stopped",
            data: [failed],   // 20
          },
          {
            name: "Started",
            data: [success],  // 10
          },
        ]}
        type="bar"
        height={310}
      />
    </div>
  );
}
