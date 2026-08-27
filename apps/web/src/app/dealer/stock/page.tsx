"use client";

import * as React from "react";
import Link from "next/link";
import { DealerLayout } from "@/components/layout";
import { PageHeader } from "@/components/layout/page-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { useERP } from "@/context/erp-context";
import { ProductItem } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
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
  Layers,
  Search,
  ShoppingCart,
  Check,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Truck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function StockPage() {
  const { products, currentUser, addToCart } = useERP();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<string>("All");
  const [addedSku, setAddedSku] = React.useState<string | null>(null);

  const warehouses = [
    { id: "All", name: "All Hubs" },
    { id: "Bhiwandi", name: "Bhiwandi (West)" },
    { id: "Delhi", name: "Okhla Central (North)" },
    { id: "Bengaluru", name: "Peenya (South)" },
  ];

  const filteredProducts = products.filter((prod) => {
    return (
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleQuickAdd = (prod: ProductItem) => {
    addToCart(prod, prod.category === "Accessories" ? 2 : 1800);
    setAddedSku(prod.sku);
    setTimeout(() => setAddedSku(null), 1800);
  };

  return (
    <DealerLayout>
      <PageTransition className="space-y-6">
        {/* Standardized Page Header */}
        <PageHeader
          title="Central Inventory & Warehouse Visibility"
          description="Live factory stock on-hand, dealer reservations, buffer safety levels, and upcoming replenishment consignments."
          badgeText="NeonDB Real-Time Sync"
          badgeVariant="success"
          pulseColor="emerald"
        >
          <Link href="/dealer/orders">
            <Button variant="accent" size="sm" className="rounded-xl shadow-xs">
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              Go to Order Cart
            </Button>
          </Link>
        </PageHeader>

        {/* Warehouse KPI Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-white border border-slate-200/80 shadow-xs rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Bhiwandi Super Hub (Mumbai)
                </p>
                <p className="text-xl font-black text-slate-900 mt-1 font-mono">1,02,000 sq ft</p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mt-1">
                  <LivePulseDot color="emerald" size="sm" />
                  <span>Operational • Ready for Dispatch</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#1976D2] flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white border border-slate-200/80 shadow-xs rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Okhla Central Hub (Delhi NCR)
                </p>
                <p className="text-xl font-black text-slate-900 mt-1 font-mono">48,500 sq ft</p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mt-1">
                  <LivePulseDot color="emerald" size="sm" />
                  <span>Operational • Same-Day Dispatch</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-[#B9903C] flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white border border-slate-200/80 shadow-xs rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Peenya Facility (Bengaluru)
                </p>
                <p className="text-xl font-black text-slate-900 mt-1 font-mono">35,200 sq ft</p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mt-1">
                  <LivePulseDot color="emerald" size="sm" />
                  <span>Operational • Direct South Corridor</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Filter stock by SKU, product system, category..."
        >
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {warehouses.map((wh) => (
              <button
                key={wh.id}
                onClick={() => setSelectedWarehouse(wh.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedWarehouse === wh.id
                    ? "bg-[#0A2A57] text-white shadow-xs"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {wh.name}
              </button>
            ))}
          </div>
        </FilterBar>

        {/* Stock Ledger Table */}
        <Card className="bg-white border border-slate-200/80 shadow-xs rounded-2xl overflow-hidden" padding="none">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="font-bold text-slate-800 text-xs">SKU & System</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs">Category</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs text-right">Physical On-Hand</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs text-right">Reserved (Active POs)</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs text-right">Net Available</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs text-right">Buffer Status</TableHead>
                <TableHead className="font-bold text-slate-800 text-xs text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((prod) => {
                const available = prod.stockOnHands - prod.stockReserved;
                const isLow = available <= prod.reorderLevel;
                const isAdded = addedSku === prod.sku;

                return (
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
                    <TableCell className="text-right font-mono font-bold text-xs text-slate-800">
                      {prod.stockOnHands.toLocaleString("en-IN")} {prod.category === "Accessories" ? "units" : "sq ft"}
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-amber-700 font-bold">
                      {prod.stockReserved.toLocaleString("en-IN")} {prod.category === "Accessories" ? "units" : "sq ft"}
                    </TableCell>
                    <TableCell className="text-right font-mono font-black text-xs text-emerald-700 bg-emerald-50/40">
                      {available.toLocaleString("en-IN")} {prod.category === "Accessories" ? "units" : "sq ft"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={isLow ? "warning" : "success"} size="sm" className="text-[10px] rounded-full">
                        {isLow ? "Buffer Alert" : "Adequate"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={isAdded ? "success" : "outline"}
                        size="sm"
                        className="h-7 text-xs rounded-lg font-bold"
                        onClick={() => handleQuickAdd(prod)}
                      >
                        {isAdded ? (
                          <>
                            <Check className="mr-1 h-3.5 w-3.5" /> Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-1 h-3.5 w-3.5" /> Order
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredProducts.length === 0 && (
            <EmptyState
              title="No Stock Items Found"
              description="No warehouse inventory items matched your search query. Try clearing the search bar."
              actionLabel="Clear Search"
              onAction={() => setSearchQuery("")}
            />
          )}
        </Card>
      </PageTransition>
    </DealerLayout>
  );
}
