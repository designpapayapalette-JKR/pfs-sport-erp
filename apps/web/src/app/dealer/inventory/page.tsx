"use client";

import * as React from "react";
import { DealerLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@pfs/ui/components/card";
import { Badge } from "@pfs/ui/components/badge";
import { Button } from "@pfs/ui/components/button";
import { Input } from "@pfs/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pfs/ui/components/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@pfs/ui/components/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pfs/ui/components/tabs";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Download,
  Plus,
  AlertTriangle,
  Package,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye,
  Edit,
} from "lucide-react";

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "footwear", label: "Footwear" },
  { value: "apparel", label: "Apparel" },
  { value: "equipment", label: "Equipment" },
  { value: "accessories", label: "Accessories" },
  { value: "nutrition", label: "Nutrition" },
];

const stockFilterOptions = [
  { value: "all", label: "All Stock Levels" },
  { value: "low", label: "Low Stock" },
  { value: "out", label: "Out of Stock" },
  { value: "healthy", label: "Healthy Stock" },
];

const inventory = [
  { id: "INV-001", product: "Running Shoes Pro", sku: "RSP-001", category: "footwear", stock: 5, threshold: 20, price: "$89.99", supplier: "SportSupply Co", status: "low" },
  { id: "INV-002", product: "Yoga Mat Premium", sku: "YMP-002", category: "accessories", stock: 12, threshold: 25, price: "$24.99", supplier: "ZenGear Ltd", status: "low" },
  { id: "INV-003", product: "Resistance Bands Set", sku: "RBS-003", category: "equipment", stock: 8, threshold: 15, price: "$19.99", supplier: "FitTools Inc", status: "low" },
  { id: "INV-004", product: "Protein Powder 2kg", sku: "PPW-004", category: "nutrition", stock: 3, threshold: 10, price: "$49.99", supplier: "NutriMax", status: "low" },
  { id: "INV-005", product: "Tennis Racket Pro", sku: "TRP-005", category: "equipment", stock: 7, threshold: 12, price: "$129.99", supplier: "CourtMaster", status: "low" },
  { id: "INV-006", product: "Basketball Indoor", sku: "BBI-006", category: "equipment", stock: 0, threshold: 8, price: "$34.99", supplier: "CourtMaster", status: "out" },
  { id: "INV-007", product: "Compression Tights", sku: "CCT-007", category: "apparel", stock: 45, threshold: 20, price: "$44.99", supplier: "ActiveWear Co", status: "healthy" },
  { id: "INV-008", product: "Foam Roller", sku: "FFR-008", category: "accessories", stock: 32, threshold: 15, price: "$22.99", supplier: "ZenGear Ltd", status: "healthy" },
  { id: "INV-009", product: "Cross Training Shoes", sku: "CTS-009", category: "footwear", stock: 28, threshold: 18, price: "$109.99", supplier: "SportSupply Co", status: "healthy" },
  { id: "INV-010", product: "Weightlifting Belt", sku: "WWB-010", category: "equipment", stock: 18, threshold: 10, price: "$39.99", supplier: "FitTools Inc", status: "healthy" },
  { id: "INV-011", product: "Running Socks Pack", sku: "RSP-011", category: "accessories", stock: 65, threshold: 30, price: "$14.99", supplier: "ActiveWear Co", status: "healthy" },
  { id: "INV-012", product: "Pre-Workout 300g", sku: "PWO-012", category: "nutrition", stock: 22, threshold: 15, price: "$34.99", supplier: "NutriMax", status: "healthy" },
];

const stats = [
  { name: "Total Products", value: "156", icon: Package, color: "primary" },
  { name: "Low Stock", value: "18", icon: AlertTriangle, color: "warning" },
  { name: "Out of Stock", value: "3", icon: Package, color: "error" },
  { name: "Total Value", value: "$42,350", icon: TrendingUp, color: "success" },
];

