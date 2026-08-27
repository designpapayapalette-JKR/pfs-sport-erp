"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useERP } from "@/context/erp-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Badge,
} from "@pfs/ui";
import {
  Bell,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  LogOut,
  Shield,
  Crown,
  Menu,
  Truck,
  Sparkles,
  Command,
  Building2,
  Users,
  Check,
  ExternalLink,
} from "lucide-react";

export function Header({
  onMenuClick,
  onMobileMenuToggle,
}: {
  onMenuClick?: () => void;
  onMobileMenuToggle?: () => void;
}) {
  const router = useRouter();
  const {
    currentUser,
    setCurrentUserRole,
    isAdmin,
    isDealer,
    cartCount,
    notifications,
    unreadNotificationCount,
    setIsSearchOpen,
  } = useERP();

  const handleToggle = onMenuClick || onMobileMenuToggle;

  const handleRoleChange = (roleKey: string) => {
    setCurrentUserRole(roleKey);
    if (roleKey.startsWith("dealer")) {
      router.push("/dealer/dashboard");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/85 px-4 sm:px-6 backdrop-blur-xl transition-all shadow-xs">
      {/* Left: Mobile Menu Toggle & Global Spotlight Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden sm:flex items-center gap-2.5 h-9.5 w-64 lg:w-88 rounded-xl border border-slate-200/90 bg-slate-50/80 px-3.5 text-xs text-slate-500 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all text-left group"
        >
          <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary transition-colors shrink-0" />
          <span className="flex-1 truncate font-medium">Search court systems, orders, leads...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-500 shadow-2xs">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right: In-House Persona Switcher, Cart, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Interactive Role Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/80 hover:border-slate-300 transition-all text-xs font-semibold text-slate-800 shadow-2xs">
              {isAdmin ? (
                <div className="h-5 w-5 rounded-md bg-[#0A2A57] text-white flex items-center justify-center">
                  <Shield className="h-3 w-3" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-md bg-amber-500/20 text-[#B9903C] flex items-center justify-center">
                  <Crown className="h-3 w-3" />
                </div>
              )}
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">
                  {isAdmin ? "PFS HQ Staff" : "Dealer Account"}
                </span>
                <span className="font-bold text-slate-900 leading-tight">{currentUser.roleLabel}</span>
              </div>
              {currentUser.dealerTier && (
                <Badge
                  variant={currentUser.dealerTier === "Platinum" ? "platinum" : currentUser.dealerTier === "Gold" ? "gold" : "silver"}
                  size="sm"
                  className="rounded-full"
                >
                  {currentUser.dealerTier}
                </Badge>
              )}
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[340px] sm:w-[360px] p-2 rounded-2xl shadow-2xl border border-slate-200/90 bg-white max-h-[85vh] overflow-y-auto z-[70]">
            <DropdownMenuLabel className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2.5 py-1.5">
              PFS Corporate Operations (In-House)
            </DropdownMenuLabel>

            {/* Super Admin */}
            <DropdownMenuItem
              onClick={() => handleRoleChange("super_admin")}
              className={`cursor-pointer rounded-xl p-2.5 transition-all mb-1 ${
                currentUser.role === "super_admin" ? "bg-slate-100 ring-1 ring-slate-300/80" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="font-extrabold text-xs text-slate-900 block truncate">
                      Super Admin / Managing Director
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      Full In-House ERP & Systems Bypass
                    </span>
                  </div>
                </div>
                {currentUser.role === "super_admin" && (
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
              </div>
            </DropdownMenuItem>

            {/* Sales Manager */}
            <DropdownMenuItem
              onClick={() => handleRoleChange("sales_manager")}
              className={`cursor-pointer rounded-xl p-2.5 transition-all mb-1 ${
                currentUser.role === "sales_manager" ? "bg-slate-100 ring-1 ring-slate-300/80" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-blue-900 text-blue-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="font-extrabold text-xs text-slate-900 block truncate">
                      Regional Sales Manager
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      CRM Pipeline, Quotes & SLA Tracking
                    </span>
                  </div>
                </div>
                {currentUser.role === "sales_manager" && (
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
              </div>
            </DropdownMenuItem>

            {/* Sales Executive */}
            <DropdownMenuItem
              onClick={() => handleRoleChange("sales_exec")}
              className={`cursor-pointer rounded-xl p-2.5 transition-all mb-1 ${
                currentUser.role === "sales_exec" ? "bg-slate-100 ring-1 ring-slate-300/80" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-teal-900 text-teal-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="font-extrabold text-xs text-slate-900 block truncate">
                      Sales Executive (Field Rep)
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      Assigned Leads, Notes & AI Proposals
                    </span>
                  </div>
                </div>
                {currentUser.role === "sales_exec" && (
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
              </div>
            </DropdownMenuItem>

            {/* Inventory / Logistics Head */}
            <DropdownMenuItem
              onClick={() => handleRoleChange("inventory_exec")}
              className={`cursor-pointer rounded-xl p-2.5 transition-all mb-1 ${
                currentUser.role === "inventory_exec" ? "bg-slate-100 ring-1 ring-slate-300/80" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-amber-900 text-amber-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="font-extrabold text-xs text-slate-900 block truncate">
                      Logistics & Inventory Head
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      Bhiwandi/Delhi Stock, Packing & AWB
                    </span>
                  </div>
                </div>
                {currentUser.role === "inventory_exec" && (
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 bg-slate-100" />

            <DropdownMenuLabel className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2.5 py-1.5">
              Authorized Dealer Extranet Network
            </DropdownMenuLabel>

            {/* Dealer Platinum */}
            <DropdownMenuItem
              onClick={() => handleRoleChange("dealer_platinum")}
              className={`cursor-pointer rounded-xl p-2.5 transition-all mb-1 ${
                currentUser.dealerTier === "Platinum" && currentUser.role === "dealer_owner"
                  ? "bg-slate-100 ring-1 ring-slate-300/80"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <Crown className="h-4 w-4 text-[#B9903C]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-slate-900 truncate">
                        Apex Sports
                      </span>
                      <Badge variant="platinum" size="sm" className="text-[8px] rounded-full px-1.5 py-0">
                        Platinum 25%
                      </Badge>
                    </div>
                    <span className="text-[10px] text-slate-500 block truncate">
                      Mumbai HQ • ₹25L Credit Limit
                    </span>
                  </div>
                </div>
                {currentUser.dealerTier === "Platinum" && currentUser.role === "dealer_owner" && (
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
              </div>
            </DropdownMenuItem>

            {/* Dealer Gold */}
            <DropdownMenuItem
              onClick={() => handleRoleChange("dealer_gold")}
              className={`cursor-pointer rounded-xl p-2.5 transition-all mb-1 ${
                currentUser.dealerTier === "Gold" && currentUser.role === "dealer_owner"
                  ? "bg-slate-100 ring-1 ring-slate-300/80"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <Crown className="h-4 w-4 text-[#B9903C]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-slate-900 truncate">
                        Premier Courts
                      </span>
                      <Badge variant="gold" size="sm" className="text-[8px] rounded-full px-1.5 py-0">
                        Gold 18%
                      </Badge>
                    </div>
                    <span className="text-[10px] text-slate-500 block truncate">
                      Bengaluru • ₹15L Credit Limit
                    </span>
                  </div>
                </div>
                {currentUser.dealerTier === "Gold" && currentUser.role === "dealer_owner" && (
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
              </div>
            </DropdownMenuItem>

            {/* Dealer Staff */}
            <DropdownMenuItem
              onClick={() => handleRoleChange("dealer_staff")}
              className={`cursor-pointer rounded-xl p-2.5 transition-all ${
                currentUser.role === "dealer_staff" ? "bg-slate-100 ring-1 ring-slate-300/80" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="font-extrabold text-xs text-slate-900 block truncate">
                      Dealer Estimator (Staff)
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      Restricted Catalogue & Visualiser
                    </span>
                  </div>
                </div>
                {currentUser.role === "dealer_staff" && (
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dealer Active Cart Trigger Button */}
        {isDealer && (
          <Link href="/dealer/orders">
            <button className="relative flex items-center gap-1.5 h-9.5 px-3 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-semibold text-slate-700 shadow-2xs">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">Order Cart</span>
              {cartCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#F36E21] px-1 text-[10px] font-bold text-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
        )}

        {/* Notifications Popover */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative p-2.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all shadow-2xs"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#F36E21] text-[9px] font-bold text-white ring-2 ring-white animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-xl shadow-xl border-slate-200">
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100">
              <DropdownMenuLabel className="text-xs font-bold text-slate-900 p-0">
                Operational Alerts & Notifications
              </DropdownMenuLabel>
              <Badge variant="accent" size="sm">
                {unreadNotificationCount} New
              </Badge>
            </div>
            <div className="max-h-72 overflow-y-auto py-1 divide-y divide-slate-50 text-xs">
              {notifications.slice(0, 4).map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.link || (isAdmin ? "/admin/dashboard" : "/dealer/dashboard")}
                  className="block p-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <p className="font-bold text-slate-900">{notif.title}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{notif.message}</p>
                  <span className="text-[9px] text-slate-400 font-mono mt-1 block">{notif.timestamp}</span>
                </Link>
              ))}
            </div>
            <DropdownMenuSeparator />
            <Link
              href={isAdmin ? "/admin/audit" : "/dealer/notifications"}
              className="block text-center text-xs font-bold text-primary hover:underline py-1"
            >
              View All Notifications →
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 rounded-xl border border-transparent hover:border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#0A2A57] to-[#F36E21] p-[1.5px] shadow-xs">
                <div className="h-full w-full bg-[#071D3D] rounded-[9px] flex items-center justify-center text-white font-black text-xs tracking-wider">
                  {currentUser.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} className="w-64 p-2 rounded-2xl shadow-2xl border border-slate-200/90 bg-white z-[90]">
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 mb-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-slate-900 leading-none">{currentUser.name}</p>
                <Badge variant="gold" size="sm" className="font-mono text-[9px] font-bold">
                  {currentUser.dealerTier || "HQ"}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
              <div className="pt-1">
                <span className="text-[9px] font-mono font-bold text-[#0A2A57] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 block truncate">
                  {currentUser.roleLabel}
                </span>
              </div>
            </div>

            <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-2 text-xs font-semibold hover:bg-slate-50">
              <Link href={isDealer ? "/dealer/account" : "/admin/settings"}>
                <User className="mr-2 h-4 w-4 text-slate-500" />
                <span>{isDealer ? "Dealer Profile & KYC" : "System & ERP Settings"}</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-2 text-xs font-semibold hover:bg-slate-50">
              <Link href="/shop">
                <ExternalLink className="mr-2 h-4 w-4 text-slate-500" />
                <span>Public Storefront</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1.5 bg-slate-100" />

            <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-2 text-xs font-bold text-rose-600 hover:bg-rose-50 focus:bg-rose-50 focus:text-rose-700">
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out of Console</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}