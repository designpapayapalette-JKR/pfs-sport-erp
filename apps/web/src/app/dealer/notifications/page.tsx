"use client";

import * as React from "react";
import Link from "next/link";
import { DealerLayout } from "@/components/layout";
import { useERP } from "@/context/erp-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
} from "@pfs/ui";
import {
  Bell,
  CheckCircle2,
  Truck,
  ShoppingCart,
  Layers,
  FileText,
  Clock,
  Check,
} from "lucide-react";

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useERP();
  const [activeFilter, setActiveFilter] = React.useState<string>("all");

  const filteredNotifs = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  return (
    <DealerLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Notifications & Operational Alerts
              </h1>
              <Badge variant="accent">
                {notifications.filter((n) => !n.read).length} Unread
              </Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Order confirmations, live carrier dispatch events, TDS revisions, and account updates.
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={markAllNotificationsAsRead}>
            <Check className="mr-1.5 h-3.5 w-3.5" /> Mark All as Read
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {["all", "unread", "order", "shipment", "document", "lead"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                activeFilter === f
                  ? "bg-[#0A2A57] text-white shadow-xs"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-surfaceBorder"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications Card List */}
        <Card className="bg-white border border-surfaceBorder shadow-xs overflow-hidden" padding="none">
          <div className="divide-y divide-surfaceBorder">
            {filteredNotifs.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 text-xs">
                No notifications match the selected filter.
              </div>
            ) : (
              filteredNotifs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationAsRead(item.id)}
                  className={`p-4 flex items-start justify-between gap-4 transition-colors hover:bg-neutral-50 cursor-pointer ${
                    !item.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                        item.type === "shipment"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.type === "order"
                          ? "bg-blue-100 text-blue-800"
                          : item.type === "document"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.type === "shipment" ? (
                        <Truck className="h-4 w-4" />
                      ) : item.type === "order" ? (
                        <ShoppingCart className="h-4 w-4" />
                      ) : item.type === "document" ? (
                        <FileText className="h-4 w-4" />
                      ) : (
                        <Bell className="h-4 w-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm ${!item.read ? "font-bold text-neutral-900" : "font-semibold text-neutral-700"}`}>
                          {item.title}
                        </h4>
                        {!item.read && <span className="h-2 w-2 rounded-full bg-[#F36E21]" />}
                      </div>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{item.message}</p>
                      {item.link && (
                        <Link href={item.link} className="inline-block text-xs font-semibold text-primary hover:underline mt-2">
                          View details →
                        </Link>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] text-neutral-400 font-mono shrink-0 whitespace-nowrap">
                    {item.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </DealerLayout>
  );
}
