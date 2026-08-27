"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import { mockUsers, DealerUser } from "@/lib/mock-data";
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
} from "@pfs/ui";
import {
  PageTransition,
  MotionCard,
  LivePulseDot,
} from "@/components/motion";
import { motion } from "framer-motion";
import {
  Lock,
  Plus,
  Search,
  Shield,
  UserCheck,
  Crown,
  Key,
  CheckCircle2,
  Sliders,
  Check,
  Mail,
  User,
  Building2,
  Truck,
  DollarSign,
  Layers,
  FileText,
  Zap,
  Info,
} from "lucide-react";

interface RolePermissionDef {
  roleKey: string;
  title: string;
  tag: string;
  badgeVariant: "gold" | "platinum" | "accent" | "info" | "outline";
  description: string;
  modules: string[];
  restrictedActions: string[];
}

const roleDefinitions: RolePermissionDef[] = [
  {
    roleKey: "super_admin",
    title: "Super Admin / Managing Director",
    tag: "HQ In-House",
    badgeVariant: "gold",
    description: "Full configuration, users, permissions, products, inventory, dealers, leads, orders, documents, automations, and operational reports.",
    modules: ["All 15 HQ Modules", "Pricing Overrides", "Stock Adjustments", "Credit Limit Config", "Automation Rule Engine", "Immutable Audit Trail"],
    restrictedActions: [],
  },
  {
    roleKey: "sales_manager",
    title: "Sales Manager",
    tag: "Commercial HQ",
    badgeVariant: "info",
    description: "Leads pipeline, dealer accounts, regional assignments, follow-ups, quotes, price approvals, and sales reports.",
    modules: ["Overview Dashboard", "CRM & Leads (All Regions)", "Dealers Directory & KYC", "Pricing & Rate Cards", "Document Vault", "Operational Reports"],
    restrictedActions: ["Stock Adjustment", "System Settings", "User Administration"],
  },
  {
    roleKey: "sales_exec",
    title: "Sales Executive (Rep)",
    tag: "Field Sales",
    badgeVariant: "outline",
    description: "Assigned leads, activity logging, WhatsApp chats, Kimi AI proposal drafts, Turnkey Court Estimator, and dealer onboarding.",
    modules: ["Overview Dashboard", "CRM & Leads (Assigned Only)", "Court Cost Estimator", "Colour Visualiser", "Document Vault"],
    restrictedActions: ["Price Override", "Stock Adjustment", "Credit Limit Config", "Automations Engine"],
  },
  {
    roleKey: "inventory_exec",
    title: "Inventory & Logistics Head",
    tag: "Supply Chain",
    badgeVariant: "accent",
    description: "Products & CMS, central stock allocation, batch tracking, order fulfilment, carrier logistics & AWB tracking, and TDS manuals.",
    modules: ["Overview Dashboard", "Products & CMS", "Inventory & Warehouses", "Order Fulfilment Desk", "Shipments & Carrier Logistics", "Document Vault"],
    restrictedActions: ["Pricing Override", "Lead Pipeline", "User Administration", "Automations Engine"],
  },
  {
    roleKey: "dealer_owner",
    title: "Dealer Owner (Platinum / Gold / Silver)",
    tag: "Authorized Dealer",
    badgeVariant: "platinum",
    description: "Account profile, team staff, catalogue with tier discount, live stock visibility, purchase orders, shipments, and Co-Branding TDS Studio.",
    modules: ["Dealer Cockpit", "Product Catalogue", "Live Central Stock", "Orders & Invoices", "Shipments Live Tracking", "Turnkey Estimator", "Colour Visualiser", "Co-Branding Document Vault", "Staff Management"],
    restrictedActions: ["HQ Internal CRM", "Global Stock Adjustment", "Other Dealer Accounts"],
  },
  {
    roleKey: "dealer_staff",
    title: "Dealer Project Estimator (Staff)",
    tag: "Dealer Staff",
    badgeVariant: "outline",
    description: "Restricted dealer functions: catalogue browsing, live stock check, court estimator, 3D visualiser, and technical TDS downloads.",
    modules: ["Dealer Cockpit", "Product Catalogue", "Live Central Stock", "Turnkey Estimator", "Colour Visualiser", "Document Vault"],
    restrictedActions: ["Staff Management", "Financial Invoices & Payment Ledger", "Credit Limit Edits"],
  },
];

