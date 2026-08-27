import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "./utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
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
        <textarea
          id={inputId}
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-surfaceBorder bg-surface px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100",
            "hover:border-neutral-300",
            error && "border-error focus:ring-error focus:border-error",
            className
          )}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${errorId ?? ""} ${hintId ?? ""}`.trim() || undefined}
          {...props}
        />
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
Textarea.displayName = "Textarea";

export { Textarea };
