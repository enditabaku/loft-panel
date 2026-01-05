"use client";

import { Calendar } from "@/components/Layouts/sidebar/icons";
import flatpickr from "flatpickr";
import { useEffect, useRef } from "react";
import { CircleCloseIcon } from "@/assets/icons";

type Props = {
  label: string,
  onDateChange?: (date: string) => void,
  minDate: string
}

const DatePickerOne = (params: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    // Init flatpickr
    if (inputRef.current) {
      fpRef.current = flatpickr(inputRef.current, {
        mode: "single",
        static: true,
        allowInput: true,
        monthSelectorType: "static",
        dateFormat: "Y-m-d",
        minDate: params.minDate || undefined,
        onChange: (selectedDates, dateStr) => {
          if (params.onDateChange) {
            params.onDateChange(dateStr);
          }
        },
      });
    }
    return () => {
      fpRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.onDateChange]);

    // update minDate dynamically instead of re-initializing
  useEffect(() => {
    if (fpRef.current) {
      fpRef.current.set("minDate", params.minDate || undefined);
    }
  }, [params.minDate]);

  const handleClear = () => {
    if (fpRef.current) {
      fpRef.current.clear(); // clears flatpickr value
    }
    if (params.onDateChange) {
      params.onDateChange(""); // reset in parent
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          ref={inputRef}
          className="form-datepicker w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
          placeholder={params?.label}
          data-class="flatpickr-right"
        />

        <div className="pointer-events-none absolute inset-0 left-auto right-10 flex items-center">
          <Calendar className="size-5 text-[#9CA3AF]" />
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

export default DatePickerOne;
