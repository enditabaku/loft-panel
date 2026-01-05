import { CheckIcon, XIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useId } from "react";

type PropsType = {
  checked?: boolean;
  withIcon?: "check" | "x";
  withBg?: boolean;
  label: string;
  name?: string;
  minimal?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  radius?: "default" | "md";
  classname: string;
  disabled?: boolean
};

export function Checkbox({
  checked = false,
  withIcon,
  label,
  name,
  withBg,
  minimal,
  onChange,
  radius,
  classname,
  disabled = false
}: PropsType) {
  const id = useId();

  return (
    <div className={`${classname}`}>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer select-none items-center",
          !minimal && "text-body-sm font-medium",
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            id={id}
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
            disabled={disabled}
          />

          <div
            className={cn(
              "mr-2 flex size-7 items-center justify-center rounded border border-dark-5 peer-checked:border-primary dark:border-dark-6 peer-checked:[&>*]:block",
              withBg
                ? "peer-checked:bg-primary [&>*]:text-white"
                : "peer-checked:bg-gray-2 dark:peer-checked:bg-transparent",
              minimal && "mr-3 border-stroke dark:border-dark-3",
              radius === "md" && "rounded-md",
            )}
          >
            {!withIcon && (
              <span className="hidden size-2.5 rounded-sm bg-primary" />
            )}

            {withIcon === "check" && (
              <CheckIcon className="hidden text-primary" />
            )}

            {withIcon === "x" && <XIcon className="hidden text-primary" />}
          </div>
        </div>
        <span className="text-xl font-semibold text-primary my-6">{label == "null" ? "Not assigned" : label}</span>
      </label>
    </div>
  );
}