const statusConfig = {
  healthy: { variant: "success" as const, label: "In Stock", icon: <TrendingUp className="h-3.5 w-3.5" /> },
  low: { variant: "warning" as const, label: "Low Stock", icon: <AlertTriangle className="h-3.5 w-3.5" /> },
  out: { variant: "destructive" as const, label: "Out of Stock", icon: <TrendingDown className="h-3.5 w-3.5" /> },
};

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [stockFilter, setStockFilter] = React.useState("all");
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: "asc" | "desc" }>({ key: "product", direction: "asc" });
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStock = stockFilter === "all" || item.status === stockFilter;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const SortIcon = ({ sortKey }: { sortKey: string }) => {
    if (sortConfig.key !== sortKey) return <ChevronDown className="h-4 w-4 text-neutral-400" />;
    return sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4 text-primary" />;
  };

  const lowStockItems = inventory.filter((item) => item.status === "low" || item.status === "out").length;
  const outOfStockItems = inventory.filter((item) => item.status === "out").length;

  return (
    <DealerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Inventory</h1>
            <p className="text-neutral-500 mt-1">Track stock levels, manage products, and monitor supplier relationships</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} padding="md">
                <CardContent className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">{stat.name}</p>
                    <p className="mt-1 text-2xl font-bold text-neutral-900">{stat.value}</p>
                  </div>
                  <div className={cn("p-3 rounded-lg", `bg-${stat.color}Light`)}>
                    <Icon className={cn("h-6 w-6", `text-${stat.color}`)} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Products ({inventory.length})</TabsTrigger>
            <TabsTrigger value="low">Low Stock ({lowStockItems})</TabsTrigger>
            <TabsTrigger value="out">Out of Stock ({outOfStockItems})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <InventoryTable
              data={sortedInventory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
              sortConfig={sortConfig}
              handleSort={handleSort}
              SortIcon={SortIcon}
            />
          </TabsContent>

          <TabsContent value="low" className="mt-4">
            <InventoryTable
              data={sortedInventory.filter((item) => item.status === "low")}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
              sortConfig={sortConfig}
              handleSort={handleSort}
              SortIcon={SortIcon}
            />
          </TabsContent>

          <TabsContent value="out" className="mt-4">
            <InventoryTable
              data={sortedInventory.filter((item) => item.status === "out")}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
              sortConfig={sortConfig}
              handleSort={handleSort}
              SortIcon={SortIcon}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DealerLayout>
  );
}

function InventoryTable({
  data,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  stockFilter,
  setStockFilter,
  sortConfig,
  handleSort,
  SortIcon,
}: {
  data: typeof inventory;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  stockFilter: string;
  setStockFilter: (filter: string) => void;
  sortConfig: { key: string; direction: "asc" | "desc" };
  handleSort: (key: string) => void;
  SortIcon: ({ sortKey }: { sortKey: string }) => React.ReactElement;
}) {
  return (
    <Card padding="none">
      <CardContent className="p-4 border-b border-surfaceBorder">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search products, SKUs, suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-1 sm:flex-none">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Stock Level" />
              </SelectTrigger>
              <SelectContent>
                {stockFilterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort("product")}>
                  <div className="flex items-center gap-1">Product <SortIcon sortKey="product" /></div>
                </TableHead>
                <TableHead className="hidden sm:table-cell cursor-pointer" onClick={() => handleSort("sku")}>
                  <div className="flex items-center gap-1">SKU <SortIcon sortKey="sku" /></div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("stock")}>
                  <div className="flex items-center gap-1">Stock <SortIcon sortKey="stock" /></div>
                </TableHead>
                <TableHead className="hidden lg:table-cell">Threshold</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                  <div className="flex items-center gap-1">Unit Price <SortIcon sortKey="price" /></div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12 text-neutral-500">
                    No products found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => {
                  const config = statusConfig[item.status as keyof typeof statusConfig];
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.product}</p>
                          <p className="text-xs text-neutral-500 font-mono">{item.id}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell font-mono text-sm">{item.sku}</TableCell>
                      <TableCell className="hidden md:table-cell capitalize">{item.category}</TableCell>
                      <TableCell>
                        <span className={cn("font-medium", item.status === "out" ? "text-error" : item.status === "low" ? "text-warning" : "text-neutral-900")}>
                          {item.stock}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-neutral-500">{item.threshold}</TableCell>
                      <TableCell className="font-medium">{item.price}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.supplier}</TableCell>
                      <TableCell>
                        <Badge variant={config.variant} className="gap-1">
                          {config.icon} {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="View product">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit product">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More options">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}