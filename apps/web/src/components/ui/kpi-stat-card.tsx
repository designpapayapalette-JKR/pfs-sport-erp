"use client";

import * as React from "react";
import { MotionCard } from "@/components/motion";
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export interface KpiStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "increase" | "decrease" | "neutral";
  trendLabel?: string;
  icon: LucideIcon;
  gradient?: string;
  className?: string;
}

export function KpiStatCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon: Icon,
  gradient = "from-blue-600 to-indigo-700",
  className = "",
}: KpiStatCardProps) {
  return (
    <MotionCard
      className={`bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all rounded-2xl p-5 flex flex-col justify-between min-h-[136px] card-hover-effect cursor-default ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider line-clamp-1">
            {title}
          </p>
          <p className="text-2xl sm:text-[26px] font-black text-slate-900 font-mono tracking-tight leading-none pt-0.5">
            {value}
          </p>
        </div>
        <div
          className={`h-11 w-11 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md flex items-center justify-center shrink-0`}
        >
          <Icon className="h-5 w-5 stroke-[2.2]" />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-semibold pt-3 border-t border-slate-50 mt-2">
        {trend === "increase" && (
          <div className="flex items-center gap-0.5 text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md text-[11px]">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>{trendLabel || subtitle}</span>
          </div>
        )}
        {trend === "decrease" && (
          <div className="flex items-center gap-0.5 text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded-md text-[11px]">
            <ArrowDownRight className="h-3.5 w-3.5" />
            <span>{trendLabel || subtitle}</span>
          </div>
        )}
        {trend === "neutral" && (
          <div className="flex items-center gap-0.5 text-slate-600 font-medium bg-slate-100 px-1.5 py-0.5 rounded-md text-[11px]">
            <Minus className="h-3 w-3" />
            <span>{trendLabel || subtitle}</span>
          </div>
        )}
        {!trend && subtitle && (
          <span className="text-slate-500 text-[11px]">{subtitle}</span>
        )}
      </div>
    </MotionCard>
  );
}
