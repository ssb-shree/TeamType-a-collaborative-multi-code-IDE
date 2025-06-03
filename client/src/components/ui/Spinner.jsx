import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

// spinner container styles
const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

// spinner icon styles
const loaderVariants = cva(
  "animate-spin text-cyan-300 drop-shadow-[0_0_8px_#22d3ee] drop-shadow-[0_0_16px_#22d3ee]",
  {
    variants: {
      size: {
        small: "size-6",
        medium: "size-8",
        large: "size-30",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export function Spinner(props) {
  const { size, show, children, className } = props;

  return (
    <span
      className={`${spinnerVariants({
        show,
      })} w-full h-full flex justify-center items-center`}
    >
      <Loader2 className={`${cn(loaderVariants({ size }), className)}`} />
      {children}
    </span>
  );
}