export default function AdminUsersPage() {
  const { currentUser, setCurrentUserRole } = useERP();
  const [usersList, setUsersList] = React.useState<DealerUser[]>(Object.values(mockUsers));
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = React.useState<string>("all");

  // Edit User Permissions Modal State
  const [editingUser, setEditingUser] = React.useState<DealerUser | null>(null);
  const [editPermissions, setEditPermissions] = React.useState({
    canOverridePrice: false,
    canAdjustStock: false,
    canEditCredit: false,
    canPublishAutomation: false,
  });

  // Invite Modal State
  const [isInviteOpen, setIsInviteOpen] = React.useState(false);
  const [inviteName, setInviteName] = React.useState("");
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<DealerUser["role"]>("sales_exec");
  const [inviteTerritory, setInviteTerritory] = React.useState("Western Zone");
  const [inviteSuccess, setInviteSuccess] = React.useState(false);

  const handleOpenEdit = (u: DealerUser) => {
    setEditingUser(u);
    setEditPermissions({
      canOverridePrice: u.role === "super_admin" || u.role === "sales_manager",
      canAdjustStock: u.role === "super_admin" || u.role === "inventory_exec",
      canEditCredit: u.role === "super_admin",
      canPublishAutomation: u.role === "super_admin",
    });
  };

  const handleSavePermissions = () => {
    if (!editingUser) return;
    setEditingUser(null);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newUser: DealerUser = {
      id: `usr_${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      roleLabel: roleDefinitions.find((r) => r.roleKey === inviteRole)?.title || "Team Member",
      territory: inviteTerritory,
    };

    setUsersList((prev) => [newUser, ...prev]);
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setIsInviteOpen(false);
      setInviteName("");
      setInviteEmail("");
    }, 2000);
  };

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.roleLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.dealerName && u.dealerName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedRoleFilter === "all") return matchesSearch;
    if (selectedRoleFilter === "admin_hq") return matchesSearch && ["super_admin", "sales_manager", "sales_exec", "inventory_exec"].includes(u.role);
    if (selectedRoleFilter === "dealers") return matchesSearch && ["dealer_owner", "dealer_staff"].includes(u.role);
    return matchesSearch && u.role === selectedRoleFilter;
  });

  return (
    <AdminLayout>
      <PageTransition className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Users & Role-Based Access Control (RBAC)
              </h1>
              <Badge variant="gold" size="sm" className="rounded-full text-[9px] font-bold">
                PRD §5 Enforced
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage in-house corporate staff, regional sales managers, inventory logistics heads, and authorized dealer extranet accounts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsInviteOpen(true)}
              className="rounded-xl text-xs font-bold bg-[#040C1A] hover:bg-[#0A1628]"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Invite Team Member
            </Button>
          </div>
        </div>

        {/* 6 Role Permission Matrices Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {roleDefinitions.map((def) => (
            <Card key={def.roleKey} className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant={def.badgeVariant} size="sm" className="rounded-full text-[9px] font-bold">
                    {def.tag}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">
                    Role: {def.roleKey}
                  </span>
                </div>
                <h3 className="font-extrabold text-xs text-slate-900 leading-snug">{def.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{def.description}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[10px]">
                <div className="font-bold text-slate-700">Permitted Modules:</div>
                <div className="flex flex-wrap gap-1">
                  {def.modules.map((mod, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded-md font-mono text-[9px]">
                      <Check className="h-2.5 w-2.5 text-emerald-600" />
                      <span>{mod}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "all", label: "All Users" },
              { id: "admin_hq", label: "PFS Corporate HQ" },
              { id: "dealers", label: "Dealer Accounts & Staff" },
              { id: "super_admin", label: "Super Admins" },
              { id: "sales_manager", label: "Sales Managers" },
              { id: "inventory_exec", label: "Logistics Execs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRoleFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedRoleFilter === tab.id
                    ? "bg-[#040C1A] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/90"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, role, email..."
              className="pl-8 h-8.5 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Users Table */}
        <Card className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-extrabold text-slate-600">
                  <th className="py-3 px-4">User Name & Email</th>
                  <th className="py-3 px-4">Role & Persona</th>
                  <th className="py-3 px-4">Affiliated Entity / Dealer</th>
                  <th className="py-3 px-4">Assigned Territory</th>
                  <th className="py-3 px-4">Granular Permissions</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const isCurrent = currentUser.id === u.id;

                  return (
                    <tr key={u.id} className={`hover:bg-slate-50/60 transition-colors ${isCurrent ? "bg-[#FDF7E7]/40" : ""}`}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-slate-900">{u.name}</span>
                              {isCurrent && (
                                <Badge variant="gold" size="sm" className="text-[8px] rounded-full">
                                  You
                                </Badge>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            u.role === "super_admin"
                              ? "gold"
                              : u.role === "sales_manager"
                              ? "info"
                              : u.role === "inventory_exec"
                              ? "accent"
                              : u.dealerTier === "Platinum"
                              ? "platinum"
                              : "outline"
                          }
                          size="sm"
                          className="rounded-full text-[9px] font-bold"
                        >
                          {u.roleLabel}
                        </Badge>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800">
                          {u.dealerName || "PFS Sport India HQ"}
                        </span>
                        {u.dealerTier && (
                          <span className="text-[10px] font-mono text-[#B9903C] block">
                            Tier: {u.dealerTier}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono text-slate-600 text-[11px]">
                          {u.territory || "Pan-India"}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {u.role === "super_admin" && (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-mono text-[9px]">
                              Full Admin Bypass
                            </span>
                          )}
                          {u.role === "sales_manager" && (
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded font-mono text-[9px]">
                              Price Approvals
                            </span>
                          )}
                          {u.role === "inventory_exec" && (
                            <span className="px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-mono text-[9px]">
                              Stock Dispatch & AWB
                            </span>
                          )}
                          {u.role === "sales_exec" && (
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[9px]">
                              Assigned CRM
                            </span>
                          )}
                          {u.role.startsWith("dealer") && (
                            <span className="px-1.5 py-0.5 bg-purple-50 text-purple-800 border border-purple-200 rounded font-mono text-[9px]">
                              Extranet Tier Pricing
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(u)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
                            title="Edit Permissions"
                          >
                            <Sliders className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Edit User Permissions Modal */}
        <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
          {editingUser && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base font-black flex items-center gap-2">
                  <Key className="h-4 w-4 text-primary" />
                  Edit Role & Permissions: {editingUser.name}
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Configure action-level permissions and role assignments per PRD §5.3.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <span className="font-bold text-slate-900">{editingUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Role:</span>
                    <span className="font-bold text-slate-900">{editingUser.roleLabel}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-800 block text-xs">
                    Granular Action Permissions:
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 block">Commercial Price Override</span>
                      <span className="text-[10px] text-slate-500">Authorize custom discounts on estimates & invoices</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={editPermissions.canOverridePrice}
                      onChange={(e) => setEditPermissions({ ...editPermissions, canOverridePrice: e.target.checked })}
                      className="rounded text-primary focus:ring-primary h-4 w-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 block">Warehouse Stock Adjustment</span>
                      <span className="text-[10px] text-slate-500">Post physical inventory reconciliation adjustments</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={editPermissions.canAdjustStock}
                      onChange={(e) => setEditPermissions({ ...editPermissions, canAdjustStock: e.target.checked })}
                      className="rounded text-primary focus:ring-primary h-4 w-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 block">Dealer Credit Limit Configuration</span>
                      <span className="text-[10px] text-slate-500">Modify dealer net-30 credit limit caps</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={editPermissions.canEditCredit}
                      onChange={(e) => setEditPermissions({ ...editPermissions, canEditCredit: e.target.checked })}
                      className="rounded text-primary focus:ring-primary h-4 w-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 block">Automation Rule Publishing</span>
                      <span className="text-[10px] text-slate-500">Create & activate automated webhook escalation triggers</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={editPermissions.canPublishAutomation}
                      onChange={(e) => setEditPermissions({ ...editPermissions, canPublishAutomation: e.target.checked })}
                      className="rounded text-primary focus:ring-primary h-4 w-4"
                    />
                  </label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" size="sm" onClick={() => setEditingUser(null)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleSavePermissions} className="rounded-xl text-xs font-bold bg-[#040C1A]">
                  Save Permissions
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>

        {/* Invite Team Member Modal */}
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-black flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Invite Team Member or Dealer
              </DialogTitle>
              <DialogDescription className="text-xs">
                Sends an automated ZeptoMail onboarding invite with secure single-use magic link.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleInviteSubmit} className="space-y-3.5 py-2 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Full Name</label>
                <Input
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  required
                  className="h-9 text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Official Email Address</label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. ramesh@pfs-sport.com"
                  required
                  className="h-9 text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Assign Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as DealerUser["role"])}
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="sales_exec">Sales Executive</option>
                    <option value="sales_manager">Sales Manager</option>
                    <option value="inventory_exec">Logistics & Inventory Head</option>
                    <option value="dealer_owner">Dealer Owner</option>
                    <option value="dealer_staff">Dealer Staff</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Assigned Territory</label>
                  <Input
                    value={inviteTerritory}
                    onChange={(e) => setInviteTerritory(e.target.value)}
                    placeholder="e.g. Western Zone"
                    className="h-9 text-xs rounded-xl"
                  />
                </div>
              </div>

              {inviteSuccess && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Invitation email dispatched via ZeptoMail!
                </div>
              )}

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsInviteOpen(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" variant="default" size="sm" className="rounded-xl text-xs font-bold bg-[#040C1A]">
                  Dispatch Invitation →
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageTransition>
    </AdminLayout>
  );
}
