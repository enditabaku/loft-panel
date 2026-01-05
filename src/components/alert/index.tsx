import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";
import { AlertErrorIcon, AlertSuccessIcon, AlertWarningIcon } from "./icons";

const alertVariants = cva(
  "flex items-center gap-5 w-full border-b-4 px-7 py-4 dark:bg-opacity-10 md:p-5",
  {
    variants: {
      variant: {
        success: "border-green bg-green-light-7 dark:bg-[#1B1B24]",
        warning: "border-[#FFB800] bg-[#FEF5DE] dark:bg-[#1B1B24]",
        error: "border-red-light bg-red-light-5 dark:bg-[#1B1B24]",
      },
    },
    defaultVariants: {
      variant: "error",
    },
  },
);

const icons = {
  error: AlertErrorIcon,
  success: AlertSuccessIcon,
  warning: AlertWarningIcon,
};

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant: "error" | "success" | "warning";
  title: string;
  description: string;
};

const Alert = ({
  className,
  variant,
  title,
  description,
  ...props
}: AlertProps) => {
  const IconComponent = icons[variant];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <IconComponent />

      <div className="w-full">
        <h5
          className={cn("mb-1 font-bold leading-[22px]", {
            "text-[#004434] dark:text-[#34D399]": variant === "success",
            "text-[#9D5425]": variant === "warning",
            "text-[#BC1C21]": variant === "error",
          })}
        >
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </h5>
        {description?.length > 0 && (
          <div
            className={cn({
              "text-[#637381]": variant === "success",
              "text-[#D0915C]": variant == "warning",
              "text-[#CD5D5D]": variant === "error",
            })}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export { Alert, type AlertProps };
