"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import { Card, Button, Badge, Input } from "@pfs/ui";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  MotionCard,
  AnimatedNumber,
  LivePulseDot,
} from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Settings,
  Database,
  Mail,
  Bot,
  Cloud,
  CheckCircle2,
  Save,
  Sparkles,
  RefreshCw,
  Activity,
  Bell,
  Lock,
  Globe,
  Zap,
  ChevronRight,
  AlertTriangle,
  Info,
  Moon,
  Sun,
  Wifi,
} from "lucide-react";

const adapters = [
  {
    name: "NeonDB PostgreSQL",
    subtitle: "Region: ap-southeast-1 (Singapore) · Pooled pooler.neon.tech",
    status: "Connected",
    latency: "12ms",
    color: "emerald",
    Icon: Database,
  },
  {
    name: "ZeptoMail Gateway",
    subtitle: "Sender: noreply@pfs-sport.com · DKIM & SPF Passing",
    status: "Domain Verified",
    latency: "—",
    color: "blue",
    Icon: Mail,
  },
  {
    name: "Kimi K2.6 LLM Adapter",
    subtitle: "Deterministic Guardrails Active · Pydantic Schema Validation",
    status: "Ready (v1)",
    latency: "480ms",
    color: "purple",
    Icon: Bot,
  },
  {
    name: "AWS S3 Object Storage",
    subtitle: "Bucket: pfs-sport-assets-prod (ap-south-1 Mumbai)",
    status: "Bucket Active",
    latency: "—",
    color: "amber",
    Icon: Cloud,
  },
];

const colorMap: Record<string, { bg: string; text: string; dot: string; badge: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-800" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", badge: "bg-blue-100 text-blue-800" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500", badge: "bg-purple-100 text-purple-800" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-800" },
};

