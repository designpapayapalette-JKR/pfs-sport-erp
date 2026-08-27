"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home, LayoutDashboard } from "lucide-react";

const routeLabels: Record<string, string> = {
  dealer: "Dealer Portal",
  admin: "Admin ERP",
  dashboard: "Dashboard",
  catalogue: "Product Catalogue",
  stock: "Live Stock",
  inventory: "Inventory & Warehouses",
  orders: "Orders & Cart",
  shipments: "Shipments Tracking",
  estimator: "Court Cost Estimator",
  visualiser: "Court Colour Visualiser",
  documents: "Document Vault",
  account: "My Account",
  notifications: "Notifications",
  leads: "CRM & Leads",
  dealers: "Dealers Directory",
  products: "Products & CMS",
  pricing: "Pricing & Rate Cards",
  invoices: "Invoices & Payments",
  automations: "Automations Engine",
  reports: "Operational Reports",
  audit: "Audit Trail",
  users: "Users & Roles",
  settings: "Settings",
  help: "Help & Support",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs text-neutral-500 overflow-x-auto pb-1" aria-label="Breadcrumb">
      <Link
        href={pathname.startsWith("/admin") ? "/admin/dashboard" : "/dealer/dashboard"}
        className="flex items-center gap-1 text-neutral-600 hover:text-primary transition-colors font-medium shrink-0"
      >
        <Home className="h-3.5 w-3.5" />
        <span>{pathname.startsWith("/admin") ? "Admin ERP" : "Dealer Portal"}</span>
      </Link>

      {segments.map((segment, index) => {
        // Skip 'dealer' or 'admin' as root link already represents it
        if (segment === "dealer" || segment === "admin") return null;

        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const label = routeLabels[segment] || decodeURIComponent(segment.replace(/-/g, " ")).toUpperCase();

        return (
          <React.Fragment key={segment}>
            <ChevronRight className="h-3 w-3 text-neutral-400 shrink-0" aria-hidden="true" />
            {isLast ? (
              <span className="text-neutral-900 font-semibold truncate max-w-[240px]" aria-current="page">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="text-neutral-500 hover:text-primary transition-colors truncate max-w-[200px]"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}