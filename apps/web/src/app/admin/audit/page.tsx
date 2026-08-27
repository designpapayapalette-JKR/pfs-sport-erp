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
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@pfs/ui";
import {
  History,
  Search,
  Shield,
  Filter,
  Download,
  Lock,
} from "lucide-react";

export default function AdminAuditPage() {
  const { auditEvents } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredEvents = auditEvents.filter(
    (e) =>
      e.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.entityId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Immutable Audit Trail & Activity Log
              </h1>
              <Badge variant="success">Append-Only PostgreSQL</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Traceable security and financial log capturing actor ID, timestamp, before/after parameters, and IP addresses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Audit log export CSV generated.")}
            >
              <Download className="mr-1.5 h-4 w-4" />
              Export Audit CSV
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-end">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit events by user or action..."
              className="pl-9 text-xs"
            />
          </div>
        </div>

        {/* Audit Table */}
        <Card className="bg-white border border-surfaceBorder shadow-xs overflow-hidden" padding="none">
          <Table>
            <TableHeader className="bg-neutral-50/80">
              <TableRow>
                <TableHead className="font-bold text-neutral-800">Timestamp (UTC)</TableHead>
                <TableHead className="font-bold text-neutral-800">Actor & Role</TableHead>
                <TableHead className="font-bold text-neutral-800">Module</TableHead>
                <TableHead className="font-bold text-neutral-800">Action Code</TableHead>
                <TableHead className="font-bold text-neutral-800">Entity & Details</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((evt) => (
                <TableRow key={evt.id} className="hover:bg-neutral-50/60">
                  <TableCell className="font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                    {new Date(evt.timestamp).toLocaleString("en-GB")}
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-xs text-neutral-900">{evt.actorName}</p>
                    <p className="text-[10px] text-neutral-500">{evt.role}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" size="sm" className="text-[10px]">
                      {evt.module}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="gold" size="sm" className="font-mono text-[10px]">
                      {evt.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-700 max-w-md">
                    <strong className="text-neutral-900">{evt.targetEntity} ({evt.entityId}):</strong>{" "}
                    {evt.details}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[11px] text-neutral-400">
                    {evt.ipAddress}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
}