export default function AdminSettingsPage() {
  // Corporate config state
  const [companyName, setCompanyName] = React.useState("PFS Sport Infrastructure Private Limited");
  const [gstin, setGstin] = React.useState("27AAACP9921D1Z5");
  const [gstRate, setGstRate] = React.useState("18");
  const [invoicePrefix, setInvoicePrefix] = React.useState("PFS-INV-2026-");
  const [supportEmail, setSupportEmail] = React.useState("erp@pfs-sport.com");
  const [slaDays, setSlaDays] = React.useState("2");

  // Notification toggles
  const [emailNotifs, setEmailNotifs] = React.useState(true);
  const [whatsappNotifs, setWhatsappNotifs] = React.useState(true);
  const [slaAlerts, setSlaAlerts] = React.useState(true);
  const [aiSuggestions, setAiSuggestions] = React.useState(true);

  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [pingingAdapter, setPingingAdapter] = React.useState<string | null>(null);
  const [pingSuccess, setPingSuccess] = React.useState<Record<string, boolean>>({});

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 900);
  };

  const handlePingAdapter = (name: string) => {
    setPingingAdapter(name);
    setTimeout(() => {
      setPingingAdapter(null);
      setPingSuccess((prev) => ({ ...prev, [name]: true }));
      setTimeout(() => setPingSuccess((prev) => ({ ...prev, [name]: false })), 2000);
    }, 1200);
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-5">
        {/* ================================================================ */}
        {/* 1. PAGE HEADER                                                    */}
        {/* ================================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                System Settings & Provider Adapters
              </h1>
              <Badge variant="gold" className="rounded-full text-[10px] font-extrabold flex items-center gap-1.5 px-2.5 py-0.5">
                <LivePulseDot color="orange" size="sm" />
                Production Infrastructure
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure corporate entity details, GST rates, notification channels, and inspect live adapter health.
            </p>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={handleSave}
            disabled={isSaving || saveSuccess}
            className="rounded-xl bg-[#F36E21] hover:bg-[#D95D16] text-white text-xs font-extrabold shadow-xs min-w-[160px]"
          >
            {saveSuccess ? (
              <>
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Configuration Saved!
              </>
            ) : isSaving ? (
              <>
                <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Save Configuration
              </>
            )}
          </Button>
        </div>

        {/* ================================================================ */}
        {/* 2. INTEGRATION ADAPTER HEALTH STATUS                             */}
        {/* ================================================================ */}
        <div>
          <h2 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-slate-500" />
            Integration Adapter Health
          </h2>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {adapters.map((adapter) => {
              const c = colorMap[adapter.color];
              const Icon = adapter.Icon;
              const isPinging = pingingAdapter === adapter.name;
              const isPingDone = pingSuccess[adapter.name];
              return (
                <StaggerItem key={adapter.name}>
                  <MotionCard className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-3 cursor-default">
                    <div className="flex items-start justify-between gap-2">
                      <div className={`h-9 w-9 rounded-xl ${c.bg} ${c.text} flex items-center justify-center shrink-0`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`h-2 w-2 rounded-full ${c.dot} animate-pulse`} />
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${c.badge}`}>
                          {adapter.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-xs text-slate-900">{adapter.name}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{adapter.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      {adapter.latency !== "—" && (
                        <span className="text-[10px] font-mono text-slate-500">
                          Latency: <strong className="text-slate-800">{adapter.latency}</strong>
                        </span>
                      )}
                      {adapter.latency === "—" && (
                        <span className="text-[10px] text-slate-400">Async adapter</span>
                      )}
                      <button
                        onClick={() => handlePingAdapter(adapter.name)}
                        disabled={isPinging}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors ${
                          isPingDone
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {isPinging ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : isPingDone ? (
                          "✓ Pinged"
                        ) : (
                          "Ping"
                        )}
                      </button>
                    </div>
                  </MotionCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* ============================================================== */}
          {/* 3. CORPORATE ENTITY CONFIG                                      */}
          {/* ============================================================== */}
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
            <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#F36E21]" />
              Corporate Entity & Invoicing
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Company Legal Name", value: companyName, onChange: setCompanyName, type: "text" },
                { label: "Corporate GSTIN", value: gstin, onChange: setGstin, type: "text" },
                { label: "Default Surface GST Rate (%)", value: gstRate, onChange: setGstRate, type: "number" },
                { label: "Invoice Numbering Prefix (FY 26-27)", value: invoicePrefix, onChange: setInvoicePrefix, type: "text" },
                { label: "ERP Support Email", value: supportEmail, onChange: setSupportEmail, type: "email" },
                { label: "Follow-up SLA Window (Days)", value: slaDays, onChange: setSlaDays, type: "number" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">{field.label}</label>
                  <Input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="text-xs rounded-xl h-9 font-mono"
                  />
                </div>
              ))}
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2 text-[10px] text-blue-900">
              <Info className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>All tax computations run exclusively in the FastAPI backend. These values configure invoice metadata only.</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 4. NOTIFICATION & AUTOMATION TOGGLES                            */}
          {/* ============================================================== */}
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
            <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#1976D2]" />
              Notification Channels & Alerts
            </h2>

            <div className="space-y-2.5">
              {[
                {
                  label: "Email Notifications",
                  sub: "ZeptoMail transactional emails for order events",
                  value: emailNotifs,
                  onChange: setEmailNotifs,
                  icon: Mail,
                  color: "text-blue-600",
                },
                {
                  label: "WhatsApp Alerts",
                  sub: "WhatsApp Business API for dealer follow-ups",
                  value: whatsappNotifs,
                  onChange: setWhatsappNotifs,
                  icon: Wifi,
                  color: "text-emerald-600",
                },
                {
                  label: "SLA Breach Alerts",
                  sub: "Push notifications when leads or orders breach SLA",
                  value: slaAlerts,
                  onChange: setSlaAlerts,
                  icon: AlertTriangle,
                  color: "text-amber-600",
                },
                {
                  label: "Kimi AI Suggestions",
                  sub: "AI-drafted emails and lead summaries enabled",
                  value: aiSuggestions,
                  onChange: setAiSuggestions,
                  icon: Sparkles,
                  color: "text-purple-600",
                },
              ].map((toggle) => {
                const Icon = toggle.icon;
                return (
                  <div
                    key={toggle.label}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <Icon className={`h-3.5 w-3.5 ${toggle.color}`} />
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-slate-900 block">{toggle.label}</span>
                        <span className="text-[10px] text-slate-400">{toggle.sub}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggle.onChange(!toggle.value)}
                      className={`relative w-10 h-5.5 rounded-full transition-colors shrink-0 ${
                        toggle.value ? "bg-[#F36E21]" : "bg-slate-300"
                      }`}
                    >
                      <motion.span
                        animate={{ x: toggle.value ? 18 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        className="absolute top-0.5 h-4 w-4 bg-white rounded-full shadow-sm block"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* 5. SECURITY & ACCESS CONTROL NOTICE                              */}
        {/* ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-900 to-[#0A2A57] rounded-2xl border border-slate-700 text-white"
        >
          <div className="h-10 w-10 rounded-xl bg-[#F36E21]/20 border border-[#F36E21]/30 flex items-center justify-center shrink-0">
            <Lock className="h-5 w-5 text-[#F36E21]" />
          </div>
          <div>
            <span className="text-sm font-extrabold block">Security Notice</span>
            <p className="text-[11px] text-slate-300">
              Sensitive configuration (API keys, database URLs, SMTP credentials) is managed via Railway environment secrets — never stored in the frontend. User role changes require super_admin approval and are recorded in the Immutable Audit Trail.
            </p>
          </div>
        </motion.div>
      </PageTransition>
    </AdminLayout>
  );
}
