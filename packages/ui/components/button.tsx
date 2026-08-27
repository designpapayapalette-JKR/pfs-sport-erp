import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-extrabold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-primaryHover shadow-xs hover:shadow-sm",
        accent:
          "bg-[#F36E21] text-white hover:bg-[#D95D16] shadow-xs hover:shadow-sm focus-visible:ring-[#F36E21]",
        gold:
          "bg-[#B9903C] text-white hover:bg-[#9D7A32] shadow-xs hover:shadow-sm focus-visible:ring-[#B9903C]",
        success:
          "bg-[#006442] text-white hover:bg-[#004D32] shadow-xs hover:shadow-sm focus-visible:ring-[#006442]",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-700 shadow-xs hover:shadow-sm",
        outline:
          "border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 shadow-2xs",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-slate-100 hover:text-primary text-slate-700",
        link: "text-primary underline-offset-4 hover:underline font-bold",
      },
      size: {
        default: "h-9 px-3.5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-5 text-sm font-black",
        xl: "h-12 rounded-xl px-7 text-base font-black",
        icon: "h-9 w-9",
        "icon-sm": "h-7.5 w-7.5 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{children}</span>
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };