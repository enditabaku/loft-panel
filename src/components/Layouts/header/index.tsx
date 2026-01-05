"use client";

import { MenuIcon } from "@/assets/icons";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className=" border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#030303] hover:dark:bg-[#FFFFFF1A]"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>
      <div className="max-xl:hidden ms-4">
        <p className="font-medium">LOFT Architects</p>
      </div>

      <div className="ml-auto flex items-center gap-2 min-[375px]:gap-4">
        {/* <ThemeToggleSwitch /> */}
        <UserInfo />
      </div>
    </header>
  );
}
