"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useERP } from "@/context/erp-context";
import { cn } from "@pfs/ui";
import { Badge, type BadgeProps } from "@pfs/ui";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  Truck,
  Calculator,
  Palette,
  FileText,
  Bell,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Zap,
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  History,
  Lock,
  Crown,
  Pin,
  PinOff,
  MessageSquare,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: BadgeProps["variant"];
  highlight?: boolean;
}

export function Sidebar({
  isExpanded,
  isPinned,
  onTogglePin,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
  isMobileOpen = false,
}: {
  isExpanded: boolean;
  isPinned: boolean;
  onTogglePin: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onNavigate?: () => void;
  isMobileOpen?: boolean;
}) {
  const pathname = usePathname();
  const { currentUser, cartCount, unreadNotificationCount } = useERP();

  // Navigation items based on whether user is in Admin or Dealer mode
  const dealerNavigation: NavItem[] = [
    { name: "Dashboard", href: "/dealer/dashboard", icon: LayoutDashboard },
    { name: "Product Catalogue", href: "/dealer/catalogue", icon: Package },
    { name: "Live Stock", href: "/dealer/stock", icon: Layers },
    {
      name: "Orders & Cart",
      href: "/dealer/orders",
      icon: ShoppingCart,
      badge: cartCount > 0 ? `${cartCount}` : undefined,
      badgeVariant: "accent",
    },
    { name: "Shipment Tracking", href: "/dealer/shipments", icon: Truck },
    {
      name: "Cost Estimator",
      href: "/dealer/estimator",
      icon: Calculator,
      highlight: true,
      badge: "v1.4",
      badgeVariant: "gold",
    },
    {
      name: "Colour Visualiser",
      href: "/dealer/visualiser",
      icon: Palette,
      highlight: true,
      badge: "3D",
      badgeVariant: "info",
    },
    { name: "Document Vault", href: "/dealer/documents", icon: FileText },
    {
      name: "Notifications",
      href: "/dealer/notifications",
      icon: Bell,
      badge: unreadNotificationCount > 0 ? `${unreadNotificationCount}` : undefined,
      badgeVariant: "accent",
    },
    { name: "My Account", href: "/dealer/account", icon: User },
  ];

  const adminNavigation: NavItem[] = [
    { name: "Overview Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
      name: "CRM & Leads",
      href: "/admin/leads",
      icon: Users,
      badge: "4 Hot",
      badgeVariant: "accent",
    },
    {
      name: "Comms & AI Hub",
      href: "/admin/communications",
      icon: MessageSquare,
      badge: "AI Live",
      badgeVariant: "gold",
    },
    { name: "Dealers Directory", href: "/admin/dealers", icon: Building2 },
    { name: "Products & CMS", href: "/admin/products", icon: Package },
    { name: "Pricing & Rate Cards", href: "/admin/pricing", icon: DollarSign },
    { name: "Inventory & Warehouses", href: "/admin/inventory", icon: Layers },
    { name: "Order Desk", href: "/admin/orders", icon: ShoppingCart },
    { name: "Shipments & Logistics", href: "/admin/shipments", icon: Truck },
    { name: "Invoices & Payments", href: "/admin/invoices", icon: FileText },
    { name: "Document Vault", href: "/admin/documents", icon: FileText },
    {
      name: "Automations Engine",
      href: "/admin/automations",
      icon: Zap,
      badge: "Live",
      badgeVariant: "gold",
    },
    { name: "Operational Reports", href: "/admin/reports", icon: TrendingUp },
    { name: "Audit Trail", href: "/admin/audit", icon: History },
    { name: "Users & Roles", href: "/admin/users", icon: Lock },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  // RBAC Permission Filter per PRD §5.1
  const activeNav = React.useMemo(() => {
    if (pathname.startsWith("/admin")) {
      if (currentUser.role === "sales_manager") {
        return adminNavigation.filter((item) =>
          ["/admin/dashboard", "/admin/leads", "/admin/communications", "/admin/dealers", "/admin/pricing", "/admin/documents", "/admin/reports"].includes(item.href)
        );
      }
      if (currentUser.role === "sales_exec") {
        return adminNavigation.filter((item) =>
          ["/admin/dashboard", "/admin/leads", "/admin/communications", "/admin/documents"].includes(item.href)
        );
      }
      if (currentUser.role === "inventory_exec") {
        return adminNavigation.filter((item) =>
          ["/admin/dashboard", "/admin/products", "/admin/inventory", "/admin/orders", "/admin/shipments", "/admin/documents"].includes(item.href)
        );
      }
      return adminNavigation; // super_admin gets all modules
    }

    // Dealer Portal Navigation
    if (currentUser.role === "dealer_staff") {
      return dealerNavigation.filter((item) =>
        ["/dealer/dashboard", "/dealer/catalogue", "/dealer/stock", "/dealer/estimator", "/dealer/visualiser", "/dealer/documents", "/dealer/notifications"].includes(item.href)
      );
    }
    return dealerNavigation; // dealer_owner gets full portal
  }, [pathname, currentUser.role, unreadNotificationCount]);

  const isDealer = !pathname.startsWith("/admin");

  return (
    <aside
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "fixed left-0 top-0 z-40 h-full bg-[#051124] text-slate-100 border-r border-slate-800/80 transition-all duration-300 ease-in-out flex flex-col shadow-2xl backdrop-blur-2xl",
        isExpanded ? "w-[270px] shadow-[0_0_35px_rgba(0,0,0,0.6)]" : "w-[72px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
      aria-label="Main application navigation"
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-3.5 border-b border-white/10 bg-[#040C1A]">
        {isExpanded ? (
          <Link
            href={pathname.startsWith("/admin") ? "/admin/dashboard" : "/dealer/dashboard"}
            onClick={onNavigate}
            className="flex items-center gap-2.5 group min-w-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pfs-logo.png"
              alt="PFS Sport Logo"
              className="h-9 w-9 object-contain drop-shadow-[0_2px_8px_rgba(224,169,37,0.35)] shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-white tracking-wide leading-none">
                  PFS SPORT
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#E0A925] animate-pulse" />
              </div>
              <span className="text-[9px] text-[#E0A925] font-extrabold tracking-widest uppercase mt-0.5 truncate">
                {pathname.startsWith("/admin") ? "In-House ERP Desk" : "Dealer Extranet"}
              </span>
            </div>
          </Link>
        ) : (
          <Link
            href={pathname.startsWith("/admin") ? "/admin/dashboard" : "/dealer/dashboard"}
            onClick={onNavigate}
            className="mx-auto"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pfs-logo.png"
              alt="PFS Sport Logo"
              className="h-8 w-8 object-contain drop-shadow-[0_2px_8px_rgba(224,169,37,0.35)]"
            />
          </Link>
        )}

        {/* Pin / Auto-Hide Toggle Button */}
        {isExpanded && (
          <button
            onClick={onTogglePin}
            className={cn(
              "p-1.5 rounded-xl transition-all",
              isPinned
                ? "bg-[#E0A925]/20 text-[#E0A925] hover:bg-[#E0A925]/30"
                : "text-slate-400 hover:bg-white/10 hover:text-white"
            )}
            title={isPinned ? "Pinned: Click to enable Auto-Hide mode" : "Auto-Hide Active: Click to Pin"}
            aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
          >
            {isPinned ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1 scrollbar-thin scrollbar-thumb-white/10" aria-label="Navigation">
        <ul className="space-y-1" role="list">
          {activeNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dealer/dashboard" &&
                item.href !== "/admin/dashboard" &&
                pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 group relative",
                    isActive
                      ? "bg-gradient-to-r from-blue-600/25 via-blue-600/10 to-transparent text-white border-l-[3px] border-[#F36E21] shadow-[0_2px_12px_rgba(243,110,33,0.15)]"
                      : "text-slate-300/80 hover:bg-white/5 hover:text-white",
                    item.highlight && !isActive && "text-[#D4AF37] hover:text-[#FFD700]",
                    !isExpanded && "justify-center px-2"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  title={!isExpanded ? item.name : undefined}
                >
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive
                        ? "text-[#F36E21]"
                        : item.highlight
                        ? "text-[#B9903C]"
                        : "text-slate-400 group-hover:text-slate-200"
                    )}
                  />

                  {isExpanded && (
                    <div className="flex-1 flex items-center justify-between truncate">
                      <span className="truncate tracking-wide">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant={item.badgeVariant || "outline"}
                          size="sm"
                          className="ml-2 font-mono text-[9px] px-1.5 py-0 rounded-full font-bold shadow-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Auto-Hide Indicator / Footer Account Status */}
      <div className="p-3 border-t border-white/10 bg-[#040C1A]">
        {isExpanded ? (
          <div className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-3 text-xs space-y-2.5 border border-white/10 shadow-md">
            {isDealer ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-[#E5C158]">
                    <Crown className="h-3.5 w-3.5" />
                    <span>{currentUser.dealerTier || "Platinum"} Tier</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                    25% MRP Slab
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Credit Line:</span>
                    <span className="font-mono font-bold text-white">₹25,00,000</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden p-[0.5px]">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[34%]" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>₹8.4L Drawn</span>
                    <span className="text-emerald-400 font-bold">₹16.6L Avail</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="h-8 w-8 rounded-lg bg-[#0A2A57] border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
                    <Shield className="h-4 w-4 text-[#F36E21]" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-white text-xs truncate">In-House ERP</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {isPinned ? "Sidebar Pinned" : "Auto-Hide Active"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex justify-center cursor-pointer"
            onClick={onTogglePin}
            title={isDealer ? "Platinum Tier Dealer (Click to Pin)" : "Auto-Hide Active (Hover to Expand, Click to Pin)"}
          >
            {isDealer ? (
              <div className="h-8 w-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Crown className="h-4 w-4 text-[#E5C158]" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Shield className="h-4 w-4 text-[#F36E21]" />
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}