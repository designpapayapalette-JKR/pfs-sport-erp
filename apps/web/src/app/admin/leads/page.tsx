"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import { CRMLead } from "@/lib/mock-data";
import {
  Card,
  Button,
  Badge,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@pfs/ui";
import {
  Users,
  Plus,
  Search,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Flame,
  Filter,
  Check,
  ChevronRight,
  Building2,
  Calendar,
  DollarSign,
  ArrowUpDown,
  MoreHorizontal,
  Download,
  AlertTriangle,
  MoveRight,
  ChevronLeft,
  GripVertical,
  X,
} from "lucide-react";
import { PageTransition, MotionCard, LivePulseDot } from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";

interface StageConfig {
  key: CRMLead["stage"];
  label: string;
  dotColor: string;
  headerBg: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
}

const stages: StageConfig[] = [
  {
    key: "New",
    label: "New Leads",
    dotColor: "bg-sky-500",
    headerBg: "bg-sky-500/10",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-800",
    borderColor: "border-sky-200",
  },
  {
    key: "Contacted",
    label: "Contacted",
    dotColor: "bg-blue-500",
    headerBg: "bg-blue-500/10",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    borderColor: "border-blue-200",
  },
  {
    key: "Qualified",
    label: "Qualified",
    dotColor: "bg-[#E0A925]",
    headerBg: "bg-[#E0A925]/15",
    badgeBg: "bg-[#FDF7E7]",
    badgeText: "text-[#9A7007]",
    borderColor: "border-[#E0A925]/40",
  },
  {
    key: "Estimate/Quote",
    label: "Estimate / Quote",
    dotColor: "bg-purple-500",
    headerBg: "bg-purple-500/10",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    borderColor: "border-purple-200",
  },
  {
    key: "Won",
    label: "Won Deals",
    dotColor: "bg-emerald-500",
    headerBg: "bg-emerald-500/10",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    borderColor: "border-emerald-200",
  },
  {
    key: "Nurture",
    label: "Nurture / Later",
    dotColor: "bg-slate-400",
    headerBg: "bg-slate-100",
    badgeBg: "bg-slate-200",
    badgeText: "text-slate-700",
    borderColor: "border-slate-200",
  },
];

const stageOrder: CRMLead["stage"][] = [
  "New",
  "Contacted",
  "Qualified",
  "Estimate/Quote",
  "Won",
  "Nurture",
];

export default function LeadsPage() {
  const { leads, updateLeadStage, addLeadNote, openAIModal, createLead } = useERP();

  const [viewMode, setViewMode] = React.useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSportFilter, setSelectedSportFilter] = React.useState("All");
  const [selectedScoreFilter, setSelectedScoreFilter] = React.useState<"all" | "hot" | "warm" | "cold">("all");
  const [selectedLeadIds, setSelectedLeadIds] = React.useState<string[]>([]);
  const [sortField, setSortField] = React.useState<"score" | "name" | "courts">("score");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  // Selected Lead Drawer / Modal State
  const [activeLead, setActiveLead] = React.useState<CRMLead | null>(null);
  const [newNoteText, setNewNoteText] = React.useState("");

  // Drag & Drop State
  const [draggedLeadId, setDraggedLeadId] = React.useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = React.useState<CRMLead["stage"] | null>(null);

  // Create Lead Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [newFullName, setNewFullName] = React.useState("");
  const [newOrg, setNewOrg] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newPhone, setNewPhone] = React.useState("");
  const [newCity, setNewCity] = React.useState("Pune");
  const [newState, setNewState] = React.useState("Maharashtra");
  const [newSport, setNewSport] = React.useState<CRMLead["sportInterest"]>("Pickleball");
  const [newCourtCount, setNewCourtCount] = React.useState(2);
  const [newProjectType, setNewProjectType] = React.useState<CRMLead["projectType"]>("Sports Club / Resort");
  const [newBudget, setNewBudget] = React.useState<CRMLead["budgetBand"]>("₹15L - ₹35L");
  const [newTimeline, setNewTimeline] = React.useState<CRMLead["timeline"]>("Immediate (< 30 days)");
  const [newAssignedTo, setNewAssignedTo] = React.useState("Siddharth Verma (Regional Lead)");
  const [newInitialNote, setNewInitialNote] = React.useState("");
  const [createSuccess, setCreateSuccess] = React.useState(false);

  // Filter & Sort Leads
  const filteredLeads = leads
    .filter((l) => {
      const matchesSport = selectedSportFilter === "All" || l.sportInterest === selectedSportFilter;
      const matchesScore =
        selectedScoreFilter === "all"
          ? true
          : selectedScoreFilter === "hot"
          ? l.score >= 80
          : selectedScoreFilter === "warm"
          ? l.score >= 50 && l.score < 80
          : l.score < 50;
      const matchesSearch =
        l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.leadNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSport && matchesScore && matchesSearch;
    })
    .sort((a, b) => {
      if (sortField === "score") {
        return sortOrder === "desc" ? b.score - a.score : a.score - b.score;
      }
      if (sortField === "courts") {
        return sortOrder === "desc" ? b.courtCount - a.courtCount : a.courtCount - b.courtCount;
      }
      return sortOrder === "desc"
        ? b.fullName.localeCompare(a.fullName)
        : a.fullName.localeCompare(b.fullName);
    });

  // Calculate Pipeline Metrics
  const totalLeadsCount = leads.length;
  const hotLeadsCount = leads.filter((l) => l.score >= 80).length;
  const slaBreachCount = leads.filter((l) => l.slaBreach).length;
  const wonLeadsCount = leads.filter((l) => l.stage === "Won").length;
  const estimatedPipelineValue = leads.reduce((acc, l) => {
    return acc + l.courtCount * 550000;
  }, 0);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeLead) return;
    addLeadNote(activeLead.id, newNoteText);
    setNewNoteText("");
    const updated = leads.find((l) => l.id === activeLead.id);
    if (updated) setActiveLead(updated);
  };

  const handleAISummarize = (lead: CRMLead) => {
    openAIModal("lead_summary", `Kimi AI — Lead Summary for ${lead.fullName}`, {
      leadName: lead.fullName,
      org: lead.organization,
      courtCount: lead.courtCount,
      sport: lead.sportInterest,
      city: lead.city,
    });
  };

  const handleAIDraftEmail = (lead: CRMLead) => {
    openAIModal("email_draft", `Kimi AI — Proposal Email for ${lead.organization}`, {
      leadName: lead.fullName,
      projectName: `${lead.organization} ${lead.sportInterest} Facility`,
      courtCount: lead.courtCount,
      senderName: lead.assignedTo,
      estimatedLow: 520000 * lead.courtCount,
      estimatedHigh: 650000 * lead.courtCount,
    });
  };

  const handleWhatsAppChat = (lead: CRMLead) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Hi ${lead.fullName}, this is ${lead.assignedTo} from PFS Sport regarding your inquiry for ${lead.courtCount} ${lead.sportInterest} court(s) at ${lead.organization}. When would be a good time for a quick 5-min chat?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  const handleAdvanceStage = (leadId: string, currentStage: CRMLead["stage"], e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex < stageOrder.length - 2) {
      const nextStage = stageOrder[currentIndex + 1];
      updateLeadStage(leadId, nextStage);
    } else if (currentStage !== "Won") {
      updateLeadStage(leadId, "Won");
    }
  };

  const handleMoveBackStage = (leadId: string, currentStage: CRMLead["stage"], e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex > 0) {
      const prevStage = stageOrder[currentIndex - 1];
      updateLeadStage(leadId, prevStage);
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeadIds.length === filteredLeads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(filteredLeads.map((l) => l.id));
    }
  };

  const toggleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-4">
        {/* ========================================================================= */}
        {/* 1. TOP PIPELINE COMMAND BAR & STATS TELEMETRY                             */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                CRM & Inbound Lead Pipeline
              </h1>
              <Badge variant="gold" className="rounded-full text-[10px] font-extrabold flex items-center gap-1.5 px-2.5 py-0.5">
                <LivePulseDot color="orange" size="sm" />
                Territory Engine Live
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Inbound court leads, rules-based scoring (0-100), automated dealer routing, and Kimi AI proposal drafts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                const btn = e.currentTarget;
                btn.textContent = "✓ Template Ready";
                btn.disabled = true;
                setTimeout(() => { btn.innerHTML = '<svg class="mr-1.5 h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 17H7A5 5 0 017 7h1"/><path d="M15 7h1a5 5 0 010 10h-1"/><line x1="8" y1="12" x2="16" y2="12"/></svg>Import CSV'; btn.disabled = false; }, 1500);
              }}
              className="rounded-xl border-slate-200 text-xs font-bold text-slate-700"
            >
              <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
              Import CSV
            </Button>

            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              className="rounded-xl bg-[#F36E21] hover:bg-[#D95D16] text-white text-xs font-extrabold shadow-xs"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Create Lead
            </Button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. 4-COLUMN PIPELINE TELEMETRY STRIP                                      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Total Pipeline Leads
              </span>
              <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">
                {totalLeadsCount} Leads
              </span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="h-4.5 w-4.5" />
            </div>
          </Card>

          <Card className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Est. Pipeline Value
              </span>
              <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">
                ₹{(estimatedPipelineValue / 100000).toFixed(1)} Lakhs
              </span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-[#FDF7E7] text-[#9A7007] flex items-center justify-center font-bold">
              <DollarSign className="h-4.5 w-4.5" />
            </div>
          </Card>

          <Card className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Hot Priority (Score ≥80)
              </span>
              <span className="text-xl font-black text-[#F36E21] font-mono mt-0.5 block">
                {hotLeadsCount} Inquiries
              </span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-orange-50 text-[#F36E21] flex items-center justify-center font-bold">
              <Flame className="h-4.5 w-4.5" />
            </div>
          </Card>

          <Card className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Deals Won (Q3)
              </span>
              <span className="text-xl font-black text-emerald-700 font-mono mt-0.5 block">
                {wonLeadsCount} Closed
              </span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </Card>
        </div>

        {/* ========================================================================= */}
        {/* 3. TOOLBAR WITH KANBAN/TABLE SWITCHER & SMART FILTERS                     */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row gap-2.5 justify-between items-start md:items-center bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* View Switcher Pill */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-0.5 text-xs font-bold">
              <button
                onClick={() => setViewMode("kanban")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === "kanban"
                    ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Kanban Board
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === "table"
                    ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Table View ({filteredLeads.length})
              </button>
            </div>

            {/* Sport Filter */}
            <select
              value={selectedSportFilter}
              onChange={(e) => setSelectedSportFilter(e.target.value)}
              className="h-8 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 focus:outline-none shadow-2xs"
            >
              <option value="All">All Sports</option>
              <option value="Pickleball">Pickleball</option>
              <option value="Tennis">Tennis</option>
              <option value="Padel">Padel</option>
              <option value="Badminton">Badminton</option>
              <option value="Basketball">Basketball</option>
            </select>

            {/* Score Filter */}
            <div className="flex items-center gap-1">
              {(["all", "hot", "warm"] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => setSelectedScoreFilter(sc)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                    selectedScoreFilter === sc
                      ? "bg-[#040C1A] text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {sc}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lead, city, org..."
                className="h-8 pl-8.5 text-xs rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. EXPANSIVE HORIZONTAL SCROLLING KANBAN BOARD VIEW (DRAG & DROP ENABLED) */}
        {/* ========================================================================= */}
        {viewMode === "kanban" && (
          <div className="w-full overflow-x-auto pb-4 pt-1">
            <div className="flex items-start gap-4 min-w-max">
              {stages.map((stage, sIdx) => {
                const stageLeads = filteredLeads.filter((l) => l.stage === stage.key);
                const stageValue = stageLeads.reduce((sum, l) => sum + l.courtCount * 550000, 0);
                const isDropTarget = dragOverStage === stage.key;

                return (
                  <div
                    key={stage.key}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = "move";
                      if (dragOverStage !== stage.key) {
                        setDragOverStage(stage.key);
                      }
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDragOverStage(stage.key);
                    }}
                    onDragLeave={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setDragOverStage(null);
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const leadId = e.dataTransfer.getData("text/plain") || draggedLeadId;
                      if (leadId) {
                        updateLeadStage(leadId, stage.key);
                      }
                      setDraggedLeadId(null);
                      setDragOverStage(null);
                    }}
                    className={`w-[300px] sm:w-[320px] rounded-2xl border transition-all duration-150 ${
                      isDropTarget
                        ? "border-blue-500 ring-2 ring-blue-500/40 bg-blue-50/90 shadow-md scale-[1.01]"
                        : `${stage.borderColor} bg-slate-50/70 shadow-xs`
                    } p-3 flex flex-col shrink-0`}
                  >
                    {/* Stage Header */}
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/90">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`h-2.5 w-2.5 rounded-full ${stage.dotColor} shrink-0`} />
                        <h2 className="text-xs font-black text-slate-900 uppercase tracking-tight truncate">
                          {stage.label}
                        </h2>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black font-mono shadow-2xs border ${stage.badgeBg} ${stage.badgeText} border-black/5`}>
                          {stageLeads.length}
                        </span>
                      </div>
                    </div>

                    {/* Stage Value Telemetry Subtitle */}
                    <div className="mb-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
                      <span className="font-sans font-medium text-slate-400">Total Volume:</span>
                      <strong className="text-slate-900 font-bold">
                        ₹{(stageValue / 100000).toFixed(1)} Lakhs
                      </strong>
                    </div>

                    {/* Drag Over Active Drop Placeholder Indicator */}
                    {isDropTarget && draggedLeadId && (
                      <div className="mb-2.5 py-2.5 px-3 rounded-xl border-2 border-dashed border-blue-400 bg-blue-100/60 text-center text-[11px] font-bold text-blue-800 animate-pulse flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                        <span>Drop to move to {stage.label}</span>
                      </div>
                    )}

                    {/* Kanban Cards Scroll Area */}
                    <div className="space-y-3 min-h-[380px] max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                      {stageLeads.map((lead) => {
                        const isHot = lead.score >= 80;
                        const isBeingDragged = draggedLeadId === lead.id;

                        return (
                          <div
                            key={lead.id}
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.setData("text/plain", lead.id);
                              e.dataTransfer.effectAllowed = "move";
                              setDraggedLeadId(lead.id);
                            }}
                            onDragEnd={() => {
                              setDraggedLeadId(null);
                              setDragOverStage(null);
                            }}
                            onClick={() => setActiveLead(lead)}
                            className={`p-3.5 bg-white border cursor-grab active:cursor-grabbing hover:shadow-md transition-all rounded-xl relative group ${
                              isBeingDragged
                                ? "opacity-30 border-dashed border-blue-400 scale-95 bg-blue-50/20"
                                : lead.slaBreach
                                ? "border-amber-300 bg-amber-50/20 ring-1 ring-amber-300/40 shadow-2xs"
                                : isHot
                                ? "border-l-[3.5px] border-l-[#F36E21] border-slate-200/90 shadow-2xs"
                                : "border-slate-200/90 shadow-2xs"
                            }`}
                          >
                            {/* Card Header: Score & SLA & Drag Handle */}
                            <div className="flex items-start justify-between gap-1 mb-2">
                              <div className="flex items-center gap-1.5">
                                <Badge
                                  variant={isHot ? "accent" : "gold"}
                                  size="sm"
                                  className="text-[9px] font-extrabold rounded-full px-2 py-0 flex items-center gap-1"
                                >
                                  {isHot && <Flame className="h-2.5 w-2.5 text-white fill-current" />}
                                  Score: {lead.score}
                                </Badge>

                                {lead.slaBreach && (
                                  <span className="text-[9px] font-bold text-amber-800 flex items-center gap-1 bg-amber-100/80 px-1.5 py-0.5 rounded font-mono">
                                    <AlertTriangle className="h-2.5 w-2.5 text-amber-700" /> Overdue
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <span className="text-[9px] font-mono text-slate-400 font-semibold">
                                  #{lead.leadNumber}
                                </span>
                                <GripVertical className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 shrink-0" />
                              </div>
                            </div>

                            {/* Lead Name & Organization */}
                            <h3 className="font-extrabold text-xs text-slate-900 group-hover:text-primary transition-colors leading-snug">
                              {lead.fullName}
                            </h3>
                            <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5 flex items-center gap-1">
                              <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
                              <span className="truncate">{lead.organization}</span>
                            </p>

                            {/* Specs Strip: Sport & Budget */}
                            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                              <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                {lead.courtCount}x {lead.sportInterest}
                              </span>
                              <span className="font-mono font-bold text-emerald-700">
                                {lead.budgetBand}
                              </span>
                            </div>

                            {/* Territory & Assigned Rep */}
                            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                              <span className="flex items-center gap-1 truncate font-sans text-slate-500">
                                <MapPin className="h-2.5 w-2.5 text-slate-400" />
                                {lead.city}
                              </span>
                              <span className="truncate max-w-[110px]">{lead.assignedTo}</span>
                            </div>

                            {/* Quick 1-Click Action Toolbar */}
                            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                              {/* Left & Right Stage Shifters */}
                              <div className="flex items-center gap-1">
                                {sIdx > 0 && (
                                  <button
                                    onClick={(e) => handleMoveBackStage(lead.id, lead.stage, e)}
                                    className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                                    title="Move to previous stage"
                                  >
                                    <ChevronLeft className="h-3 w-3" />
                                  </button>
                                )}

                                {sIdx < stages.length - 1 && (
                                  <button
                                    onClick={(e) => handleAdvanceStage(lead.id, lead.stage, e)}
                                    className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors flex items-center gap-0.5 text-[9px] font-bold"
                                    title="Move to next stage"
                                  >
                                    <span>Next</span>
                                    <ChevronRight className="h-3 w-3" />
                                  </button>
                                )}
                              </div>

                              {/* Speed Communications */}
                              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => handleWhatsAppChat(lead)}
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                                  title="WhatsApp Chat"
                                >
                                  <MessageSquare className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handleAIDraftEmail(lead)}
                                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                                  title="Draft Proposal with Kimi AI"
                                >
                                  <Mail className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {stageLeads.length === 0 && (
                        <div className="py-12 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200/90 rounded-2xl bg-white/50 flex flex-col items-center justify-center gap-1.5">
                          <CheckCircle2 className="h-5 w-5 text-slate-300" />
                          <span className="font-semibold text-[11px]">No leads in {stage.label}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. INTERACTIVE TABLE VIEW WITH MULTI-SELECT & SORTING                     */}
        {/* ========================================================================= */}
        {viewMode === "table" && (
          <Card className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden" padding="none">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/90">
                  <TableRow>
                    <TableHead className="w-10">
                      <input
                        type="checkbox"
                        checked={selectedLeadIds.length === filteredLeads.length && filteredLeads.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                      />
                    </TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs">Lead & Client Org</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs">Sport & Courts</TableHead>
                    <TableHead
                      className="font-bold text-slate-800 text-xs cursor-pointer select-none"
                      onClick={() => {
                        setSortField("score");
                        setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <span>Lead Score</span>
                        <ArrowUpDown className="h-3 w-3 text-slate-400" />
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs">Pipeline Stage</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs">Location & Territory</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs text-right">Estimated Value</TableHead>
                    <TableHead className="font-bold text-slate-800 text-xs text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => {
                    const isSelected = selectedLeadIds.includes(lead.id);

                    return (
                      <TableRow
                        key={lead.id}
                        className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                          isSelected ? "bg-blue-50/40" : ""
                        }`}
                        onClick={() => setActiveLead(lead)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectLead(lead.id)}
                            className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#040C1A] to-[#122238] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                              {lead.fullName.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-xs text-slate-900 block">{lead.fullName}</span>
                              <span className="text-[10px] text-slate-500 font-medium">{lead.organization}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-xs text-slate-900">
                            {lead.courtCount}x {lead.sportInterest}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {lead.sportInterest === "Pickleball" ? "8-Layer Acrylic" : "PP Tiles"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={lead.score >= 80 ? "accent" : "gold"}
                            size="sm"
                            className="rounded-full text-[10px] font-mono font-bold"
                          >
                            Score: {lead.score}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" size="sm" className="rounded-full text-[10px] font-bold">
                            {lead.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-slate-700 block">{lead.city}, {lead.state}</span>
                          <span className="text-[10px] text-slate-400 font-mono">Assigned: {lead.assignedTo}</span>
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-xs text-slate-900">
                          ₹{((lead.courtCount * 550000) / 100000).toFixed(2)}L
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() => handleWhatsAppChat(lead)}
                              title="Chat on WhatsApp"
                              className="h-7 w-7 rounded-lg text-emerald-700 hover:bg-emerald-50"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() => handleAIDraftEmail(lead)}
                              title="Draft Proposal Email with Kimi AI"
                              className="h-7 w-7 rounded-lg text-blue-700 hover:bg-blue-50"
                            >
                              <Mail className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* 6. ENTERPRISE SLIDE-OVER SHEET: LEAD DOSSIER & ACTIONS                    */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {activeLead && (
            <div className="fixed inset-0 z-[100] flex justify-start">
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveLead(null)}
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
              />

              {/* Slide-over Left Sheet Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="relative z-10 w-full sm:max-w-xl md:max-w-2xl bg-white h-screen shadow-2xl flex flex-col border-r border-slate-200 overflow-hidden"
              >
                {/* Sticky Header Banner */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white flex items-center justify-between border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20 text-[#E0A925] flex items-center justify-center font-black shadow-inner shrink-0">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black text-white tracking-tight truncate">
                          {activeLead.fullName}
                        </h2>
                        <Badge
                          variant={activeLead.score >= 80 ? "accent" : "gold"}
                          className="rounded-full text-[10px] font-mono px-2.5 py-0.5"
                        >
                          Score: {activeLead.score} ({activeLead.scoreBand})
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 truncate">
                        {activeLead.organization} • Lead #{activeLead.leadNumber} • {activeLead.city}, {activeLead.state}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveLead(null)}
                    className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 shrink-0"
                  >
                    <X className="h-4.5 w-4.5 stroke-[2.2]" />
                    <span className="sr-only">Close Dossier</span>
                  </button>
                </div>

                {/* Scrollable Dossier Content */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
                  {/* Quick Action Button Trio */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWhatsAppChat(activeLead)}
                      className="text-xs text-emerald-800 border-emerald-300 hover:bg-emerald-50 rounded-xl font-bold h-9.5"
                    >
                      <MessageSquare className="mr-1.5 h-4 w-4 text-emerald-600" /> WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAISummarize(activeLead)}
                      className="text-xs text-primary border-primary/30 hover:bg-primary/5 rounded-xl font-bold h-9.5"
                    >
                      <Sparkles className="mr-1.5 h-4 w-4 text-[#1976D2]" /> AI Summary
                    </Button>

                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => handleAIDraftEmail(activeLead)}
                      className="text-xs rounded-xl font-bold bg-[#F36E21] hover:bg-[#D95D16] text-white h-9.5"
                    >
                      <Mail className="mr-1.5 h-4 w-4" /> Draft Proposal
                    </Button>
                  </div>

                  {/* ============================================================ */}
                  {/* LEAD DETAILS CARD — Contact, Project & Timeline Info         */}
                  {/* ============================================================ */}
                  <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                    <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-slate-500" />
                      Lead Details
                    </h4>

                    {/* Contact Row */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href={`mailto:${activeLead.email}`}
                        className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:bg-blue-50 hover:border-blue-200 group transition-colors min-w-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Email</span>
                          <span className="text-[10px] font-semibold text-slate-800 truncate block group-hover:text-blue-700">
                            {activeLead.email}
                          </span>
                        </div>
                      </a>

                      <a
                        href={`tel:${activeLead.phone}`}
                        className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:bg-emerald-50 hover:border-emerald-200 group transition-colors min-w-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Phone</span>
                          <span className="text-[10px] font-semibold text-slate-800 truncate block group-hover:text-emerald-700">
                            {activeLead.phone}
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Project Type & Timeline Row */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 min-w-0">
                        <Building2 className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Project Type</span>
                          <span className="text-[10px] font-semibold text-slate-800 truncate block">
                            {activeLead.projectType}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 min-w-0">
                        <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Timeline</span>
                          <span className="text-[10px] font-semibold text-slate-800 truncate block">
                            {activeLead.timeline}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dates Row */}
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                      <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
                        <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block mb-0.5">Created</span>
                        <span className="font-bold text-slate-800 block">
                          {new Date(activeLead.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
                        <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block mb-0.5">Last Follow-up</span>
                        <span className="font-bold text-slate-800 block">
                          {new Date(activeLead.lastFollowUp).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                        </span>
                      </div>
                      <div className={`p-2 rounded-xl border text-center ${activeLead.slaBreach ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200/80"}`}>
                        <span className={`text-[9px] font-sans font-bold uppercase block mb-0.5 ${activeLead.slaBreach ? "text-amber-600" : "text-slate-400"}`}>
                          Next Due
                        </span>
                        <span className={`font-black block truncate ${activeLead.slaBreach ? "text-amber-700" : "text-slate-800"}`}>
                          {activeLead.nextFollowUpDue === "Today"
                            ? "Today"
                            : new Date(activeLead.nextFollowUpDue).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                        </span>
                      </div>
                    </div>

                    {/* SLA Breach Alert */}
                    {activeLead.slaBreach && (
                      <div className="flex items-center gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[10px] font-bold text-amber-800">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        SLA Breach — Follow-up overdue. Immediate action required.
                      </div>
                    )}
                  </div>

                  {/* Pipeline Stage Selector Pill Matrix */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2.5">
                    <label className="font-extrabold text-slate-800 block text-xs">
                      Advance CRM Pipeline Stage:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {stages.map((st) => (
                        <button
                          key={st.key}
                          onClick={() => {
                            updateLeadStage(activeLead.id, st.key);
                            setActiveLead({ ...activeLead, stage: st.key });
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                            activeLead.stage === st.key
                              ? "bg-[#040C1A] text-white shadow-xs"
                              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Specifications Card */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3 font-mono text-xs">
                    <h4 className="font-sans font-bold text-slate-900 text-xs">Project Specifications</h4>
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 block uppercase text-[9px] font-sans font-bold">Sport Surface</span>
                        <span className="font-bold text-slate-900">{activeLead.sportInterest}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 block uppercase text-[9px] font-sans font-bold">Court Quantity</span>
                        <span className="font-bold text-slate-900">{activeLead.courtCount} Courts</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 block uppercase text-[9px] font-sans font-bold">Indicative Budget</span>
                        <span className="font-bold text-emerald-700">{activeLead.budgetBand}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 block uppercase text-[9px] font-sans font-bold">Assigned Rep</span>
                        <span className="font-bold text-slate-900 truncate block">{activeLead.assignedTo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Notes & History */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 text-xs">Interaction Notes &amp; History</h4>

                    <form onSubmit={handleAddNote} className="space-y-2">
                      <Input
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Add note (e.g. Sent sample RAL 5012 tile swatches)..."
                        className="text-xs rounded-xl"
                      />
                      <div className="flex justify-end">
                        <Button type="submit" variant="default" size="sm" className="text-xs rounded-xl font-bold bg-[#040C1A] text-white">
                          Post Note
                        </Button>
                      </div>
                    </form>

                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {activeLead.notes && activeLead.notes.length > 0 ? (
                        activeLead.notes.map((note) => (
                          <div key={note.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] space-y-1">
                            <p className="text-slate-800 leading-relaxed">{note.text}</p>
                            <span className="text-[9px] text-slate-400 font-mono block">
                              Logged by {note.author} • {note.timestamp}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-slate-400 text-xs border border-dashed rounded-xl">
                          No activity notes logged yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={() => setActiveLead(null)}
                    className="rounded-xl text-xs font-bold px-4 h-10 text-slate-700"
                  >
                    Close Dossier
                  </Button>

                  <Link href="/dealer/estimator">
                    <Button
                      variant="accent"
                      size="default"
                      className="rounded-xl text-xs font-bold bg-[#F36E21] hover:bg-[#D95D16] text-white h-10 px-5"
                    >
                      Generate Turnkey Estimate →
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 7. ENTERPRISE SLIDE-OVER SHEET: CREATE INBOUND LEAD                      */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-[100] flex justify-start">
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCreateModalOpen(false)}
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
              />

              {/* Slide-over Left Sheet Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="relative z-10 w-full sm:max-w-xl md:max-w-2xl bg-white h-screen shadow-2xl flex flex-col border-r border-slate-200 overflow-hidden"
              >
                {/* Sticky Header Banner */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-[#040C1A] via-[#0A223E] to-[#122A4E] text-white flex items-center justify-between border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20 text-[#E0A925] flex items-center justify-center font-black shadow-inner shrink-0">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                          Create Inbound Lead &amp; Opportunity
                        </h2>
                        <Badge variant="gold" size="sm" className="rounded-full text-[10px] font-mono">
                          FastQueue AI
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Automated territory routing, SLA dispatch timers &amp; predictive scoring.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 shrink-0"
                  >
                    <X className="h-4.5 w-4.5 stroke-[2.2]" />
                    <span className="sr-only">Close Drawer</span>
                  </button>
                </div>

                {/* Real-time Project Value & Scoring Preview Ribbon */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 border-b border-slate-200/80 shrink-0 text-xs font-mono">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-slate-400 uppercase block">Surface Scope</span>
                    <strong className="text-slate-900 font-bold block truncate">
                      {newCourtCount} {newSport} ({((newSport === "Pickleball" ? 1800 : newSport === "Tennis" ? 7200 : newSport === "Padel" ? 2178 : newSport === "Basketball" ? 4200 : 1800) * newCourtCount).toLocaleString("en-IN")} sq ft)
                    </strong>
                  </div>
                  <div className="p-2.5 bg-emerald-50/90 rounded-xl border border-emerald-200 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-emerald-800 uppercase block">Est. Materials</span>
                    <strong className="text-emerald-900 font-black block truncate">
                      ₹{(((newSport === "Pickleball" ? 1800 : newSport === "Tennis" ? 7200 : newSport === "Padel" ? 2178 : newSport === "Basketball" ? 4200 : 1800) * newCourtCount * 185)).toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-200 shadow-2xs">
                    <span className="text-[9px] font-sans font-bold text-amber-800 uppercase block">AI Propensity</span>
                    <strong className="text-amber-900 font-black block flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-orange-500" /> 92/100 (Hot)
                    </strong>
                  </div>
                </div>

                {/* Scrollable Form Body */}
                <form
                  id="create-lead-slideover-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const created = createLead({
                      fullName: newFullName || "Anand Mehra",
                      organization: newOrg || "Deccan Sports Facility",
                      email: newEmail || "contact@deccansports.in",
                      phone: newPhone || "+91 98201 44521",
                      city: newCity || "Pune",
                      state: newState || "Maharashtra",
                      sportInterest: newSport,
                      projectType: newProjectType,
                      courtCount: Number(newCourtCount) || 2,
                      budgetBand: newBudget,
                      timeline: newTimeline,
                      stage: "New",
                      scoreBand: "Hot",
                      assignedTo: newAssignedTo,
                      leadNumber: `LEAD-2026-${Math.floor(100 + Math.random() * 900)}`,
                      nextFollowUpDue: "Today",
                      slaBreach: false,
                    });

                    if (newInitialNote.trim()) {
                      addLeadNote(created.id, newInitialNote.trim());
                    }

                    setCreateSuccess(true);
                    setTimeout(() => {
                      setCreateSuccess(false);
                      setIsCreateModalOpen(false);
                      setActiveLead(created);
                      setNewFullName("");
                      setNewOrg("");
                      setNewEmail("");
                      setNewPhone("");
                      setNewInitialNote("");
                    }, 700);
                  }}
                  className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs"
                >
                  {/* Section 1: Prospect & Facility Metadata */}
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3">
                    <span className="font-extrabold text-slate-800 block text-xs flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-500" />
                      Prospect &amp; Client Entity Identity
                    </span>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Contact Person Name *</label>
                        <Input
                          required
                          value={newFullName}
                          onChange={(e) => setNewFullName(e.target.value)}
                          placeholder="e.g. Anand Mehra"
                          className="text-xs rounded-xl bg-white h-10"
                        />
                      </div>
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Organization / Club / School *</label>
                        <Input
                          required
                          value={newOrg}
                          onChange={(e) => setNewOrg(e.target.value)}
                          placeholder="e.g. Deccan Gymkhana Club"
                          className="text-xs rounded-xl bg-white h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Corporate Email Address *</label>
                        <Input
                          type="email"
                          required
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="anand@deccangymkhana.org"
                          className="text-xs rounded-xl bg-white h-10"
                        />
                      </div>
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Phone / WhatsApp Number *</label>
                        <Input
                          required
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          placeholder="+91 98201 44521"
                          className="text-xs rounded-xl bg-white h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Project City</label>
                        <Input
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          placeholder="e.g. Pune"
                          className="text-xs rounded-xl bg-white h-10"
                        />
                      </div>
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">State / Territory</label>
                        <Input
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          placeholder="e.g. Maharashtra"
                          className="text-xs rounded-xl bg-white h-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Sports Infra Scope & Commercial Parameters */}
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3">
                    <span className="font-extrabold text-slate-800 block text-xs flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-slate-500" />
                      Sports Infrastructure Scope &amp; Commercial Qualification
                    </span>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Sport Surface</label>
                        <select
                          value={newSport}
                          onChange={(e) => setNewSport(e.target.value as CRMLead["sportInterest"])}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                        >
                          <option value="Pickleball">Pickleball</option>
                          <option value="Tennis">Tennis</option>
                          <option value="Padel">Padel</option>
                          <option value="Badminton">Badminton</option>
                          <option value="Basketball">Basketball</option>
                          <option value="Multi-Court Complex">Multi-Court Complex</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Project Facility Type</label>
                        <select
                          value={newProjectType}
                          onChange={(e) => setNewProjectType(e.target.value as CRMLead["projectType"])}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                        >
                          <option value="Sports Club / Resort">Sports Club / Resort</option>
                          <option value="Housing Society">Housing Society</option>
                          <option value="School / University">School / University</option>
                          <option value="Commercial Pay &amp; Play">Commercial Pay &amp; Play</option>
                          <option value="Private Villa">Private Villa</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Court Quantity</label>
                        <Input
                          type="number"
                          min={1}
                          max={50}
                          value={newCourtCount}
                          onChange={(e) => setNewCourtCount(parseInt(e.target.value) || 1)}
                          className="text-xs rounded-xl font-mono font-bold bg-white h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Budget Band</label>
                        <select
                          value={newBudget}
                          onChange={(e) => setNewBudget(e.target.value as CRMLead["budgetBand"])}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                        >
                          <option value="₹5L - ₹15L">₹5L - ₹15L</option>
                          <option value="₹15L - ₹35L">₹15L - ₹35L</option>
                          <option value="₹35L - ₹75L">₹35L - ₹75L</option>
                          <option value="₹75L+">₹75L+</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Target Timeline</label>
                        <select
                          value={newTimeline}
                          onChange={(e) => setNewTimeline(e.target.value as CRMLead["timeline"])}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                        >
                          <option value="Immediate (< 30 days)">Immediate (&lt; 30 days)</option>
                          <option value="1 - 3 Months">1 - 3 Months</option>
                          <option value="3 - 6 Months">3 - 6 Months</option>
                          <option value="Planning Stage">Planning Stage</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-extrabold text-slate-700 block mb-1">Assigned Rep</label>
                        <select
                          value={newAssignedTo}
                          onChange={(e) => setNewAssignedTo(e.target.value)}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F36E21]/30"
                        >
                          <option value="Siddharth Verma (Regional Lead)">Siddharth Verma (West)</option>
                          <option value="Aakash Mehta (Senior Applicator Rep)">Aakash Mehta (North)</option>
                          <option value="Priya Sharma (Corporate Accounts)">Priya Sharma (South)</option>
                          <option value="Apex Sports Infrastructure (Certified Partner)">Apex Sports Infra (Partner)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">Preliminary Site Requirement Note</label>
                      <Input
                        value={newInitialNote}
                        onChange={(e) => setNewInitialNote(e.target.value)}
                        placeholder="e.g. Existing rooftop slab with M30 grade concrete, client requested tournament 8-layer cushion."
                        className="text-xs rounded-xl bg-white h-10"
                      />
                    </div>
                  </div>
                </form>

                {/* Sticky Action Footer */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0 shadow-lg">
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="rounded-xl text-xs font-bold px-4 h-10 text-slate-700"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    form="create-lead-slideover-form"
                    variant="accent"
                    size="default"
                    disabled={createSuccess}
                    className="rounded-xl text-xs font-black bg-[#F36E21] hover:bg-[#D95D16] text-white shadow-md px-6 h-10 flex items-center gap-2"
                  >
                    {createSuccess ? (
                      <>
                        <Check className="h-4 w-4" /> Lead Ingested into Pipeline!
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" /> Save, Score &amp; Ingest Lead →
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </PageTransition>
    </AdminLayout>
  );
}
