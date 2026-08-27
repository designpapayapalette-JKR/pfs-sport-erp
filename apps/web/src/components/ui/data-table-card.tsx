"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@pfs/ui";

export interface DataTableCardProps {
  title: string;
  description?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DataTableCard({
  title,
  description,
  headerAction,
  children,
  className = "",
}: DataTableCardProps) {
  return (
    <Card
      className={`bg-white border border-slate-200/80 shadow-xs rounded-2xl overflow-hidden ${className}`}
      padding="none"
    >
      <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h3>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">{description}</p>
          )}
        </div>
        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>
      <div className="p-0 overflow-x-auto">{children}</div>
    </Card>
  );
}
