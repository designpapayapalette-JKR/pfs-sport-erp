"use client";

import * as React from "react";
import { Badge } from "@pfs/ui";
import { LivePulseDot } from "@/components/motion";

export interface PageHeaderProps {
  title: string;
  description?: string;
  badgeText?: string;
  badgeVariant?:
    | "default"
    | "secondary"
    | "outline"
    | "accent"
    | "gold"
    | "platinum"
    | "silver"
    | "registered"
    | "destructive"
    | "success"
    | "warning"
    | "info"
    | "neutral";
  pulseColor?: "emerald" | "amber" | "orange" | "blue" | "rose";
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  badgeText,
  badgeVariant = "default",
  pulseColor,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>
          {badgeText && (
            <Badge
              variant={badgeVariant}
              className="rounded-full text-[10px] font-bold shadow-2xs flex items-center gap-1.5 px-2.5 py-0.5"
            >
              {pulseColor && <LivePulseDot color={pulseColor} size="sm" />}
              {badgeText}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
