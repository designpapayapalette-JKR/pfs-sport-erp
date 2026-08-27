"use client";

import * as React from "react";
import { Badge } from "@pfs/ui";
import {
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
  Flame,
  FileCheck,
  Ban,
  Package,
} from "lucide-react";

export interface StatusBadgeProps {
  status: string;
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function StatusBadge({ status, size = "sm", className }: StatusBadgeProps) {
  const normalized = status.toLowerCase().trim();

  // Success / Delivered / Completed / Active / Won
  if (["delivered", "completed", "active", "won", "paid", "ready", "approved"].includes(normalized)) {
    return (
      <Badge variant="success" size={size} className={`rounded-full capitalize font-bold gap-1 ${className}`}>
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        {status}
      </Badge>
    );
  }

  // Accent / Dispatched / In Transit / Quote
  if (["dispatched", "in_transit", "quote", "estimate/quote", "shipping"].includes(normalized)) {
    return (
      <Badge variant="accent" size={size} className={`rounded-full capitalize font-bold gap-1 ${className}`}>
        <Truck className="h-3 w-3 text-white" />
        {status}
      </Badge>
    );
  }

  // Info / Confirmed / Processing / Packed / Qualified
  if (["confirmed", "processing", "packed", "qualified", "contacted"].includes(normalized)) {
    return (
      <Badge variant="info" size={size} className={`rounded-full capitalize font-bold gap-1 ${className}`}>
        <Package className="h-3 w-3 text-[#1976D2]" />
        {status}
      </Badge>
    );
  }

  // Warning / Pending / Submitted / Low Buffer / New
  if (["submitted", "pending", "pending_payment", "new", "low_stock", "low buffer", "draft"].includes(normalized)) {
    return (
      <Badge variant="warning" size={size} className={`rounded-full capitalize font-bold gap-1 ${className}`}>
        <Clock className="h-3 w-3 text-amber-600" />
        {status}
      </Badge>
    );
  }

  // Destructive / SLA Breach / Lost / Cancelled
  if (["lost", "cancelled", "sla_breached", "failed", "out_of_stock"].includes(normalized)) {
    return (
      <Badge variant="destructive" size={size} className={`rounded-full capitalize font-bold gap-1 ${className}`}>
        <Ban className="h-3 w-3 text-rose-600" />
        {status}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" size={size} className={`rounded-full capitalize font-bold ${className}`}>
      {status}
    </Badge>
  );
}
