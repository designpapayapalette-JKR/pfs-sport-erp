"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DealerLayout } from "@/components/layout";
import { useERP } from "@/context/erp-context";
import { mockProducts, ProductItem } from "@/lib/mock-data";
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
  ShoppingCart,
  Download,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Award,
  Truck,
  ArrowLeft,
  Check,
  FileText,
  Calculator,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.productId as string;

  const { products, currentUser, addToCart } = useERP();
  const product: ProductItem =
    products.find((p) => p.id === productId || p.sku.toLowerCase() === productId.toLowerCase()) ||
    products[0];

  const [quantity, setQuantity] = React.useState<number>(
    product.category === "Accessories" ? 2 : 3600 // 2 courts default
  );
  const [isAdded, setIsAdded] = React.useState(false);

  const getDealerPrice = () => {
    if (currentUser.dealerTier === "Platinum") return { price: product.platinumPrice, discount: "25% OFF (Platinum Tier)" };
    if (currentUser.dealerTier === "Gold") return { price: product.goldPrice, discount: "18% OFF (Gold Tier)" };
    if (currentUser.dealerTier === "Silver") return { price: product.silverPrice, discount: "10% OFF (Silver Tier)" };
    return { price: product.mrpInr, discount: "Standard MRP" };
  };

  const { price, discount } = getDealerPrice();
  const unitLabel = product.category === "Accessories" ? "unit" : "sq ft";
  const subtotal = price * quantity;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <DealerLayout>
      <div className="space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/dealer/catalogue"
            className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Product Catalogue
          </Link>
        </div>

        {/* Product Hero 2-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Product Visuals & System Cross-Section (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="p-6 bg-white border border-surfaceBorder shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant="outline" className="font-mono text-xs">
                  {product.sku}
                </Badge>
                <Badge variant="platinum">{discount}</Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-2">
                {product.name}
              </h1>

              <p className="text-sm font-semibold text-[#B9903C] mb-4">
                {product.systemTier} • {product.sports.join(", ")}
              </p>

              <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Multilayer System Cross-Section Diagram */}
              <div className="p-5 rounded-xl bg-neutral-900 text-white space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B9903C] flex items-center gap-1.5">
                    <Layers className="h-4 w-4" />
                    Engineered System Cross-Section
                  </span>
                  <span className="text-[11px] font-mono text-white/60">{product.thickness}</span>
                </div>

                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="p-2 rounded bg-white/10 flex items-center justify-between">
                    <span className="font-medium text-emerald-300">Layer 1 & 2: Acrylic Pure Color Concentrate (UV-Stabilized)</span>
                    <span className="text-[10px] text-white/60">Topcoats</span>
                  </div>
                  <div className="p-2 rounded bg-white/10 flex items-center justify-between">
                    <span className="font-medium text-blue-300">Layer 3 & 4: Fortified Resurfacer with Silica Micro-Grip</span>
                    <span className="text-[10px] text-white/60">Pace Control</span>
                  </div>
                  <div className="p-2 rounded bg-white/10 flex items-center justify-between">
                    <span className="font-medium text-amber-300">Layer 5 to 7: SBR Rubber Granule Elastomeric Cushion Matrix</span>
                    <span className="text-[10px] text-white/60">Joint Cushion</span>
                  </div>
                  <div className="p-2 rounded bg-white/10 flex items-center justify-between">
                    <span className="font-medium text-slate-300">Layer 8: High-Penetration Acrylic Primer & Moisture Seal</span>
                    <span className="text-[10px] text-white/60">Substrate Bond</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Key Engineering Features */}
            <Card className="p-6 bg-white border border-surfaceBorder shadow-xs">
              <CardTitle className="text-base font-bold text-neutral-900 mb-4">
                Key Performance Advantages
              </CardTitle>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 border border-surfaceBorder">
                    <CheckCircle2 className="h-4 w-4 text-[#006442] shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-800 leading-relaxed">{feat}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Technical Specifications Table */}
            <Card className="p-6 bg-white border border-surfaceBorder shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-base font-bold text-neutral-900">
                  Technical Specifications
                </CardTitle>
                <Link href="/dealer/documents">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download Official TDS (PDF)
                  </Button>
                </Link>
              </div>

              <div className="divide-y divide-surfaceBorder text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-500 font-medium">Standard Certifications:</span>
                  <span className="font-semibold text-neutral-900">{product.certification}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-500 font-medium">Environment Suitability:</span>
                  <span className="font-semibold text-neutral-900">{product.indoorOutdoor}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-500 font-medium">Minimum Order Quantity (MOQ):</span>
                  <span className="font-semibold text-neutral-900">{product.moq}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-500 font-medium">Warehouse Lead Time:</span>
                  <span className="font-semibold text-emerald-700">{product.leadTime}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-500 font-medium">Commercial Warranty:</span>
                  <span className="font-semibold text-neutral-900">5-Year Manufacturer Warranty</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Order Request Calculator (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-[#071D3D] text-white border-none shadow-xl sticky top-20">
              <CardHeader className="bg-[#061730] px-6 py-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-white">Order Request Calculator</CardTitle>
                  <Badge variant="gold">{currentUser.dealerTier || "Platinum"} Tier</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                {/* Price Display */}
                <div>
                  <span className="text-xs text-white/60 line-through font-mono">
                    ₹{product.mrpInr} MRP
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-[#B9903C] font-mono">
                      ₹{price}
                    </span>
                    <span className="text-xs text-white/70">per {unitLabel} (excl. GST)</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Applied {discount} on standard wholesale price list.</span>
                  </p>
                </div>

                {/* Quantity Input */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-xs font-semibold text-white/80 block">
                    Required Quantity ({unitLabel})
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="bg-white/10 border-white/20 text-white font-mono text-base font-bold"
                    />
                    {product.category !== "Accessories" && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => setQuantity(1800)}
                          className="px-2 py-2 rounded bg-white/10 hover:bg-white/20 text-xs font-medium"
                          title="1 Pickleball Court (1,800 sq ft)"
                        >
                          1 Court
                        </button>
                        <button
                          onClick={() => setQuantity(3600)}
                          className="px-2 py-2 rounded bg-white/10 hover:bg-white/20 text-xs font-medium"
                          title="2 Pickleball Courts (3,600 sq ft)"
                        >
                          2 Courts
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Real-time Financial Breakdown */}
                <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-white/80">
                  <div className="flex justify-between">
                    <span>Base Tier Subtotal:</span>
                    <span className="font-mono text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18% Statutory):</span>
                    <span className="font-mono text-white/80">₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 font-bold text-sm">
                    <span className="text-white">Estimated Total:</span>
                    <span className="font-mono text-[#B9903C] text-base">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Stock Availability */}
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 flex items-center justify-between">
                  <span>Available at Central Bhiwandi Hub:</span>
                  <span className="font-mono font-bold">{product.stockOnHands.toLocaleString("en-IN")} {unitLabel}</span>
                </div>

                {/* CTA Action */}
                <div className="space-y-2 pt-2">
                  <Button
                    variant={isAdded ? "success" : "accent"}
                    className="w-full h-11 text-sm font-semibold"
                    onClick={handleAddToCart}
                  >
                    {isAdded ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Added to Order Request!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Order Request
                      </>
                    )}
                  </Button>

                  <Link href="/dealer/orders" className="block">
                    <Button variant="outline" className="w-full h-10 text-xs text-white border-white/20 hover:bg-white/10">
                      Go to Order Checkout
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DealerLayout>
  );
}
