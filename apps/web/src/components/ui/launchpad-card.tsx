"use client";

import * as React from "react";
import Link from "next/link";
import { MotionCard } from "@/components/motion";
import { LucideIcon } from "lucide-react";

export interface LaunchpadCardProps {
  href: string;
  tag: string;
  tagColor?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  gradient: string;
}

export function LaunchpadCard({
  href,
  tag,
  tagColor = "text-blue-300",
  title,
  description,
  icon: Icon,
  iconColor = "text-[#B9903C]",
  gradient,
}: LaunchpadCardProps) {
  return (
    <Link href={href} className="group block">
      <MotionCard
        className={`p-5 ${gradient} text-white border-none shadow-md hover:shadow-xl transition-all rounded-2xl min-h-[112px] flex items-center justify-between`}
      >
        <div className="space-y-1 pr-3">
          <span className={`text-[10px] uppercase font-bold tracking-widest ${tagColor}`}>
            {tag}
          </span>
          <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-amber-200 transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-xs text-white/70 line-clamp-1 leading-snug">
            {description}
          </p>
        </div>
        <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:rotate-6 group-hover:scale-105 transition-transform shrink-0">
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </MotionCard>
    </Link>
  );
}
