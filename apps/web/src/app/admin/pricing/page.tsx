"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/layout/dealer-layout";
import { PageHeader } from "@/components/layout/page-header";
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
  PageTransition,
  StaggerContainer,
  StaggerItem,
  MotionCard,
  LivePulseDot,
} from "@/components/motion";
import {
  DollarSign,
  Crown,
  Calculator,
  CheckCircle2,
  FileText,
  Clock,
  Edit,
  Sparkles,
} from "lucide-react";

export default function AdminPricingPage() {
  const { products } = useERP();
  const [publishLoading, setPublishLoading] = React.useState(false);
  const [publishDone, setPublishDone] = React.useState(false);

  const handlePublish = () => {
    setPublishLoading(true);
    setTimeout(() => {
      setPublishLoading(false);
      setPublishDone(true);
      setTimeout(() => setPublishDone(false), 2500);
    }, 1000);
  };

  return (
    <AdminLayout>
      <PageTransition className="space-y-6">
        {/* Standardized Page Header */}
        <PageHeader
          title="Pricing Matrix & Versioned Rate Cards"
          description="Maintain dealer tier discount slabs, volume multipliers, and versioned turnkey Court Estimator rate cards (PRD §9.4 Engine)."
          badgeText="Active Rate Card v1.4"
          badgeVariant="gold"
          pulseColor="amber"
        >
          <Button
            variant="accent"
            size="sm"
            onClick={handlePublish}
            disabled={publishLoading || publishDone}
            className="rounded-xl shadow-xs"
          >
            {publishDone ? (
              <><CheckCircle2 className="mr-1.5 h-4 w-4" />Rate Card v1.5 Published!</>
            ) : publishLoading ? (
              <><Clock className="mr-1.5 h-4 w-4 animate-spin" />Publishing…</>
            ) : (
              <><Calculator className="mr-1.5 h-4 w-4" />Publish Rate Card v1.5</>
            )}
          </Button>
        </PageHeader>

        {/* Commercial Tier Discount Rules Banner */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StaggerItem>
            <MotionCard className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 shadow-xs rounded-2xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">Platinum Tier</span>
                <Crown className="h-4 w-4 text-slate-700" />
              </div>
              <p className="text-2xl font-black text-slate-900 font-mono">25% Discount</p>
              <p className="text-[11px] text-slate-600 mt-1">Applied to MRP • ₹25L Credit Limit</p>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>
            <MotionCard className="p-4 bg-gradient-to-br from-[#FFF9EB] to-[#FFF0D4] border border-[#B9903C]/30 shadow-xs rounded-2xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-[#8C6D23] uppercase tracking-wider">Gold Tier</span>
                <Crown className="h-4 w-4 text-[#B9903C]" />
              </div>
              <p className="text-2xl font-black text-[#8C6D23] font-mono">18% Discount</p>
              <p className="text-[11px] text-[#8C6D23]/80 mt-1">Applied to MRP • ₹15L Credit Limit</p>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>
            <MotionCard className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-300 shadow-xs rounded-2xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-700 uppercase tracking-wider">Silver Tier</span>
                <Crown className="h-4 w-4 text-slate-500" />
              </div>
              <p className="text-2xl font-black text-slate-800 font-mono">10% Discount</p>
              <p className="text-[11px] text-slate-600 mt-1">Applied to MRP • ₹8L Credit Limit</p>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>
            <MotionCard className="p-4 bg-white border border-slate-200/80 shadow-xs rounded-2xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-400 uppercase tracking-wider">Registered Tier</span>
                <Crown className="h-4 w-4 text-slate-400" />
              </div>
              <p className="text-2xl font-black text-slate-800 font-mono">0% (Base MRP)</p>
              <p className="text-[11px] text-slate-500 mt-1">Standard Wholesale • 100% Advance</p>
            </MotionCard>
          </StaggerItem>
        </StaggerContainer>

        {/* Master Price List Table */}
        <Card className="bg-white border border-slate-200/80 shadow-xs rounded-2xl overflow-hidden" padding="none">
          <CardHeader className="px-6 py-4 border-b border-slate-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900">Master Wholesale SKU Matrix</CardTitle>
              <CardDescription className="text-xs text-slate-500">Live prices calculated automatically across all tiers</CardDescription>
            </div>
            <Badge variant="outline" className="font-mono text-xs">Rate Card: v1.4 (Active)</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/80">
                <TableRow>
                  <TableHead className="font-bold text-slate-800 text-xs">System / SKU</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs">Category</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Standard MRP</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right text-slate-800">Platinum (25%)</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right text-[#8C6D23]">Gold (18%)</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right text-slate-600">Silver (10%)</TableHead>
                  <TableHead className="font-bold text-slate-800 text-xs text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((prod) => (
                  <TableRow key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                    <TableCell>
                      <p className="font-bold text-xs text-slate-900">{prod.name}</p>
                      <p className="font-mono text-[10px] text-slate-400">SKU: {prod.sku}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" size="sm" className="rounded-full text-[10px]">
                        {prod.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-xs text-slate-900">
                      ₹{prod.mrpInr} / {prod.category === "Accessories" ? "unit" : "sq ft"}
                    </TableCell>
                    <TableCell className="text-right font-mono font-black text-xs text-primary">
                      ₹{prod.platinumPrice}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-xs text-[#8C6D23]">
                      ₹{prod.goldPrice}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-xs text-slate-700">
                      ₹{prod.silverPrice}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href="/admin/products">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs font-bold text-primary hover:bg-slate-100"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" /> Edit SKU
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </PageTransition>
    </AdminLayout>
  );
}
