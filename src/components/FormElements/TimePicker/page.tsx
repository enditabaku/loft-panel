"use client";

import flatpickr from "flatpickr";
import { useEffect, useRef } from "react";
import { CircleCloseIcon, GlobeIcon } from "@/assets/icons";

type Props = {
  label: string;
  onTimeChange?: (time: string) => void;
  minTime?: string; // optional min time, e.g., "09:00"
  maxTime?: string; // optional max time, e.g., "18:00"
  defaultTime?: string;
}

const TimePickerOne = ({ label, onTimeChange, minTime, maxTime, defaultTime }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      fpRef.current = flatpickr(inputRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i", // 24-hour format
        time_24hr: true,
        minTime: minTime,
        maxTime: maxTime,
        allowInput: true,
        defaultDate: defaultTime ?? "12:00",
        onChange: (selectedDates, timeStr) => {
          if (onTimeChange) onTimeChange(timeStr);
        },
      });
    }

    return () => {
      fpRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTimeChange]);

  // Update min/max time dynamically
  useEffect(() => {
    if (fpRef.current) {
      fpRef.current.set("minTime", minTime || undefined);
      fpRef.current.set("maxTime", maxTime || undefined);
    }
  }, [minTime, maxTime]);

  const handleClear = () => {
    if (fpRef.current) fpRef.current.clear();
    if (onTimeChange) onTimeChange("");
  };

  return (
    <div className="w-full">
      <div className="relative">
        <input
          ref={inputRef}
          className="form-datepicker w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
          placeholder={label}
        />

        <div className="pointer-events-none absolute inset-0 left-auto right-10 flex items-center">
          <GlobeIcon className="size-5 text-[#9CA3AF]" />
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-0 left-auto right-2 flex items-center text-red-400 hover:text-red-500"
        >
          <CircleCloseIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default TimePickerOne;
