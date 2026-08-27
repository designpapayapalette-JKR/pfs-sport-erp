import * as React from "react";
import { cn } from "./utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated" | "glass" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", children, ...props }, ref) => {
    const variants = {
      default: "bg-white border border-slate-200/80 shadow-xs",
      outlined: "bg-white border-2 border-slate-200",
      elevated: "bg-white shadow-md border border-slate-100",
      glass: "bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm",
      dark: "bg-gradient-to-br from-[#061730] via-[#071D3D] to-[#0A2A57] text-white border border-white/10 shadow-xl",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-5 sm:p-6",
      lg: "p-6 sm:p-8",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-2xl transition-all", variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-base font-extrabold text-slate-900 tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("mt-0.5 text-xs text-slate-500", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-4 flex items-center gap-2 pt-3 border-t border-slate-100", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };