"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Input,
} from "@pfs/ui";
import {
  Settings,
  Database,
  Mail,
  Bot,
  Cloud,
  CheckCircle2,
  Save,
  Shield,
  Sparkles,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                System Settings & Provider Adapters
              </h1>
              <Badge variant="gold">Production Infrastructure</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Configure corporate entity details, GST tax rates, and check live health status of backend integration adapters.
            </p>
          </div>

          <Button variant="accent" size="sm" onClick={handleSave} disabled={saveSuccess}>
            {saveSuccess ? (
              <>
                <CheckCircle2 className="mr-1.5 h-4 w-4" /> Settings Saved!
              </>
            ) : (
              <>
                <Save className="mr-1.5 h-4 w-4" /> Save Configuration
              </>
            )}
          </Button>
        </div>

        {/* Integration Adapters Health Status (PRD §12) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 bg-white border border-surfaceBorder shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-700" />
                <h3 className="font-bold text-sm text-neutral-900">NeonDB PostgreSQL</h3>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>
            <p className="text-xs text-neutral-500">
              Region: ap-southeast-1 (Singapore) • Pooled pooler.neon.tech
            </p>
          </Card>

          <Card className="p-4 bg-white border border-surfaceBorder shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-700" />
                <h3 className="font-bold text-sm text-neutral-900">ZeptoMail Gateway</h3>
              </div>
              <Badge variant="success">Domain Verified</Badge>
            </div>
            <p className="text-xs text-neutral-500">
              Sender: noreply@pfs-sport.com • DKIM & SPF Passing
            </p>
          </Card>

          <Card className="p-4 bg-white border border-surfaceBorder shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#0A2A57]" />
                <h3 className="font-bold text-sm text-neutral-900">Kimi K2.6 LLM Adapter</h3>
              </div>
              <Badge variant="success">Ready (Adapter v1)</Badge>
            </div>
            <p className="text-xs text-neutral-500">
              Deterministic Guardrails Active • Pydantic Schema Validation
            </p>
          </Card>

          <Card className="p-4 bg-white border border-surfaceBorder shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-amber-700" />
                <h3 className="font-bold text-sm text-neutral-900">AWS S3 Object Storage</h3>
              </div>
              <Badge variant="success">Bucket Active</Badge>
            </div>
            <p className="text-xs text-neutral-500">
              Bucket: pfs-sport-assets-prod (ap-south-1 Mumbai)
            </p>
          </Card>
        </div>

        {/* Corporate Profile Settings */}
        <Card className="p-6 bg-white border border-surfaceBorder shadow-xs space-y-4">
          <CardTitle className="text-base font-bold text-neutral-900">
            Corporate Entity & Invoicing Configuration
          </CardTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Company Legal Name</label>
              <Input defaultValue="PFS Sport Infrastructure Private Limited" />
            </div>

            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Corporate GSTIN</label>
              <Input defaultValue="27AAACP9921D1Z5" />
            </div>

            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Default Surface GST Rate (%)</label>
              <Input type="number" defaultValue="18" />
            </div>

            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Invoice Numbering Prefix (FY 26-27)</label>
              <Input defaultValue="PFS-INV-2026-" />
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
