"use client";

import * as React from "react";
import { Input, Button } from "@pfs/ui";
import { Search, X, SlidersHorizontal } from "lucide-react";

export interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  children?: React.ReactNode; // Filter select dropdowns / pills
  actionButton?: React.ReactNode;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  placeholder = "Search...",
  children,
  actionButton,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="flex flex-1 flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="pl-9 pr-8 text-xs h-9.5 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {children}
      </div>

      {actionButton && (
        <div className="flex items-center gap-2 shrink-0">
          {actionButton}
        </div>
      )}
    </div>
  );
}
