"use client";

import * as React from "react";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { useERP } from "@/context/erp-context";
import { DocumentItem } from "@/lib/mock-data";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@pfs/ui";
import {
  FileText,
  Plus,
  Search,
  Download,
  UploadCloud,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminDocumentsPage() {
  const { documents } = useERP();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);

  const filteredDocs = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Document Vault Administration & Versioning
              </h1>
              <Badge variant="gold">AWS S3 Metadata Vault</Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              Publish technical specifications, lab test reports, installation manuals, and configure dealer co-branding templates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Upload New Document Version
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
              placeholder="Search documents..."
              className="pl-9 text-xs"
            />
          </div>
        </div>

        {/* Documents Table */}
        <Card className="bg-white border border-surfaceBorder shadow-xs overflow-hidden" padding="none">
          <Table>
            <TableHeader className="bg-neutral-50/80">
              <TableRow>
                <TableHead className="font-bold text-neutral-800">Document Title</TableHead>
                <TableHead className="font-bold text-neutral-800">Category</TableHead>
                <TableHead className="font-bold text-neutral-800">Version</TableHead>
                <TableHead className="font-bold text-neutral-800">Status</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Downloads</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Co-Brandable</TableHead>
                <TableHead className="font-bold text-neutral-800 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocs.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-neutral-50/60">
                  <TableCell>
                    <p className="font-bold text-xs text-neutral-900">{doc.title}</p>
                    <p className="text-[10px] text-neutral-500 font-mono">Effective: {doc.effectiveDate} • {doc.fileSize}</p>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-700">
                    <Badge variant="outline" size="sm">
                      {doc.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs font-semibold text-neutral-900">
                    {doc.version}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" size="sm">
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-neutral-800">
                    {doc.downloadCount}
                  </TableCell>
                  <TableCell className="text-right">
                    {doc.coBrandable ? (
                      <Badge variant="gold" size="sm">Yes</Badge>
                    ) : (
                      <Badge variant="outline" size="sm">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={(e) => {
                        const btn = e.currentTarget;
                        btn.textContent = "Downloading…";
                        btn.disabled = true;
                        setTimeout(() => { btn.innerHTML = '<svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>PDF'; btn.disabled = false; }, 1200);
                      }}
                    >
                      <Download className="mr-1 h-3 w-3" /> PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Upload Modal */}
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-neutral-900">
                Upload Technical Document / TDS
              </DialogTitle>
              <DialogDescription className="text-xs">
                Upload official PDF with automated dealer superseded notification.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Document Title</label>
                <Input placeholder="e.g. PFS Pro Tour 8-Layer Acrylic Cushion TDS" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Category</label>
                  <select className="w-full h-10 rounded-lg border border-surfaceBorder bg-surface px-2.5 text-xs text-neutral-900">
                    <option>Technical Data Sheets (TDS)</option>
                    <option>Lab Test Reports & Certifications</option>
                    <option>Installation Manuals</option>
                    <option>Marketing Brochures</option>
                    <option>Warranties</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Version Number</label>
                  <Input placeholder="v3.3" />
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">File Attachment (PDF)</label>
                <div className="border border-dashed border-neutral-300 rounded-lg p-4 text-center bg-neutral-50 cursor-pointer">
                  <UploadCloud className="h-6 w-6 text-neutral-400 mx-auto mb-1" />
                  <span className="text-xs text-neutral-600 font-medium">Click to select PDF file (Max 25MB)</span>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="accent"
                onClick={() => {
                  setIsUploadModalOpen(false);
                }}
              >
                Publish Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
