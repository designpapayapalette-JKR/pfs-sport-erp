"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { PageHeader } from "@/components/layout/page-header";
import { useERP } from "@/context/erp-context";
import { AutomationRule } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Input,
  Switch,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@pfs/ui";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  MotionCard,
  LivePulseDot,
} from "@/components/motion";
import {
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  History,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  Bot,
  Activity,
} from "lucide-react";

export default function AutomationsPage() {
  const { automationRules, toggleAutomationRule } = useERP();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [testModalRule, setTestModalRule] = React.useState<AutomationRule | null>(null);
  const [isSimulating, setIsSimulating] = React.useState(false);
  const [simulationResult, setSimulationResult] = React.useState<string | null>(null);

  const categories = ["All", "Inventory", "Leads & CRM", "Orders & Billing", "Dealer Portal"];

  const filteredRules = automationRules.filter(
    (r) => selectedCategory === "All" || r.category === selectedCategory
  );

  const handleTestSimulate = (rule: AutomationRule) => {
    setTestModalRule(rule);
    setSimulationResult(null);
    setIsSimulating(false);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResult(
        `[SUCCESS] Event trigger evaluated successfully.\n[SUCCESS] Condition satisfied: Available Qty (8,400) <= Reorder Level (10,000).\n[SUCCESS] Mock Outbox job dispatched to ZeptoMail and In-App notification queues in 42ms with idempotency key.`
      );
    }, 1200);
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-6">
        {/* Standardized Page Header */}
        <PageHeader
          title="Workflow Automations Engine"
          description="Deterministic Trigger → Condition → Action rules with idempotent outbox execution, ZeptoMail dispatch, and audit trail logging (PRD §10 Engine)."
          badgeText="FastQueue Workers Running"
          badgeVariant="success"
          pulseColor="emerald"
        />

        {/* Global Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-white border border-slate-200/80 shadow-xs rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Rules</p>
            <p className="text-2xl font-black text-slate-900 mt-1 font-mono">
              {automationRules.filter((r) => r.status === "active").length} / {automationRules.length}
            </p>
          </Card>
          <Card className="p-4 bg-white border border-slate-200/80 shadow-xs rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Executions (24h)</p>
            <p className="text-2xl font-black text-emerald-700 mt-1 font-mono">148 Runs</p>
          </Card>
          <Card className="p-4 bg-white border border-slate-200/80 shadow-xs rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Success Rate</p>
            <p className="text-2xl font-black text-slate-900 mt-1 font-mono">99.4%</p>
          </Card>
          <Card className="p-4 bg-white border border-slate-200/80 shadow-xs rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Outbox Queue Lag</p>
            <p className="text-2xl font-black text-primary mt-1 font-mono">18 ms</p>
          </Card>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#0A2A57] text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rules Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRules.map((rule) => {
            const isActive = rule.status === "active";

            return (
              <StaggerItem key={rule.id}>
                <MotionCard className="p-5 bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all rounded-2xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" size="sm" className="rounded-full text-[10px]">
                            {rule.category}
                          </Badge>
                          <span className="font-mono text-[10px] text-slate-400">{rule.id}</span>
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-900 mt-1">
                          {rule.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-500">
                          {isActive ? "Enabled" : "Paused"}
                        </span>
                        <Switch
                          checked={isActive}
                          onCheckedChange={() => toggleAutomationRule(rule.id)}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {rule.description}
                    </p>

                    {/* Trigger -> Action Formula */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="text-[10px] uppercase font-bold text-[#1976D2] w-14">Trigger:</span>
                        <span className="text-slate-900 font-semibold">{rule.trigger}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="text-[10px] uppercase font-bold text-[#B9903C] w-14">Action:</span>
                        <span className="text-slate-900 font-semibold">{rule.action}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="text-[11px] text-slate-400 font-mono">
                      <span>Executions: {rule.executionCount}</span> • <span>Last: {rule.lastTriggered}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-xl font-bold"
                      onClick={() => handleTestSimulate(rule)}
                    >
                      <Play className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
                      Dry Run Test
                    </Button>
                  </div>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Test Simulation Modal */}
        {testModalRule && (
          <Dialog open={!!testModalRule} onOpenChange={() => setTestModalRule(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base font-extrabold text-slate-900">
                  Dry-Run Rule Simulation
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 font-mono">
                  Rule: {testModalRule.name} ({testModalRule.id})
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">Trigger Condition:</p>
                  <p className="text-slate-600 font-mono mt-0.5">{testModalRule.trigger}</p>
                </div>

                {simulationResult && (
                  <div className="p-3 bg-slate-900 text-emerald-400 rounded-xl border border-slate-800 font-mono text-[11px] whitespace-pre-wrap">
                    {simulationResult}
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setTestModalRule(null)} className="rounded-xl text-xs">
                  Close
                </Button>
                <Button
                  variant="accent"
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="rounded-xl text-xs font-bold"
                >
                  {isSimulating ? (
                    <>
                      <RotateCcw className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Evaluating...
                    </>
                  ) : (
                    <>
                      <Play className="mr-1.5 h-3.5 w-3.5" /> Execute Test Payload
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </PageTransition>
    </AdminLayout>
  );
}
