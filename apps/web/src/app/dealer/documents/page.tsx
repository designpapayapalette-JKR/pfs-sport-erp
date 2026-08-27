"use client";

import * as React from "react";
import { DealerLayout } from "@/components/layout";
import { PageHeader } from "@/components/layout/page-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { EmptyState } from "@/components/ui/empty-state";
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
  FileText,
  Download,
  Sparkles,
  Search,
  Check,
  Building2,
  FileCheck,
  ShieldCheck,
  Printer,
  Upload,
  ArrowRight,
} from "lucide-react";

export default function DocumentsPage() {
  const { documents, currentUser } = useERP();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [downloadSuccessId, setDownloadSuccessId] = React.useState<string | null>(null);

  // Co-Branding Studio State
  const [isCoBrandOpen, setIsCoBrandOpen] = React.useState(false);
  const [activeDocForCoBrand, setActiveDocForCoBrand] = React.useState<DocumentItem | null>(null);
  const [dealerNameInput, setDealerNameInput] = React.useState(
    currentUser.dealerName || "Apex Sports Infrastructure Pvt Ltd"
  );
  const [dealerPhoneInput, setDealerPhoneInput] = React.useState("+91 98201 44521");
  const [dealerEmailInput, setDealerEmailInput] = React.useState(currentUser.email);
  const [dealerWebsiteInput, setDealerWebsiteInput] = React.useState("www.apexsports.in");
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);
  const [isCoBrandGenerated, setIsCoBrandGenerated] = React.useState(false);

  const categories = ["All", "Technical Data Sheets (TDS)", "Certificates", "Marketing & Brochures", "Installation Manuals"];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (docId: string) => {
    setDownloadSuccessId(docId);
    setTimeout(() => setDownloadSuccessId(null), 2000);
  };

  const handleOpenCoBrand = (doc: DocumentItem) => {
    setActiveDocForCoBrand(doc);
    setIsCoBrandGenerated(false);
    setIsCoBrandOpen(true);
  };

  const handleGenerateCoBrandedPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      setIsCoBrandGenerated(true);
    }, 1500);
  };

  return (
    <DealerLayout>
      <PageTransition className="space-y-6">
        {/* Standardized Page Header */}
        <PageHeader
          title="Document Vault & Technical Specs"
          description="Official Technical Data Sheets (TDS), ITF/BWF lab test certificates, installation manuals, and dealer co-branded brochures."
          badgeText="Verified PDF Repository"
          badgeVariant="platinum"
          pulseColor="blue"
        >
          <Button
            variant="accent"
            size="sm"
            onClick={() => handleOpenCoBrand(documents[4] || documents[0])}
            className="rounded-xl shadow-xs"
          >
            <Sparkles className="mr-1.5 h-4 w-4" />
            Launch Co-Branding Studio
          </Button>
        </PageHeader>

        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search documents by SKU, title, certificate..."
        >
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#0A2A57] text-white shadow-xs"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FilterBar>

        {/* Documents Grid with Uniform Equal-Height Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => {
            const isDownloaded = downloadSuccessId === doc.id;

            return (
              <StaggerItem key={doc.id}>
                <MotionCard className="p-5 bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all rounded-2xl flex flex-col justify-between h-full card-hover-effect">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline" size="sm" className="text-[10px] rounded-full truncate max-w-[180px] font-bold">
                        {doc.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-700">
                          {doc.version}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 mb-1.5 min-h-[40px]">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4 min-h-[54px]">
                      {doc.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-3 mt-auto">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Size: {doc.fileSize}</span>
                      <span>Downloads: {doc.downloadCount}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={isDownloaded ? "success" : "default"}
                        size="sm"
                        className="w-full text-xs rounded-xl font-bold"
                        onClick={() => handleDownload(doc.id)}
                      >
                        {isDownloaded ? (
                          <>
                            <Check className="mr-1.5 h-3.5 w-3.5" /> Saved!
                          </>
                        ) : (
                          <>
                            <Download className="mr-1.5 h-3.5 w-3.5" /> PDF
                          </>
                        )}
                      </Button>

                      {doc.coBrandable ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs text-[#B9903C] hover:text-[#9D7A32] border-[#B9903C]/30 hover:bg-[#FFF9EB] rounded-xl font-bold"
                          onClick={() => handleOpenCoBrand(doc)}
                        >
                          <Sparkles className="h-3.5 w-3.5 mr-1" /> Co-Brand
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs rounded-xl font-bold text-slate-400"
                          disabled
                        >
                          Verified TDS
                        </Button>
                      )}
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {filteredDocs.length === 0 && (
          <EmptyState
            title="No Documents Found"
            description="No technical data sheets or brochures match your search query. Clear search to see full library."
            actionLabel="Reset Search"
            onAction={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          />
        )}

        {/* Co-Branding Studio Modal */}
        <Dialog open={isCoBrandOpen} onOpenChange={setIsCoBrandOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#0A2A57] to-[#B9903C] text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <DialogTitle className="text-base font-extrabold text-slate-900">
                    PFS Co-Branding Studio (PRD §9.11)
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500">
                    Generate client-ready marketing collateral stamped with your company name, logo, and contact info.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-3">
              {/* Left Form: Dealer Branding Parameters (5 cols) */}
              <div className="md:col-span-5 space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Dealer Trading Name
                  </label>
                  <Input
                    value={dealerNameInput}
                    onChange={(e) => setDealerNameInput(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Contact Phone Number
                  </label>
                  <Input
                    value={dealerPhoneInput}
                    onChange={(e) => setDealerPhoneInput(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Sales Email Address
                  </label>
                  <Input
                    value={dealerEmailInput}
                    onChange={(e) => setDealerEmailInput(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Website URL
                  </label>
                  <Input
                    value={dealerWebsiteInput}
                    onChange={(e) => setDealerWebsiteInput(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-0.5">Dealer Logo Stamp:</span>
                  <p className="text-[11px] text-slate-500">
                    Using verified SVG logo on file for {currentUser.dealerName || "Apex Sports"}.
                  </p>
                </div>
              </div>

              {/* Right: Live PDF Document Preview Canvas (7 cols) */}
              <div className="md:col-span-7 bg-slate-100 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between min-h-[320px]">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 text-xs">
                    <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">
                      Live Stamped Preview
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                      Co-Branding Validated
                    </span>
                  </div>

                  {/* Mock PDF Sheet Simulation */}
                  <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 space-y-3 text-[11px]">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-lg bg-[#0A2A57] text-white flex items-center justify-center font-bold text-[10px]">
                          PFS
                        </div>
                        <span className="font-black text-slate-900 text-xs">PFS Sport Infrastructure</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-wider text-[#B9903C] font-bold block">
                          Authorized Dealer
                        </span>
                        <span className="font-black text-slate-800 text-xs">{dealerNameInput}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-900 text-xs">
                        {activeDocForCoBrand?.title || "PFS Pro Tour 8-Layer Acrylic Cushion"}
                      </h4>
                      <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-3">
                        {activeDocForCoBrand?.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between text-[9px] font-mono text-slate-400">
                      <span>Direct: {dealerPhoneInput}</span>
                      <span>{dealerEmailInput}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <Button
                    variant="accent"
                    size="sm"
                    className="w-full text-xs font-bold rounded-xl shadow-xs"
                    onClick={handleGenerateCoBrandedPdf}
                    disabled={isGeneratingPdf}
                  >
                    {isGeneratingPdf ? (
                      <>Rendering Verified Stamped PDF...</>
                    ) : isCoBrandGenerated ? (
                      <>
                        <Check className="mr-1.5 h-3.5 w-3.5 text-white" /> Download Stamped PDF (Ready)
                      </>
                    ) : (
                      <>
                        <Printer className="mr-1.5 h-3.5 w-3.5" /> Stamp & Generate Client PDF
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCoBrandOpen(false)} className="rounded-xl text-xs">
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageTransition>
    </DealerLayout>
  );
}
