"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useERP } from "@/context/erp-context";
import {
  Dialog,
  DialogContent,
  Badge,
} from "@pfs/ui";
import {
  Search,
  Package,
  ShoppingCart,
  Truck,
  FileText,
  Users,
  Layers,
  ArrowRight,
  Calculator,
  Palette,
} from "lucide-react";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products, orders, leads, documents, isAdmin } = useERP();
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.sports.some((s) => s.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(query.toLowerCase()) ||
      o.destinationCity.toLowerCase().includes(query.toLowerCase()) ||
      (o.projectReference && o.projectReference.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const filteredLeads = isAdmin
    ? leads.filter(
        (l) =>
          l.fullName.toLowerCase().includes(query.toLowerCase()) ||
          l.organization.toLowerCase().includes(query.toLowerCase()) ||
          l.city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredDocs = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const handleSelect = (href: string) => {
    setIsSearchOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0 bg-white border border-slate-200/90 rounded-2xl shadow-2xl">
        <div className="flex items-center px-4 pr-14 border-b border-slate-200/80 bg-white">
          <Search className="h-4.5 w-4.5 text-slate-400 shrink-0 mr-3" />
          <input
            type="search"
            placeholder="Search products, orders, leads, technical TDS..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-500 font-bold">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          {/* Quick Tools Navigation */}
          {!query && (
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                Quick Tools & Workflows
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelect("/dealer/estimator")}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50 text-left transition-colors"
                >
                  <div className="p-2 rounded-xl bg-amber-50 text-[#B9903C]">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Court Cost Estimator</p>
                    <p className="text-[10px] text-slate-500">Calculate budget & rate cards</p>
                  </div>
                </button>

                <button
                  onClick={() => handleSelect("/dealer/visualiser")}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50 text-left transition-colors"
                >
                  <div className="p-2 rounded-xl bg-blue-50 text-[#1976D2]">
                    <Palette className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Court Colour Visualiser</p>
                    <p className="text-[10px] text-slate-500">Interactive 3D court designer</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Product Results */}
          {filteredProducts.length > 0 && (
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5" /> Products ({filteredProducts.length})
              </p>
              <div className="space-y-1">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(`/catalogue/${p.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <span className="font-extrabold text-slate-900 block">{p.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        SKU: {p.sku} • ₹{p.mrpInr} / sq ft
                      </span>
                    </div>
                    <Badge variant="outline" size="sm" className="text-[9px] rounded-full">
                      {p.category}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Orders Results */}
          {filteredOrders.length > 0 && (
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ShoppingCart className="h-3.5 w-3.5" /> Purchase Orders ({filteredOrders.length})
              </p>
              <div className="space-y-1">
                {filteredOrders.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => handleSelect(isAdmin ? "/admin/orders" : "/dealer/orders")}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <span className="font-mono font-bold text-primary block">{o.orderNumber}</span>
                      <span className="text-[10px] text-slate-500">
                        {o.projectReference} • {o.destinationCity}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      ₹{o.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leads Results (Admin only) */}
          {filteredLeads.length > 0 && (
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-[#F36E21]" /> CRM Leads ({filteredLeads.length})
              </p>
              <div className="space-y-1">
                {filteredLeads.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleSelect("/admin/leads")}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{l.fullName}</span>
                      <span className="text-[10px] text-slate-500">
                        {l.organization} ({l.city}) • {l.sportInterest}
                      </span>
                    </div>
                    <Badge variant="accent" size="sm" className="rounded-full text-[9px] font-mono">
                      Score: {l.score}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Document Vault Results */}
          {filteredDocs.length > 0 && (
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-[#B9903C]" /> Technical Documents ({filteredDocs.length})
              </p>
              <div className="space-y-1">
                {filteredDocs.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(isAdmin ? "/admin/documents" : "/dealer/documents")}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{d.title}</span>
                      <span className="text-[10px] text-slate-500">
                        {d.category} • {d.fileSize}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-primary font-mono bg-blue-50 px-2 py-0.5 rounded-full">
                      {d.version}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty search */}
          {query &&
            filteredProducts.length === 0 &&
            filteredOrders.length === 0 &&
            filteredLeads.length === 0 &&
            filteredDocs.length === 0 && (
              <div className="py-8 text-center text-slate-400">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-bold text-slate-700">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-400 mt-0.5">Try searching for SKU, client name, city or product category.</p>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
