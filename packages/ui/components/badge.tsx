import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 leading-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white hover:bg-primaryHover",
        secondary:
          "border-transparent bg-secondary text-white hover:bg-secondaryHover",
        accent:
          "border-transparent bg-[#F36E21] text-white hover:bg-[#D95D16]",
        platinum:
          "border-slate-300 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 font-extrabold shadow-2xs",
        gold:
          "border-[#E0A925]/40 bg-[#FDF7E7] text-[#9A7007] font-extrabold",
        silver:
          "border-slate-300 bg-slate-100 text-slate-700 font-bold",
        registered:
          "border-neutral-300 bg-neutral-100 text-neutral-600 font-medium",
        destructive:
          "border-transparent bg-rose-600 text-white hover:bg-rose-700",
        outline: "text-slate-700 border-slate-200 bg-transparent hover:bg-slate-50",
        success: "border-transparent bg-[#006442] text-white hover:bg-[#004D32]",
        warning: "border-transparent bg-amber-500 text-white hover:bg-amber-600",
        info: "border-transparent bg-[#0A2A57] text-white hover:bg-[#071D3D]",
        neutral: "border-transparent bg-slate-200 text-slate-700 hover:bg-slate-300",
      },
      size: {
        default: "px-2.5 py-0.5 text-[10px]",
        sm: "px-2 py-0.5 text-[9px]",
        lg: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };