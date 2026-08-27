"use client";

import * as React from "react";
import { Button } from "@pfs/ui";
import { LucideIcon, Search, Package, Inbox } from "lucide-react";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`p-10 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-200/90 rounded-2xl bg-slate-50/50 ${className}`}
    >
      <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-400 mb-3">
        <Icon className="h-6 w-6 text-slate-500" />
      </div>
      <h3 className="text-sm font-extrabold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="rounded-xl text-xs font-bold">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
