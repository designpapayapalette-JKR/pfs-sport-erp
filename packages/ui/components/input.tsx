import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as Slot from "@radix-ui/react-slot";
import { cn } from "./utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className="w-full">
        {label && (
          <LabelPrimitive.Root
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-neutral-900"
          >
            {label}
          </LabelPrimitive.Root>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              "flex h-10 w-full rounded-lg border border-surfaceBorder bg-surface px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100",
              "hover:border-neutral-300",
              error && "border-error focus:ring-error focus:border-error",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={`${errorId ?? ""} ${hintId ?? ""}`.trim() || undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };