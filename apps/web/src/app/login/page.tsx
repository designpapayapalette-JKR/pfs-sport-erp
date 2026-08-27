"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useERP } from "@/context/erp-context";
import {
  Card,
  Button,
  Badge,
  Input,
} from "@pfs/ui";
import {
  Lock,
  Mail,
  Shield,
  Crown,
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  Truck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUserRole } = useERP();

  const [email, setEmail] = React.useState("anand@apexsports.in");
  const [password, setPassword] = React.useState("••••••••••••");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dealer/dashboard");
    }, 600);
  };

  const handleQuickDemoLogin = (roleKey: string, redirectPath: string) => {
    setCurrentUserRole(roleKey);
    router.push(redirectPath);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Logo */}
        <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-[#0A2A57] to-[#F36E21] p-0.5 shadow-lg flex items-center justify-center">
          <div className="h-full w-full bg-[#071D3D] rounded-[10px] flex items-center justify-center font-black text-white text-base tracking-wider">
            PFS
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-black tracking-tight text-neutral-900">
          PFS Sport In-House ERP
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          Internal Operations & Authorized Dealer Distribution Network
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 space-y-4">
        <Card className="p-6 bg-white border border-surfaceBorder shadow-md">
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Corporate Email Address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-neutral-700">Password</label>
                <Link href="/forgot-password" className="text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
              />
            </div>

            <Button type="submit" variant="accent" className="w-full h-10 text-xs font-semibold" loading={isLoading}>
              Sign In to System <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
        </Card>

        {/* 1-Click Interactive Persona Switcher */}
        <Card className="p-5 bg-gradient-to-br from-neutral-900 to-[#071D3D] text-white border-none shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B9903C] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              1-Click Enterprise Persona Selector
            </span>
            <Badge variant="gold" size="sm" className="text-[9px]">In-House Demo</Badge>
          </div>

          <div className="space-y-2 text-xs">
            <p className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Internal PFS Sport Operations</p>
            <button
              onClick={() => handleQuickDemoLogin("super_admin", "/admin/dashboard")}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-left transition-colors border border-white/5"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <div>
                  <p className="font-bold text-white leading-tight">Managing Director / Super Admin</p>
                  <p className="text-[10px] text-white/60">Full In-House ERP, Audits, Automations & Settings</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-400">Launch →</span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin("sales_manager", "/admin/leads")}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-left transition-colors border border-white/5"
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="font-bold text-white leading-tight">Regional Sales Manager</p>
                  <p className="text-[10px] text-white/60">CRM Leads Pipeline, SLA Timers & Quotes</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-blue-400">Launch →</span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin("inventory_exec", "/admin/inventory")}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-left transition-colors border border-white/5"
            >
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-400" />
                <div>
                  <p className="font-bold text-white leading-tight">Logistics & Warehouse Officer</p>
                  <p className="text-[10px] text-white/60">Stock Ledgers, Carrier Dispatches</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-amber-400">Launch →</span>
            </button>

            <p className="text-[10px] text-white/50 uppercase font-bold tracking-wider pt-2 border-t border-white/10">Authorized Dealer Partner Network</p>
            <button
              onClick={() => handleQuickDemoLogin("dealer_platinum", "/dealer/dashboard")}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-left transition-colors border border-white/5"
            >
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-[#B9903C]" />
                <div>
                  <p className="font-bold text-white leading-tight">Apex Sports Infra (Platinum Dealer)</p>
                  <p className="text-[10px] text-white/60">25% Wholesale Slabs, Visualiser, Estimator & Orders</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#B9903C]">Launch →</span>
            </button>
          </div>
        </Card>

        {/* Enterprise Notice */}
        <p className="text-[11px] text-neutral-400 text-center leading-relaxed flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3 text-neutral-400 shrink-0" />
          <span>Private Enterprise System of <strong>PFS Sport Infrastructure Pvt. Ltd.</strong> Unauthorized access is strictly prohibited and audited.</span>
        </p>
      </div>
    </div>
  );
}
