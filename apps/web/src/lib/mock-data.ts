export interface DealerUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "sales_manager" | "inventory_exec" | "sales_exec" | "dealer_owner" | "dealer_staff";
  roleLabel: string;
  dealerName?: string;
  dealerTier?: "Platinum" | "Gold" | "Silver" | "Registered";
  dealerId?: string;
  avatarUrl?: string;
  creditLimit?: number;
  creditUsed?: number;
  territory?: string;
  assignedRep?: {
    name: string;
    phone: string;
    email: string;
  };
}

export const mockUsers: Record<string, DealerUser> = {
  super_admin: {
    id: "usr_admin_1",
    name: "Vikram Malhotra",
    email: "vikram@pfs-sport.com",
    role: "super_admin",
    roleLabel: "Super Admin",
    territory: "All India & Global",
  },
  sales_manager: {
    id: "usr_sales_1",
    name: "Aakash Mehta",
    email: "aakash.m@pfs-sport.com",
    role: "sales_manager",
    roleLabel: "Sales Manager",
    territory: "West & South India",
  },
  sales_exec: {
    id: "usr_sales_2",
    name: "Karan Johar",
    email: "karan.j@pfs-sport.com",
    role: "sales_exec",
    roleLabel: "Sales Executive",
    territory: "Delhi NCR & Northern Zone",
  },
  inventory_exec: {
    id: "usr_inv_1",
    name: "Rajesh Kannan",
    email: "rajesh.k@pfs-sport.com",
    role: "inventory_exec",
    roleLabel: "Logistics & Inventory Head",
    territory: "Central Super Hubs (Bhiwandi & Delhi)",
  },
  dealer_platinum: {
    id: "usr_dlr_plat",
    name: "Anand Singhania",
    email: "anand@apexsports.in",
    role: "dealer_owner",
    roleLabel: "Dealer Owner",
    dealerId: "DLR-MUM-01",
    dealerName: "Apex Sports Infrastructure Pvt Ltd",
    dealerTier: "Platinum",
    creditLimit: 2500000,
    creditUsed: 840000,
    territory: "Maharashtra & Goa",
    assignedRep: {
      name: "Aakash Mehta",
      phone: "+91 98201 44521",
      email: "aakash.m@pfs-sport.com",
    },
  },
  dealer_gold: {
    id: "usr_dlr_gold",
    name: "Suresh Reddy",
    email: "suresh@premiercourts.in",
    role: "dealer_owner",
    roleLabel: "Dealer Owner",
    dealerId: "DLR-BLR-04",
    dealerName: "Premier Court Builders",
    dealerTier: "Gold",
    creditLimit: 1500000,
    creditUsed: 620000,
    territory: "Karnataka & Kerala",
    assignedRep: {
      name: "Aakash Mehta",
      phone: "+91 98201 44521",
      email: "aakash.m@pfs-sport.com",
    },
  },
  dealer_silver: {
    id: "usr_dlr_silver",
    name: "Gurpreet Singh",
    email: "gurpreet@protracksurfaces.com",
    role: "dealer_owner",
    roleLabel: "Dealer Owner",
    dealerId: "DLR-DEL-08",
    dealerName: "ProTrack Sports Surfaces",
    dealerTier: "Silver",
    creditLimit: 800000,
    creditUsed: 150000,
    territory: "Delhi NCR & Punjab",
    assignedRep: {
      name: "Karan Johar",
      phone: "+91 99100 88219",
      email: "karan.j@pfs-sport.com",
    },
  },
  dealer_staff: {
    id: "usr_dlr_staff_1",
    name: "Pooja Sharma",
    email: "pooja@apexsports.in",
    role: "dealer_staff",
    roleLabel: "Dealer Project Estimator",
    dealerId: "DLR-MUM-01",
    dealerName: "Apex Sports Infrastructure Pvt Ltd",
    dealerTier: "Platinum",
    territory: "Mumbai Regional Office",
  },
};

export interface SportCourtSpec {
  id: string;
  name: string;
  slug: string;
  standardWidthFt: number;
  standardLengthFt: number;
  defaultAreaSqFt: number;
  minRunoffFt: number;
  recommendedSystem: string;
  indoorOutdoor: "Indoor & Outdoor" | "Outdoor Only" | "Indoor Only";
  itfOrGovCategory: string;
  description: string;
  zones: {
    key: string;
    label: string;
    defaultColor: string;
  }[];
}

export const sportSpecs: Record<string, SportCourtSpec> = {
  pickleball: {
    id: "pickleball",
    name: "Pickleball",
    slug: "pickleball",
    standardWidthFt: 30,
    standardLengthFt: 60,
    defaultAreaSqFt: 1800,
    minRunoffFt: 5,
    recommendedSystem: "PFS Pro Tour 8-Layer Acrylic Cushion",
    indoorOutdoor: "Indoor & Outdoor",
    itfOrGovCategory: "USA Pickleball Approved",
    description: "Official 20x44 ft playing area with 7ft non-volley kitchen zone and 5ft safety perimeter runoffs.",
    zones: [
      { key: "playingArea", label: "Main Playing Area (Service Courts)", defaultColor: "#1976D2" },
      { key: "kitchen", label: "Non-Volley Zone (Kitchen)", defaultColor: "#006442" },
      { key: "perimeter", label: "Perimeter & Runoff Surround", defaultColor: "#0A2A57" },
      { key: "lines", label: "Boundary & Center Lines", defaultColor: "#FFFFFF" },
    ],
  },
  tennis: {
    id: "tennis",
    name: "Tennis",
    slug: "tennis",
    standardWidthFt: 60,
    standardLengthFt: 120,
    defaultAreaSqFt: 7200,
    minRunoffFt: 12,
    recommendedSystem: "PFS Pro Tour 8-Layer Acrylic Cushion",
    indoorOutdoor: "Indoor & Outdoor",
    itfOrGovCategory: "ITF Category 4 (Medium-Fast)",
    description: "Standard 78x36 ft tournament doubles court with 12ft side and 21ft baseline runoffs.",
    zones: [
      { key: "playingArea", label: "Inner Court (Singles & Doubles Alleys)", defaultColor: "#1976D2" },
      { key: "serviceBox", label: "Service Boxes", defaultColor: "#0288D1" },
      { key: "perimeter", label: "Out of Bounds Perimeter", defaultColor: "#006442" },
      { key: "lines", label: "Court Lines (2-inch regulation)", defaultColor: "#FFFFFF" },
    ],
  },
  padel: {
    id: "padel",
    name: "Padel",
    slug: "padel",
    standardWidthFt: 33, // 10m
    standardLengthFt: 66, // 20m
    defaultAreaSqFt: 2178,
    minRunoffFt: 2,
    recommendedSystem: "PFS UltraPadel Monofilament Synthetic Turf",
    indoorOutdoor: "Indoor & Outdoor",
    itfOrGovCategory: "FIP / International Padel Federation",
    description: "10x20m enclosed glass/mesh court with textured silica-infilled monofilament turf.",
    zones: [
      { key: "playingArea", label: "Turf Surface (Backcourt)", defaultColor: "#1976D2" },
      { key: "serviceBox", label: "Service Boxes", defaultColor: "#0288D1" },
      { key: "perimeter", label: "Surround Structure / Runoff", defaultColor: "#0A2A57" },
      { key: "lines", label: "Service & Center Lines", defaultColor: "#FFFFFF" },
    ],
  },
  badminton: {
    id: "badminton",
    name: "Badminton",
    slug: "badminton",
    standardWidthFt: 20,
    standardLengthFt: 44,
    defaultAreaSqFt: 1200,
    minRunoffFt: 4,
    recommendedSystem: "PFS PolyTurf PU Point Elastic 7mm",
    indoorOutdoor: "Indoor Only",
    itfOrGovCategory: "BWF Grade 1 Certified",
    description: "20x44 ft doubles court with point-elastic polyurethane shock absorption layer.",
    zones: [
      { key: "playingArea", label: "Doubles Court Surface", defaultColor: "#006442" },
      { key: "serviceBox", label: "Short Service Zones", defaultColor: "#1E824C" },
      { key: "perimeter", label: "Wood / PU Surround Area", defaultColor: "#64748B" },
      { key: "lines", label: "Boundary Lines (40mm regulation)", defaultColor: "#FFFFFF" },
    ],
  },
  basketball: {
    id: "basketball",
    name: "Basketball / 3x3",
    slug: "basketball",
    standardWidthFt: 50,
    standardLengthFt: 84,
    defaultAreaSqFt: 4200,
    minRunoffFt: 6,
    recommendedSystem: "PFS Interlocking Pro Mod-Tile PP",
    indoorOutdoor: "Indoor & Outdoor",
    itfOrGovCategory: "FIBA Compliant Interlocking",
    description: "High-grip UV-stabilized polypropylene interlocking modular tile system with dynamic shock absorption.",
    zones: [
      { key: "playingArea", label: "Main Playing Floor", defaultColor: "#B9903C" },
      { key: "key", label: "Key / Restricted Paint Area", defaultColor: "#0A2A57" },
      { key: "perimeter", label: "Surround & Team Benches", defaultColor: "#071D3D" },
      { key: "lines", label: "3-Point, Free Throw & Center Lines", defaultColor: "#FFFFFF" },
    ],
  },
};

export interface PFSColorSwatch {
  code: string;
  name: string;
  hex: string;
  ral?: string;
  category: "Primary" | "Accent" | "Nature" | "Neutral";
}

export const pfsColorPalette: PFSColorSwatch[] = [
  { code: "PFS-C-01", name: "PFS Classic Navy", hex: "#0A2A57", ral: "RAL 5011", category: "Primary" },
  { code: "PFS-C-02", name: "PFS Dark Navy", hex: "#071D3D", ral: "RAL 5004", category: "Primary" },
  { code: "PFS-C-03", name: "PFS Forest Green", hex: "#006442", ral: "RAL 6005", category: "Nature" },
  { code: "PFS-C-04", name: "PFS Emerald Green", hex: "#1E824C", ral: "RAL 6029", category: "Nature" },
  { code: "PFS-C-05", name: "PFS Stadium Blue", hex: "#1976D2", ral: "RAL 5015", category: "Primary" },
  { code: "PFS-C-06", name: "PFS Ocean Azure", hex: "#0288D1", ral: "RAL 5012", category: "Primary" },
  { code: "PFS-C-07", name: "PFS Champion Gold", hex: "#B9903C", ral: "RAL 1024", category: "Accent" },
  { code: "PFS-C-08", name: "PFS Amber Yellow", hex: "#F59E0B", ral: "RAL 1023", category: "Accent" },
  { code: "PFS-C-09", name: "PFS Coral Orange", hex: "#F36E21", ral: "RAL 2004", category: "Accent" },
  { code: "PFS-C-10", name: "PFS Terracotta Clay", hex: "#B33925", ral: "RAL 3016", category: "Nature" },
  { code: "PFS-C-11", name: "PFS Crimson Ruby", hex: "#9E1B32", ral: "RAL 3003", category: "Accent" },
  { code: "PFS-C-12", name: "PFS Slate Grey", hex: "#64748B", ral: "RAL 7037", category: "Neutral" },
  { code: "PFS-C-13", name: "PFS Anthracite Dark", hex: "#334155", ral: "RAL 7016", category: "Neutral" },
  { code: "PFS-C-14", name: "PFS Regulation White", hex: "#FFFFFF", ral: "RAL 9003", category: "Neutral" },
];

export interface VisualiserPreset {
  id: string;
  name: string;
  sport: string;
  zones: Record<string, string>;
  popular: boolean;
}

export const visualiserPresets: VisualiserPreset[] = [
  {
    id: "us-open-pb",
    name: "US Open Championship",
    sport: "pickleball",
    zones: {
      playingArea: "#1976D2",
      kitchen: "#006442",
      perimeter: "#0A2A57",
      lines: "#FFFFFF",
    },
    popular: true,
  },
  {
    id: "pfs-signature-pb",
    name: "PFS Signature Gold & Navy",
    sport: "pickleball",
    zones: {
      playingArea: "#B9903C",
      kitchen: "#0A2A57",
      perimeter: "#071D3D",
      lines: "#FFFFFF",
    },
    popular: true,
  },
  {
    id: "miami-vibe-pb",
    name: "Miami Beach Sunset",
    sport: "pickleball",
    zones: {
      playingArea: "#0288D1",
      kitchen: "#F36E21",
      perimeter: "#1976D2",
      lines: "#FFFFFF",
    },
    popular: false,
  },
  {
    id: "wimbledon-tennis",
    name: "Classic Grass & Clay Dual",
    sport: "tennis",
    zones: {
      playingArea: "#006442",
      serviceBox: "#1E824C",
      perimeter: "#B33925",
      lines: "#FFFFFF",
    },
    popular: true,
  },
  {
    id: "aus-open-tennis",
    name: "Melbourne Blue Wave",
    sport: "tennis",
    zones: {
      playingArea: "#0288D1",
      serviceBox: "#1976D2",
      perimeter: "#0A2A57",
      lines: "#FFFFFF",
    },
    popular: true,
  },
  {
    id: "fiba-pro-bb",
    name: "Pro Arena Navy & Gold",
    sport: "basketball",
    zones: {
      playingArea: "#B9903C",
      key: "#0A2A57",
      perimeter: "#071D3D",
      lines: "#FFFFFF",
    },
    popular: true,
  },
];

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: "Surface Systems" | "Modular Tiles" | "PU Flooring" | "Turf" | "Accessories";
  sports: string[];
  systemTier: "Pro Tour (8-Layer)" | "Club Supreme (5-Layer)" | "Elite Modular PP" | "Point Elastic PU" | "Tournament Accessories";
  thickness: string;
  indoorOutdoor: "Indoor & Outdoor" | "Indoor Only" | "Outdoor Only";
  certification: string;
  moq: string;
  leadTime: string;
  mrpInr: number;
  silverPrice: number;
  goldPrice: number;
  platinumPrice: number;
  stockOnHands: number;
  stockReserved: number;
  reorderLevel: number;
  description: string;
  imageUrl: string;
  features: string[];
}

export const mockProducts: ProductItem[] = [
  {
    id: "prod-1",
    sku: "PFS-AC-PRO-8",
    name: "PFS Pro Tour 8-Layer Acrylic Cushion System",
    category: "Surface Systems",
    sports: ["Pickleball", "Tennis", "Multi-sport"],
    systemTier: "Pro Tour (8-Layer)",
    thickness: "8.0 mm (SBR Rubber Granule Cushion Base + 5 Acrylic Topcoats)",
    indoorOutdoor: "Indoor & Outdoor",
    certification: "ITF Category 4 (Medium-Fast), USA Pickleball Compliant",
    moq: "1 Court (1,800 sq ft)",
    leadTime: "3-5 business days",
    mrpInr: 185, // per sq ft
    silverPrice: 166.5,
    goldPrice: 151.7,
    platinumPrice: 138.75,
    stockOnHands: 42000,
    stockReserved: 12500,
    reorderLevel: 15000,
    description: "Premium professional grade multilayer acrylic court surfacing system with micro-rubber elasticity cushions engineered for maximum player joint comfort and consistent tournament ball bounce.",
    imageUrl: "/images/products/acrylic-pro.jpg",
    features: [
      "8-layer elastomeric cushion matrix minimizes knee and lower-back fatigue",
      "UV-resistant 100% acrylic pure color pigments prevent chalking and fading",
      "High slip resistance rating under both wet and dry conditions",
      "5-Year manufacturer backed commercial warranty",
    ],
  },
  {
    id: "prod-2",
    sku: "PFS-AC-SUP-5",
    name: "PFS Club Supreme 5-Layer Hard Court Acrylic",
    category: "Surface Systems",
    sports: ["Pickleball", "Tennis", "Basketball"],
    systemTier: "Club Supreme (5-Layer)",
    thickness: "4.0 mm (Resurfacing Base + Fortified Acrylic Color Coats)",
    indoorOutdoor: "Indoor & Outdoor",
    certification: "ITF Category 3 (Medium Pace)",
    moq: "1 Court (1,800 sq ft)",
    leadTime: "2-4 business days",
    mrpInr: 120, // per sq ft
    silverPrice: 108,
    goldPrice: 98.4,
    platinumPrice: 90,
    stockOnHands: 65000,
    stockReserved: 18000,
    reorderLevel: 20000,
    description: "Durable high-performance hard court acrylic resurfacing system ideal for sports clubs, housing societies, resorts, and educational institutions requiring high wear resistance.",
    imageUrl: "/images/products/acrylic-club.jpg",
    features: [
      "5-layer hard acrylic formulation with reinforced silica micro-texture",
      "Exceptional resistance to blistering and monsoon weather cycles",
      "Low maintenance cleaning profile",
      "Standard 3-Year warranty",
    ],
  },
  {
    id: "prod-3",
    sku: "PFS-MOD-TILE-15",
    name: "PFS Interlocking Pro Mod-Tile PP System",
    category: "Modular Tiles",
    sports: ["Pickleball", "Basketball", "Futsal", "Multi-sport"],
    systemTier: "Elite Modular PP",
    thickness: "15.8 mm High-Impact UV-Stabilized Polypropylene",
    indoorOutdoor: "Indoor & Outdoor",
    certification: "USA Pickleball Approved, FIBA Standard compliant",
    moq: "500 sq ft",
    leadTime: "Immediate dispatch (In Stock)",
    mrpInr: 210, // per sq ft
    silverPrice: 189,
    goldPrice: 172.2,
    platinumPrice: 157.5,
    stockOnHands: 28000,
    stockReserved: 6400,
    reorderLevel: 10000,
    description: "Self-draining interlocking modular court tiles with 4-point loop expansion joints that eliminate thermal buckling and enable fast dry-time after rain.",
    imageUrl: "/images/products/mod-tile.jpg",
    features: [
      "Rapid click-lock DIY installation over concrete or asphalt in under 6 hours",
      "Suspended structure provides 35% lateral shock absorption",
      "Open-grid self-draining surface playable 15 minutes after rain",
      "10-Year commercial product warranty",
    ],
  },
  {
    id: "prod-4",
    sku: "PFS-PU-INDOOR-7",
    name: "PFS PolyTurf PU Point Elastic Indoor System",
    category: "PU Flooring",
    sports: ["Badminton", "Gymnastics", "Multi-sport"],
    systemTier: "Point Elastic PU",
    thickness: "7.0 mm (4mm SBR Cushion Mat + 2mm Seamless Polyurethane + 1mm Matt Topcoat)",
    indoorOutdoor: "Indoor Only",
    certification: "BWF Grade 1 Certified, EN 14904 European Standard",
    moq: "1 Court (1,200 sq ft)",
    leadTime: "5-7 business days",
    mrpInr: 260, // per sq ft
    silverPrice: 234,
    goldPrice: 213.2,
    platinumPrice: 195,
    stockOnHands: 18500,
    stockReserved: 9200,
    reorderLevel: 8000,
    description: "Seamless point-elastic indoor polyurethane sports flooring delivering supreme ball bounce uniformity and maximum player joint protection.",
    imageUrl: "/images/products/pu-indoor.jpg",
    features: [
      "BWF Grade 1 compliant friction coefficient",
      "Seamless monolithic finish with zero trip edges",
      "High scratch and chemical resistance",
      "Acoustic dampening layer reduces gymnasium echo",
    ],
  },
  {
    id: "prod-5",
    sku: "PFS-PADEL-12M",
    name: "PFS UltraPadel Monofilament Synthetic Turf 12mm",
    category: "Turf",
    sports: ["Padel", "Tennis"],
    systemTier: "Pro Tour (8-Layer)",
    thickness: "12 mm Curled Monofilament Polyethylene with Round Silica Infill",
    indoorOutdoor: "Indoor & Outdoor",
    certification: "FIP (International Padel Federation) Compliant",
    moq: "1 Full Court (2,178 sq ft)",
    leadTime: "4-6 business days",
    mrpInr: 195, // per sq ft
    silverPrice: 175.5,
    goldPrice: 159.9,
    platinumPrice: 146.25,
    stockOnHands: 14200,
    stockReserved: 4350,
    reorderLevel: 6000,
    description: "Texturized high-density curled monofilament fibers engineered specifically for padel courts to prevent directional ball drift and guarantee uniform grip.",
    imageUrl: "/images/products/padel-turf.jpg",
    features: [
      "Texturized PE yarn prevents sand dispersion and uneven wear",
      "Optimum shoe traction allows controlled slide and rapid pivot moves",
      "Heavy duty double backing with UV stabilization",
    ],
  },
  {
    id: "prod-6",
    sku: "PFS-ACC-PB-POSTS",
    name: "PFS Heavy Duty Tournament Pickleball Net Post Set",
    category: "Accessories",
    sports: ["Pickleball"],
    systemTier: "Tournament Accessories",
    thickness: "76mm Heavy Gauge Galvanized Steel with Brass Internal Winder",
    indoorOutdoor: "Indoor & Outdoor",
    certification: "USA Pickleball Regulation 36-inch / 34-inch Center",
    moq: "1 Set",
    leadTime: "Immediate dispatch",
    mrpInr: 24500, // per set
    silverPrice: 22050,
    goldPrice: 20090,
    platinumPrice: 18375,
    stockOnHands: 48,
    stockReserved: 12,
    reorderLevel: 15,
    description: "Commercial grade heavy powder-coated 3-inch steel posts with internal brass worm gear winder mechanism and stainless steel ground sleeves.",
    imageUrl: "/images/products/net-posts.jpg",
    features: [
      "Corrosion-proof zinc phosphate pre-treatment and polyester powder coat",
      "Brass internal gear prevents cord jamming and rust",
      "Includes 3.5mm braided polyethylene net with fiberglass dowels",
    ],
  },
  {
    id: "prod-7",
    sku: "PFS-ACC-LED-400",
    name: "PFS CourtLum 400W Asymmetric LED Floodlight",
    category: "Accessories",
    sports: ["Pickleball", "Tennis", "Basketball", "Padel"],
    systemTier: "Tournament Accessories",
    thickness: "Die-cast Aluminum IP66 / IK08 Housing",
    indoorOutdoor: "Outdoor Only",
    certification: "CE, RoHS, BIS Certified (500+ Lux on-court distribution)",
    moq: "4 Units",
    leadTime: "2-3 business days",
    mrpInr: 18500, // per unit
    silverPrice: 16650,
    goldPrice: 15170,
    platinumPrice: 13875,
    stockOnHands: 120,
    stockReserved: 32,
    reorderLevel: 25,
    description: "Precision asymmetric optics engineered to cast zero glare into players' eyes while delivering uniform 500+ lux luminance across the entire court perimeter.",
    imageUrl: "/images/products/led-light.jpg",
    features: [
      "56,000 Lumens (140 lm/W efficiency) with Lumileds chips",
      "Asymmetric beam cuts off light spill outside court fence",
      "10kV surge protection against lightning and grid fluctuations",
    ],
  },
  {
    id: "prod-8",
    sku: "PFS-DRUM-COL-20L",
    name: "PFS PureColor 100% Acrylic Color Concentrate (20L Drum)",
    category: "Surface Systems",
    sports: ["Pickleball", "Tennis", "Basketball", "Multi-sport"],
    systemTier: "Pro Tour (8-Layer)",
    thickness: "20L Heavy Duty Sealed Drum (~250 sq ft coverage at 2 coats)",
    indoorOutdoor: "Indoor & Outdoor",
    certification: "ITF Pace 3 & 4 Rated, 100% UV-Stable Pure Acrylic Pigments",
    moq: "2 Drums (40 Litres)",
    leadTime: "24-48h Express Dispatch",
    mrpInr: 8500, // per drum
    silverPrice: 7650,
    goldPrice: 6970,
    platinumPrice: 6375,
    stockOnHands: 450,
    stockReserved: 120,
    reorderLevel: 80,
    description: "Factory premixed high-viscosity pure acrylic topcoat formulated with rounded silica aggregates for consistent ball grip, uniform bounce, and zero chalking.",
    imageUrl: "/images/products/color-drum.jpg",
    features: [
      "Available in 14 standard tournament RAL shades",
      "Heavy UV-absorber chemistry resists tropical degradation",
      "Factory sand-graded for uniform ITF pace rating",
    ],
  },
  {
    id: "prod-9",
    sku: "PFS-DRUM-RES-20L",
    name: "PFS Acrylic Concrete Primer & Heavy Resurfacer (20L Drum)",
    category: "Surface Systems",
    sports: ["Pickleball", "Tennis", "Multi-sport"],
    systemTier: "Club Supreme (5-Layer)",
    thickness: "20L Concentrated Latex-Acrylic Emulsion",
    indoorOutdoor: "Indoor & Outdoor",
    certification: "ASTM D-2939 Moisture Vapor & Asphalt Adhesion Standard",
    moq: "2 Drums",
    leadTime: "24-48h Express Dispatch",
    mrpInr: 6800, // per drum
    silverPrice: 6120,
    goldPrice: 5576,
    platinumPrice: 5100,
    stockOnHands: 320,
    stockReserved: 85,
    reorderLevel: 60,
    description: "Deep-penetrating acrylic primer and leveling resurfacer designed to lock concrete pores, bridge hairline micro-cracks, and form a water-resistant bond coat.",
    imageUrl: "/images/products/resurfacer-drum.jpg",
    features: [
      "Locks free lime and prevents alkali blister formation",
      "High solid content fills asphalt voids and rough concrete screed",
      "Quick 2-hour dry time in ambient tropical temperatures",
    ],
  },
  {
    id: "prod-10",
    sku: "PFS-LINE-WHITE-5L",
    name: "PFS Tournament Line Marking Acrylic Paint (5L Can)",
    category: "Accessories",
    sports: ["Pickleball", "Tennis", "Basketball", "Badminton"],
    systemTier: "Tournament Accessories",
    thickness: "5L High-Opacity Pure White / Yellow Coating",
    indoorOutdoor: "Indoor & Outdoor",
    certification: "Non-Bleed Razor Edge Formula, USA Pickleball / ITF Compliant",
    moq: "1 Can (5 Litres)",
    leadTime: "Immediate dispatch",
    mrpInr: 3200, // per can
    silverPrice: 2880,
    goldPrice: 2624,
    platinumPrice: 2400,
    stockOnHands: 180,
    stockReserved: 40,
    reorderLevel: 30,
    description: "Super-bright, 100% acrylic textured boundary line paint engineered for zero under-tape bleeding and maximum contrast under LED floodlights.",
    imageUrl: "/images/products/line-paint.jpg",
    features: [
      "Ultra-high titanium dioxide load for maximum daytime & night reflectivity",
      "Contains fine texture to prevent wet line shoe slippage",
      "1 Can marks 2 regulation pickleball courts or 1 full tennis court",
    ],
  },
  {
    id: "prod-11",
    sku: "PFS-SMP-BOX-14",
    name: "PFS Official 14-Color Swatch Sample Presentation Box",
    category: "Accessories",
    sports: ["Pickleball", "Tennis", "Padel", "Multi-sport"],
    systemTier: "Tournament Accessories",
    thickness: "Luxury Binder with 14 Cured Swatches + Interlocking PP Tile",
    indoorOutdoor: "Indoor & Outdoor",
    certification: "100% Refundable against first wholesale materials order",
    moq: "1 Kit",
    leadTime: "24h Courier Dispatch",
    mrpInr: 999, // per kit
    silverPrice: 999,
    goldPrice: 999,
    platinumPrice: 999,
    stockOnHands: 250,
    stockReserved: 15,
    reorderLevel: 25,
    description: "Architect presentation portfolio containing real cured acrylic surface swatches in all 14 tournament RAL shades, interlocking modular PP tile sample, and complete TDS technical sheets.",
    imageUrl: "/images/products/swatch-box.jpg",
    features: [
      "14 cured physical color coupons for on-site client sign-off",
      "Real modular interlocking PP tile sample module",
      "100% refundable voucher code (SWATCH999) included for first system order",
    ],
  },
];

export interface OrderRecord {
  id: string;
  orderNumber: string;
  dealerId: string;
  dealerName: string;
  dealerTier: "Platinum" | "Gold" | "Silver" | "Registered";
  status: "draft" | "submitted" | "confirmed" | "processing" | "packed" | "dispatched" | "delivered" | "cancelled";
  createdAt: string;
  items: {
    productId: string;
    productName: string;
    sku: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  discountAmount: number;
  gstAmount: number; // 18%
  totalAmount: number;
  paymentTerms: "100% Advance" | "50% Advance / 50% on Dispatch" | "30 Days Net Credit";
  paymentStatus: "Unpaid" | "Partially Paid" | "Paid" | "Overdue";
  paidAmount: number;
  shipmentId?: string;
  destinationCity: string;
  projectReference?: string;
}

export const mockOrders: OrderRecord[] = [
  {
    id: "ord-101",
    orderNumber: "PFS-ORD-2026-089",
    dealerId: "DLR-MUM-01",
    dealerName: "Apex Sports Infrastructure Pvt Ltd",
    dealerTier: "Platinum",
    status: "dispatched",
    createdAt: "2026-08-22T10:30:00Z",
    items: [
      {
        productId: "prod-1",
        productName: "PFS Pro Tour 8-Layer Acrylic Cushion System",
        sku: "PFS-AC-PRO-8",
        quantity: 3600, // 2 pickleball courts
        unit: "sq ft",
        unitPrice: 138.75,
        totalPrice: 499500,
      },
      {
        productId: "prod-6",
        productName: "PFS Heavy Duty Tournament Pickleball Net Post Set",
        sku: "PFS-ACC-PB-POSTS",
        quantity: 2,
        unit: "set",
        unitPrice: 18375,
        totalPrice: 36750,
      },
    ],
    subtotal: 715000,
    discountAmount: 178750, // 25% Platinum discount
    gstAmount: 96525, // 18%
    totalAmount: 632775,
    paymentTerms: "30 Days Net Credit",
    paymentStatus: "Partially Paid",
    paidAmount: 300000,
    shipmentId: "SHP-2026-044",
    destinationCity: "Pune Sports Complex, Maharashtra",
    projectReference: "Pune Club 2x Tournament Courts",
  },
  {
    id: "ord-102",
    orderNumber: "PFS-ORD-2026-088",
    dealerId: "DLR-BLR-04",
    dealerName: "Premier Court Builders",
    dealerTier: "Gold",
    status: "processing",
    createdAt: "2026-08-24T14:15:00Z",
    items: [
      {
        productId: "prod-3",
        productName: "PFS Interlocking Pro Mod-Tile PP System",
        sku: "PFS-MOD-TILE-15",
        quantity: 4200, // Basketball court
        unit: "sq ft",
        unitPrice: 172.2,
        totalPrice: 723240,
      },
    ],
    subtotal: 882000,
    discountAmount: 158760, // 18% Gold discount
    gstAmount: 130183,
    totalAmount: 853423,
    paymentTerms: "50% Advance / 50% on Dispatch",
    paymentStatus: "Partially Paid",
    paidAmount: 426711,
    shipmentId: "SHP-2026-045",
    destinationCity: "Whitefield, Bengaluru",
    projectReference: "Greenfield Academy Outdoor BB",
  },
  {
    id: "ord-103",
    orderNumber: "PFS-ORD-2026-087",
    dealerId: "DLR-DEL-08",
    dealerName: "ProTrack Sports Surfaces",
    dealerTier: "Silver",
    status: "confirmed",
    createdAt: "2026-08-25T09:00:00Z",
    items: [
      {
        productId: "prod-2",
        productName: "PFS Club Supreme 5-Layer Hard Court Acrylic",
        sku: "PFS-AC-SUP-5",
        quantity: 7200, // Tennis court
        unit: "sq ft",
        unitPrice: 108,
        totalPrice: 777600,
      },
    ],
    subtotal: 864000,
    discountAmount: 86400, // 10% Silver discount
    gstAmount: 139968,
    totalAmount: 917568,
    paymentTerms: "100% Advance",
    paymentStatus: "Paid",
    paidAmount: 917568,
    destinationCity: "Sector 62, Noida, NCR",
    projectReference: "Noida Housing Society Tennis Renovation",
  },
  {
    id: "ord-104",
    orderNumber: "PFS-ORD-2026-086",
    dealerId: "DLR-MUM-01",
    dealerName: "Apex Sports Infrastructure Pvt Ltd",
    dealerTier: "Platinum",
    status: "delivered",
    createdAt: "2026-08-14T11:20:00Z",
    items: [
      {
        productId: "prod-5",
        productName: "PFS UltraPadel Monofilament Synthetic Turf 12mm",
        sku: "PFS-PADEL-12M",
        quantity: 2178,
        unit: "sq ft",
        unitPrice: 146.25,
        totalPrice: 318532,
      },
      {
        productId: "prod-7",
        productName: "PFS CourtLum 400W Asymmetric LED Floodlight",
        sku: "PFS-ACC-LED-400",
        quantity: 8,
        unit: "unit",
        unitPrice: 13875,
        totalPrice: 111000,
      },
    ],
    subtotal: 572710,
    discountAmount: 143178,
    gstAmount: 77315,
    totalAmount: 506847,
    paymentTerms: "30 Days Net Credit",
    paymentStatus: "Paid",
    paidAmount: 506847,
    shipmentId: "SHP-2026-039",
    destinationCity: "Andheri West, Mumbai",
    projectReference: "Urban Padel Club 1x Court",
  },
];

export interface ShipmentRecord {
  id: string;
  shipmentNumber: string;
  orderNumber: string;
  dealerName: string;
  carrierName: string;
  trackingAwb: string;
  dispatchDate: string;
  estimatedDeliveryDate: string;
  originWarehouse: string;
  destinationCity: string;
  status: "dispatched" | "in_transit" | "out_for_delivery" | "delivered";
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  eWayBillNumber?: string;
  packageCount?: number;
  totalWeightKg?: number;
  packageBreakdown?: string;
  qcInspectionPassed?: boolean;
  timeline: {
    title: string;
    location: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
    description: string;
  }[];
  podUrl?: string;
  podSignedBy?: string;
}

export const mockShipments: ShipmentRecord[] = [
  {
    id: "SHP-2026-044",
    shipmentNumber: "PFS-SHP-88219",
    orderNumber: "PFS-ORD-2026-089",
    dealerName: "Apex Sports Infrastructure Pvt Ltd",
    carrierName: "Safexpress Logistics Ltd",
    trackingAwb: "SFX-89920144",
    dispatchDate: "2026-08-25",
    estimatedDeliveryDate: "2026-08-27",
    originWarehouse: "Bhiwandi Hub, Mumbai",
    destinationCity: "Pune, Maharashtra",
    status: "in_transit",
    timeline: [
      {
        title: "Order Picked & Palletized",
        location: "PFS Bhiwandi Hub, Gate 4",
        timestamp: "25 Aug 2026, 09:30 AM",
        completed: true,
        description: "12 Drums Acrylic Cushion Base + 2 Net Post Crates loaded onto container truck.",
      },
      {
        title: "Dispatched from Origin Hub",
        location: "Bhiwandi Expressway Hub",
        timestamp: "25 Aug 2026, 01:15 PM",
        completed: true,
        description: "Transit Manifest generated. Vehicle No: MH-04-EB-8891.",
      },
      {
        title: "In Transit — Pune Highway Checkpoint",
        location: "Kamshet Toll Plaza, Expressway",
        timestamp: "26 Aug 2026, 11:45 AM",
        completed: true,
        current: true,
        description: "Shipment on schedule. Expected arrival at Chakan delivery hub tonight.",
      },
      {
        title: "Out for Final Site Delivery",
        location: "Pune Chakan Delivery Hub",
        timestamp: "27 Aug 2026 (Scheduled)",
        completed: false,
        description: "Local delivery vehicle will coordinate offloading crane at site.",
      },
      {
        title: "Delivered & POD Signed",
        location: "Pune Sports Complex Site",
        timestamp: "27 Aug 2026 (Estimated)",
        completed: false,
        description: "Consignee verification and delivery challan sign-off.",
      },
    ],
  },
  {
    id: "SHP-2026-039",
    shipmentNumber: "PFS-SHP-88102",
    orderNumber: "PFS-ORD-2026-086",
    dealerName: "Apex Sports Infrastructure Pvt Ltd",
    carrierName: "VRL Logistics",
    trackingAwb: "VRL-MUM-77291",
    dispatchDate: "2026-08-16",
    estimatedDeliveryDate: "2026-08-18",
    originWarehouse: "Bhiwandi Hub, Mumbai",
    destinationCity: "Andheri West, Mumbai",
    status: "delivered",
    podSignedBy: "Ramesh Pawar (Site Engineer)",
    podUrl: "/documents/pod-shp-039.pdf",
    timeline: [
      {
        title: "Order Picked & Palletized",
        location: "PFS Bhiwandi Hub",
        timestamp: "16 Aug 2026, 10:00 AM",
        completed: true,
        description: "Turf Rolls & 8 LED fixtures inspected and cleared QC.",
      },
      {
        title: "Dispatched from Origin",
        location: "Bhiwandi Super Depot",
        timestamp: "16 Aug 2026, 04:30 PM",
        completed: true,
        description: "Vehicle No: MH-03-CB-1240.",
      },
      {
        title: "Out for Delivery",
        location: "Andheri Hub",
        timestamp: "18 Aug 2026, 08:30 AM",
        completed: true,
        description: "Driver: Santosh (+91 98200 11234).",
      },
      {
        title: "Delivered Successfully",
        location: "Urban Padel Club, Andheri",
        timestamp: "18 Aug 2026, 02:45 PM",
        completed: true,
        current: true,
        description: "Received in good condition. POD uploaded to Document Vault.",
      },
    ],
  },
];

export interface CRMLead {
  id: string;
  leadNumber: string;
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  sportInterest: "Pickleball" | "Tennis" | "Padel" | "Badminton" | "Basketball" | "Multi-Court Complex";
  projectType: "Sports Club / Resort" | "Housing Society" | "School / University" | "Commercial Pay & Play" | "Private Villa";
  courtCount: number;
  budgetBand: "₹5L - ₹15L" | "₹15L - ₹35L" | "₹35L - ₹75L" | "₹75L+";
  timeline: "Immediate (< 30 days)" | "1 - 3 Months" | "3 - 6 Months" | "Planning Stage";
  stage: "New" | "Contacted" | "Qualified" | "Estimate/Quote" | "Won" | "Lost" | "Nurture";
  score: number; // 0 - 100
  scoreBand: "Hot" | "Warm" | "Cold";
  assignedTo: string;
  createdAt: string;
  lastFollowUp: string;
  nextFollowUpDue: string;
  slaBreach: boolean;
  notes: {
    id: string;
    author: string;
    timestamp: string;
    text: string;
  }[];
}

export const mockLeads: CRMLead[] = [
  {
    id: "lead-001",
    leadNumber: "LEAD-2026-442",
    fullName: "Rohan Singhal",
    organization: "DLF CyberCity Club & Gym",
    email: "rohan.singhal@dlf.in",
    phone: "+91 98110 55432",
    city: "Gurugram",
    state: "Haryana",
    sportInterest: "Pickleball",
    projectType: "Sports Club / Resort",
    courtCount: 4,
    budgetBand: "₹15L - ₹35L",
    timeline: "Immediate (< 30 days)",
    stage: "New",
    score: 94,
    scoreBand: "Hot",
    assignedTo: "Aakash Mehta",
    createdAt: "2026-08-26T08:30:00Z",
    lastFollowUp: "2026-08-26T08:30:00Z",
    nextFollowUpDue: "2026-08-26T12:30:00Z",
    slaBreach: true,
    notes: [
      {
        id: "n-1",
        author: "System (Web Form Ingestion)",
        timestamp: "26 Aug 2026, 08:30 AM",
        text: "Inquiry received via public court builder form. Client has 8,000 sq ft terrace rooftop in Gurugram Phase 3. Wants 4 pickleball courts with floodlights and tournament nets. Existing concrete slab is 1 year old in good condition.",
      },
    ],
  },
  {
    id: "lead-002",
    leadNumber: "LEAD-2026-439",
    fullName: "Col. Sanjeev Bakshi",
    organization: "Army Officers Sports Complex",
    email: "sanjeev.bakshi@defence.gov.in",
    phone: "+91 97170 33819",
    city: "Chandigarh",
    state: "Punjab",
    sportInterest: "Tennis",
    projectType: "Sports Club / Resort",
    courtCount: 2,
    budgetBand: "₹35L - ₹75L",
    timeline: "1 - 3 Months",
    stage: "Qualified",
    score: 82,
    scoreBand: "Hot",
    assignedTo: "Aakash Mehta",
    createdAt: "2026-08-23T11:00:00Z",
    lastFollowUp: "2026-08-25T15:00:00Z",
    nextFollowUpDue: "2026-08-28T10:00:00Z",
    slaBreach: false,
    notes: [
      {
        id: "n-2",
        author: "Aakash Mehta",
        timestamp: "25 Aug 2026, 03:00 PM",
        text: "Spoke with Col. Bakshi. They are upgrading two 15-year old asphalt courts to ITF Category 4 cushion system. Tender approval expected by end of month. Sent preliminary TDS and cost range.",
      },
    ],
  },
  {
    id: "lead-003",
    leadNumber: "LEAD-2026-435",
    fullName: "Pooja Hegde",
    organization: "Palm Meadows Residential Society",
    email: "pooja.hegde@palmmeadows.org",
    phone: "+91 98450 77123",
    city: "Bengaluru",
    state: "Karnataka",
    sportInterest: "Badminton",
    projectType: "Housing Society",
    courtCount: 3,
    budgetBand: "₹15L - ₹35L",
    timeline: "1 - 3 Months",
    stage: "Estimate/Quote",
    score: 74,
    scoreBand: "Warm",
    assignedTo: "Karan Johar",
    createdAt: "2026-08-20T14:40:00Z",
    lastFollowUp: "2026-08-24T17:00:00Z",
    nextFollowUpDue: "2026-08-27T11:00:00Z",
    slaBreach: false,
    notes: [
      {
        id: "n-3",
        author: "Karan Johar",
        timestamp: "24 Aug 2026, 05:00 PM",
        text: "Generated formal draft estimate #EST-2026-118 for 3x BWF standard PU point-elastic courts. Society committee reviewing proposal in AGM on Sunday.",
      },
    ],
  },
  {
    id: "lead-004",
    leadNumber: "LEAD-2026-428",
    fullName: "Aditya Shah",
    organization: "Urban Padel Arena LLP",
    email: "aditya@urbanpadel.in",
    phone: "+91 98200 99881",
    city: "Ahmedabad",
    state: "Gujarat",
    sportInterest: "Padel",
    projectType: "Commercial Pay & Play",
    courtCount: 3,
    budgetBand: "₹75L+",
    timeline: "Immediate (< 30 days)",
    stage: "Won",
    score: 98,
    scoreBand: "Hot",
    assignedTo: "Vikram Malhotra",
    createdAt: "2026-08-12T09:15:00Z",
    lastFollowUp: "2026-08-22T16:00:00Z",
    nextFollowUpDue: "2026-09-01T10:00:00Z",
    slaBreach: false,
    notes: [
      {
        id: "n-4",
        author: "Vikram Malhotra",
        timestamp: "22 Aug 2026, 04:00 PM",
        text: "Deal closed! Converted to formal order PFS-ORD-2026-086 for 3x Padel courts turf + lighting package. Advance payment received.",
      },
    ],
  },
];

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  condition: string;
  action: string;
  status: "active" | "paused" | "draft";
  executionCount: number;
  successRate: number; // percentage
  lastTriggered: string;
  category: "Inventory" | "Leads & CRM" | "Orders & Billing" | "Dealer Portal";
}

export const mockAutomationRules: AutomationRule[] = [
  {
    id: "auto-1",
    name: "Low Stock Alert & Auto Reorder Task",
    description: "Monitors real-time stock balances and alerts the inventory head when available stock drops below threshold.",
    trigger: "Stock Balance Updated",
    condition: "Available Qty ≤ Reorder Point",
    action: "Send urgent In-App + Email Alert to Inventory Team & Create Restock Task",
    status: "active",
    executionCount: 142,
    successRate: 100,
    lastTriggered: "26 Aug 2026, 07:15 AM",
    category: "Inventory",
  },
  {
    id: "auto-2",
    name: "Hot Lead SLA Breach Escalation",
    description: "Escalates leads with score ≥ 80 that have received no sales outreach within 2 hours.",
    trigger: "Timer: 2 Hours Post Lead Creation",
    condition: "Lead Score ≥ 80 AND Stage == 'New'",
    action: "Flag SLA Breach on CRM Dashboard & Send SMS/Email Alert to Sales Manager",
    status: "active",
    executionCount: 89,
    successRate: 98.8,
    lastTriggered: "26 Aug 2026, 10:30 AM",
    category: "Leads & CRM",
  },
  {
    id: "auto-3",
    name: "Territory-Based Automated Lead Assignment",
    description: "Automatically maps inbound leads by state/pincode to assigned regional sales managers.",
    trigger: "New Lead Created (Web/Manual)",
    condition: "Territory has an Active Owner",
    action: "Assign Lead, Notify Owner via ZeptoMail & Start Response SLA Timer",
    status: "active",
    executionCount: 312,
    successRate: 100,
    lastTriggered: "26 Aug 2026, 08:30 AM",
    category: "Leads & CRM",
  },
  {
    id: "auto-4",
    name: "Order Confirmation Stock Reservation",
    description: "Instantly locks warehouse inventory within an ACID transaction upon dealer order confirmation.",
    trigger: "Order Status → 'Confirmed'",
    condition: "Sufficient Unreserved Stock Available",
    action: "Execute Stock Reservation, Generate Pro-Forma Invoice & Notify Warehouse Picker",
    status: "active",
    executionCount: 94,
    successRate: 100,
    lastTriggered: "25 Aug 2026, 09:00 AM",
    category: "Orders & Billing",
  },
  {
    id: "auto-5",
    name: "Shipment AWB Dispatch Tracking Broadcast",
    description: "Sends tracking URL and milestone updates to dealer owner and site manager when AWB is entered.",
    trigger: "Shipment Status → 'Dispatched'",
    condition: "Valid Carrier AWB Number Present",
    action: "Send Email + In-App Notification with Live Tracking Stepper to Dealer",
    status: "active",
    executionCount: 76,
    successRate: 100,
    lastTriggered: "25 Aug 2026, 01:15 PM",
    category: "Dealer Portal",
  },
  {
    id: "auto-6",
    name: "Document Revision Supersede Notice",
    description: "Alerts dealers who downloaded older technical data sheets when an updated TDS is published.",
    trigger: "Document Version Published (Replaces Old)",
    condition: "Dealer previously downloaded prior version",
    action: "Queue Dealer Notification & Update Active Vault Index",
    status: "active",
    executionCount: 28,
    successRate: 96.4,
    lastTriggered: "20 Aug 2026, 11:20 AM",
    category: "Dealer Portal",
  },
  {
    id: "auto-7",
    name: "Dealer Application KYC Review Reminder",
    description: "Prompts Super Admin to review pending dealer applications submitted with complete GST/PAN proof.",
    trigger: "Dealer Application Submitted",
    condition: "All Required KYC Files Uploaded",
    action: "Move Dealer to 'Pending Review' & Create Approval Task for Super Admin",
    status: "active",
    executionCount: 18,
    successRate: 100,
    lastTriggered: "18 Aug 2026, 03:40 PM",
    category: "Dealer Portal",
  },
  {
    id: "auto-8",
    name: "Overdue Payment Balance Escalation",
    description: "Sends polite reminder 3 days before net-30 due date, then escalates to account manager if unpaid.",
    trigger: "Order Due Date Approaches (T-3 Days & T+1 Day)",
    condition: "Outstanding Balance > 0",
    action: "Send Payment Reminder Email & Log Outstanding Balance Warning",
    status: "active",
    executionCount: 45,
    successRate: 97.7,
    lastTriggered: "24 Aug 2026, 09:00 AM",
    category: "Orders & Billing",
  },
];

export interface DocumentItem {
  id: string;
  title: string;
  category: "Technical Data Sheets (TDS)" | "Lab Test Reports & Certifications" | "Installation Manuals" | "Warranties" | "Marketing Brochures";
  productSku?: string;
  version: string;
  fileSize: string;
  effectiveDate: string;
  status: "Published" | "Superseded" | "Draft";
  downloadCount: number;
  coBrandable: boolean;
  description: string;
  fileUrl: string;
}

export const mockDocuments: DocumentItem[] = [
  {
    id: "doc-1",
    title: "PFS Pro Tour 8-Layer Acrylic Cushion — Technical Data Sheet (TDS)",
    category: "Technical Data Sheets (TDS)",
    productSku: "PFS-AC-PRO-8",
    version: "v3.2",
    fileSize: "1.4 MB",
    effectiveDate: "2026-07-15",
    status: "Published",
    downloadCount: 348,
    coBrandable: true,
    description: "Complete chemical formulation, tensile elongation, slip resistance coefficient, and layer application coverage rates.",
    fileUrl: "/documents/PFS_Pro_Tour_8_Layer_TDS_v3.2.pdf",
  },
  {
    id: "doc-2",
    title: "ITF Category 4 Official Classification Certificate",
    category: "Lab Test Reports & Certifications",
    productSku: "PFS-AC-PRO-8",
    version: "2026-2029",
    fileSize: "890 KB",
    effectiveDate: "2026-01-10",
    status: "Published",
    downloadCount: 512,
    coBrandable: false,
    description: "International Tennis Federation ball speed pace rating (CPR 42) laboratory certificate issued by Sports Labs Ltd.",
    fileUrl: "/documents/PFS_ITF_Category_4_Certificate.pdf",
  },
  {
    id: "doc-3",
    title: "USA Pickleball Court Surface Material Compliance Report",
    category: "Lab Test Reports & Certifications",
    productSku: "PFS-MOD-TILE-15",
    version: "v2.0",
    fileSize: "1.1 MB",
    effectiveDate: "2026-03-01",
    status: "Published",
    downloadCount: 420,
    coBrandable: false,
    description: "Coefficient of friction and ball rebound test verification matching official USA Pickleball equipment guidelines.",
    fileUrl: "/documents/PFS_USA_Pickleball_Compliance.pdf",
  },
  {
    id: "doc-4",
    title: "Acrylic Sports Flooring Base Preparation & Subfloor Guide",
    category: "Installation Manuals",
    productSku: "PFS-AC-PRO-8",
    version: "v2.4",
    fileSize: "3.2 MB",
    effectiveDate: "2026-05-20",
    status: "Published",
    downloadCount: 289,
    coBrandable: true,
    description: "Step-by-step contractor guide for slope grade tolerances (1:100), moisture vapor barriers, and asphalt/concrete curing.",
    fileUrl: "/documents/PFS_Subfloor_Preparation_Guide.pdf",
  },
  {
    id: "doc-5",
    title: "PFS Commercial Product Catalogue 2026-27 (Co-Brandable Edition)",
    category: "Marketing Brochures",
    version: "v2026.2",
    fileSize: "8.5 MB",
    effectiveDate: "2026-08-01",
    status: "Published",
    downloadCount: 780,
    coBrandable: true,
    description: "High-resolution full color client presentation brochure ready for dealer logo and contact customization.",
    fileUrl: "/documents/PFS_Full_Catalogue_2026.pdf",
  },
  {
    id: "doc-6",
    title: "5-Year Commercial System Warranty Certificate Template",
    category: "Warranties",
    version: "v1.8",
    fileSize: "450 KB",
    effectiveDate: "2026-01-01",
    status: "Published",
    downloadCount: 164,
    coBrandable: true,
    description: "Official warranty terms certificate issued to end clients upon project completion signoff.",
    fileUrl: "/documents/PFS_5_Year_Warranty_Certificate.pdf",
  },
];

export interface AuditEvent {
  id: string;
  actorName: string;
  actorEmail: string;
  role: string;
  module: "Orders" | "Inventory" | "Pricing" | "CRM" | "Dealers" | "Automations" | "Auth";
  action: string;
  targetEntity: string;
  entityId: string;
  ipAddress: string;
  timestamp: string;
  details: string;
}

export const mockAuditEvents: AuditEvent[] = [
  {
    id: "aud-001",
    actorName: "Vikram Malhotra",
    actorEmail: "vikram@pfs-sport.com",
    role: "Super Admin",
    module: "Orders",
    action: "CONFIRM_ORDER",
    targetEntity: "Order",
    entityId: "PFS-ORD-2026-089",
    ipAddress: "103.21.124.8",
    timestamp: "2026-08-25T10:30:15Z",
    details: "Confirmed dealer order for 3,600 sq ft Pro Tour Acrylic. Stock reserved: 3,600 sq ft at Bhiwandi Hub.",
  },
  {
    id: "aud-002",
    actorName: "Rajesh Kannan",
    actorEmail: "rajesh.k@pfs-sport.com",
    role: "Inventory Exec",
    module: "Inventory",
    action: "RECORD_STOCK_RECEIPT",
    targetEntity: "Stock Batch",
    entityId: "BATCH-2026-AC-08",
    ipAddress: "115.114.88.32",
    timestamp: "2026-08-25T09:12:44Z",
    details: "Received 15,000 sq ft raw materials from Chennai factory into Bhiwandi Central Depot.",
  },
  {
    id: "aud-003",
    actorName: "Aakash Mehta",
    actorEmail: "aakash.m@pfs-sport.com",
    role: "Sales Manager",
    module: "CRM",
    action: "UPDATE_LEAD_STAGE",
    targetEntity: "Lead",
    entityId: "LEAD-2026-442",
    ipAddress: "49.36.18.204",
    timestamp: "2026-08-26T08:35:10Z",
    details: "Assigned lead Rohan Singhal (DLF CyberCity) to self. Initiated first-response SLA timer.",
  },
  {
    id: "aud-004",
    actorName: "Vikram Malhotra",
    actorEmail: "vikram@pfs-sport.com",
    role: "Super Admin",
    module: "Pricing",
    action: "UPDATE_RATE_CARD",
    targetEntity: "Rate Card",
    entityId: "RC-2026-V1.4",
    ipAddress: "103.21.124.8",
    timestamp: "2026-08-24T16:20:00Z",
    details: "Published revised Estimator Rate Card v1.4 with freight index adjustment for South Zone.",
  },
];

// ==========================================
// OMNICHANNEL COMMUNICATION MODULE DATA
// ==========================================

export interface AICallRecord {
  id: string;
  callSid: string;
  recipientName: string;
  recipientPhone: string;
  recipientOrg: string;
  roleType: "Lead" | "Dealer" | "Contractor" | "Driver";
  campaignType: "Lead Qualification" | "Payment Follow-up" | "Dispatch Alert" | "Technical Consultation";
  direction: "outbound" | "inbound";
  status: "completed" | "in_progress" | "failed" | "scheduled";
  durationSeconds: number;
  sentimentScore: number; // 0 - 100
  sentimentBand: "Positive" | "Neutral" | "Negative";
  intentIdentified: string;
  transcript: {
    speaker: "AI Agent" | "Customer";
    timestamp: string;
    text: string;
  }[];
  structuredSummary: string;
  actionItems: string[];
  audioUrl?: string;
  createdAt: string;
}

export const mockAICalls: AICallRecord[] = [
  {
    id: "call-101",
    callSid: "CA-AI-2026-88192",
    recipientName: "Rohan Singhal",
    recipientPhone: "+91 98110 44821",
    recipientOrg: "DLF CyberCity Club",
    roleType: "Lead",
    campaignType: "Lead Qualification",
    direction: "outbound",
    status: "completed",
    durationSeconds: 142,
    sentimentScore: 94,
    sentimentBand: "Positive",
    intentIdentified: "Immediate Commercial Procurement (4x Pickleball Pro Tour)",
    transcript: [
      {
        speaker: "AI Agent",
        timestamp: "00:03",
        text: "Hello Rohan! This is Antigravity AI from PFS Sport Infra. I noticed your inquiry for 4 tournament pickleball courts at DLF CyberCity Club. Is this a good time for a 90-second technical check?",
      },
      {
        speaker: "Customer",
        timestamp: "00:15",
        text: "Hi yes! We have existing outdoor asphalt courts that need complete resurfacing with ITF Class 3 cushion acrylic before our tournament in October.",
      },
      {
        speaker: "AI Agent",
        timestamp: "00:32",
        text: "Understood! Our PFS Pro Tour 8-Layer system meets ITF Class 3 pace requirements and comes with UV-resistant pigments. Our North regional engineer Siddharth Verma can schedule a laser level inspection this Thursday. Does 11 AM work?",
      },
      {
        speaker: "Customer",
        timestamp: "00:54",
        text: "Thursday 11 AM is perfect. Please send the TDS document and estimated quote to my WhatsApp as well.",
      },
      {
        speaker: "AI Agent",
        timestamp: "01:08",
        text: "Confirmed! I've sent the complete 8-Layer TDS specification, color swatch catalog, and estimate breakdown directly to your WhatsApp. Have a great day, Rohan!",
      },
    ],
    structuredSummary: "Client confirmed 4x pickleball courts (7,200 sq ft) on asphalt base. Requires ITF Class 3 Pro Tour 8-layer specification for October championship. Scheduled site inspection for Thursday 11 AM with Siddharth Verma. WhatsApp brochure dispatched.",
    actionItems: [
      "Assigned field inspection to Siddharth Verma for Thursday 11:00 AM",
      "Auto-dispatched Pro Tour TDS & Swatch Kit via WhatsApp API",
      "Promoted CRM Lead stage from 'New' to 'Qualified' (Score: 94/100)",
    ],
    createdAt: "Today, 10:45 AM",
  },
  {
    id: "call-102",
    callSid: "CA-AI-2026-88155",
    recipientName: "Kunal Shah (Procurement Lead)",
    recipientPhone: "+91 98200 99182",
    recipientOrg: "Apex Sports Infrastructure Pvt Ltd",
    roleType: "Dealer",
    campaignType: "Dispatch Alert",
    direction: "outbound",
    status: "completed",
    durationSeconds: 88,
    sentimentScore: 98,
    sentimentBand: "Positive",
    intentIdentified: "Delivery Site Offloading Coordination",
    transcript: [
      {
        speaker: "AI Agent",
        timestamp: "00:02",
        text: "Hello Kunal, this is the PFS Logistics AI Dispatcher. Order PFS-ORD-2026-089 has been loaded onto container truck MH-04-EB-8891 and dispatched from our Bhiwandi Super Hub.",
      },
      {
        speaker: "Customer",
        timestamp: "00:18",
        text: "Great! What is the estimated time of arrival at the Pune sports complex site?",
      },
      {
        speaker: "AI Agent",
        timestamp: "00:26",
        text: "The linehaul vehicle is on schedule via the Expressway with arrival scheduled between 2:00 PM and 4:00 PM tomorrow. Driver Mahesh can be reached at +91 98191 22345.",
      },
      {
        speaker: "Customer",
        timestamp: "00:44",
        text: "Understood, our site engineer Ramesh Pawar will be available with the offloading crane.",
      },
    ],
    structuredSummary: "Consignment dispatch notification acknowledged. Verified site offloading crane ready at Pune complex. Driver contact shared.",
    actionItems: [
      "Shared live AWB tracking link via WhatsApp",
      "Notified delivery hub gate-in team of crane availability",
    ],
    createdAt: "Today, 09:15 AM",
  },
  {
    id: "call-103",
    callSid: "CA-AI-2026-87994",
    recipientName: "Dr. Arvind Rao",
    recipientPhone: "+91 94480 11200",
    recipientOrg: "Bangalore International Sports Academy",
    roleType: "Lead",
    campaignType: "Technical Consultation",
    direction: "inbound",
    status: "completed",
    durationSeconds: 195,
    sentimentScore: 91,
    sentimentBand: "Positive",
    intentIdentified: "Badminton PolyTurf PU vs Acrylic Cushion Comparison",
    transcript: [
      {
        speaker: "Customer",
        timestamp: "00:05",
        text: "Hi, I am looking to install 6 indoor badminton courts and need to understand the shock absorption difference between PolyTurf PU 7mm and acrylic.",
      },
      {
        speaker: "AI Agent",
        timestamp: "00:22",
        text: "Welcome Dr. Rao! For indoor badminton, PFS PolyTurf PU 7mm Point-Elastic provides 38% force reduction, BWF Grade 1 certification, and zero joint fatigue compared to hard acrylic which is primarily designed for outdoor tennis and pickleball.",
      },
      {
        speaker: "Customer",
        timestamp: "00:48",
        text: "That is exactly what our orthopedic panel recommended. Can you send the comparative lab test data?",
      },
      {
        speaker: "AI Agent",
        timestamp: "01:05",
        text: "Certainly! I have queued the BWF Grade 1 lab certification, impact force test curves, and Bangalore dealer reference list to your email and WhatsApp.",
      },
    ],
    structuredSummary: "Inbound consultation for 6x indoor badminton courts (7,200 sq ft). Clarified BWF Point-Elastic PU advantages over acrylic. High intent for PolyTurf 7mm system.",
    actionItems: [
      "Emailed BWF Compliance Whitepaper & Lab Test Curves",
      "Created Commercial Lead LEAD-2026-448 for South Territory Team",
    ],
    createdAt: "Yesterday, 04:30 PM",
  },
];

export interface WhatsAppMessage {
  id: string;
  sender: "business" | "customer" | "ai_bot";
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  mediaUrl?: string;
  mediaType?: "pdf" | "image" | "location";
  quickReplies?: string[];
}

export interface WhatsAppThread {
  id: string;
  contactName: string;
  phone: string;
  organization: string;
  avatarText: string;
  tier?: string;
  category: "Lead" | "Platinum Dealer" | "Contractor" | "Carrier Driver";
  unreadCount: number;
  lastMessageTime: string;
  lastMessageText: string;
  isAiBotActive: boolean;
  messages: WhatsAppMessage[];
}

export const mockWhatsAppThreads: WhatsAppThread[] = [
  {
    id: "wa-thread-01",
    contactName: "Rohan Singhal",
    phone: "+91 98110 44821",
    organization: "DLF CyberCity Club",
    avatarText: "RS",
    category: "Lead",
    unreadCount: 1,
    lastMessageTime: "10:48 AM",
    lastMessageText: "Thanks for the estimate! Will review the 8-layer swatch options with the committee.",
    isAiBotActive: true,
    messages: [
      {
        id: "wam-1",
        sender: "business",
        text: "Hello Rohan! Welcome to PFS Sport. Here is the official technical dossier & color swatch kit for the PFS Pro Tour (8-Layer Acrylic) system you inquired about.",
        timestamp: "10:46 AM",
        status: "read",
        mediaType: "pdf",
        mediaUrl: "PFS-Pro-Tour-8Layer-TDS-2026.pdf",
      },
      {
        id: "wam-2",
        sender: "business",
        text: "Estimated Turnkey Commercial Budget: ₹12,40,000 + 18% GST for 4 Courts (7,200 sq ft). Includes base repair, 2 coats acrylic resurfacer, 3 cushion coats, 2 top color coats, and tournament line marking.",
        timestamp: "10:46 AM",
        status: "read",
        quickReplies: ["Book Laser Inspection", "Request Physical Swatches", "Call Sales Rep"],
      },
      {
        id: "wam-3",
        sender: "customer",
        text: "Thanks for the estimate! Will review the 8-layer swatch options with the committee.",
        timestamp: "10:48 AM",
        status: "delivered",
      },
    ],
  },
  {
    id: "wa-thread-02",
    contactName: "Kunal Shah",
    phone: "+91 98200 99182",
    organization: "Apex Sports Infrastructure Pvt Ltd",
    avatarText: "KS",
    tier: "Platinum",
    category: "Platinum Dealer",
    unreadCount: 0,
    lastMessageTime: "09:20 AM",
    lastMessageText: "E-Way Bill received. Site unloading crane is booked for tomorrow 2 PM.",
    isAiBotActive: true,
    messages: [
      {
        id: "wam-201",
        sender: "ai_bot",
        text: "Consignment Dispatched! Order #PFS-ORD-2026-089 has left Bhiwandi Hub via Safexpress (AWB: SFX-89920144). Vehicle: MH-04-EB-8891.",
        timestamp: "09:16 AM",
        status: "read",
        mediaType: "pdf",
        mediaUrl: "EWB-2026-88192014.pdf",
      },
      {
        id: "wam-202",
        sender: "ai_bot",
        text: "Live GPS tracking link: https://pfs-sport.com/dealer/shipments/SHP-2026-044",
        timestamp: "09:16 AM",
        status: "read",
      },
      {
        id: "wam-203",
        sender: "customer",
        text: "E-Way Bill received. Site unloading crane is booked for tomorrow 2 PM.",
        timestamp: "09:20 AM",
        status: "read",
      },
    ],
  },
  {
    id: "wa-thread-03",
    contactName: "Mahesh Yadav (Driver)",
    phone: "+91 98191 22345",
    organization: "Safexpress Logistics Ltd",
    avatarText: "MY",
    category: "Carrier Driver",
    unreadCount: 0,
    lastMessageTime: "Yesterday",
    lastMessageText: "Toll plaza Kamshet crossed. Weather clear, ETA on track.",
    isAiBotActive: false,
    messages: [
      {
        id: "wam-301",
        sender: "business",
        text: "Mahesh, please confirm toll checkpoint scan and vehicle speed telemetry.",
        timestamp: "Yesterday, 11:30 AM",
        status: "read",
      },
      {
        id: "wam-302",
        sender: "customer",
        text: "Toll plaza Kamshet crossed. Weather clear, ETA on track.",
        timestamp: "Yesterday, 11:45 AM",
        status: "read",
      },
    ],
  },
];

export interface EmailRecord {
  id: string;
  messageId: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  templateCategory: "Order Confirmation" | "Dispatch Challan" | "Lead Follow-up" | "Statement" | "Technical Dossier";
  status: "delivered" | "opened" | "clicked" | "bounced" | "queued";
  sentAt: string;
  openedAt?: string;
  clickedAt?: string;
  provider: "ZeptoMail Enterprise";
  htmlPreview: string;
  attachmentsCount: number;
}

export const mockEmails: EmailRecord[] = [
  {
    id: "eml-001",
    messageId: "zpt-2026-99182301",
    recipientEmail: "kunal@apexsports.in",
    recipientName: "Kunal Shah",
    subject: "Tax Invoice & Consignment Gate Pass — Order PFS-ORD-2026-089",
    templateCategory: "Dispatch Challan",
    status: "opened",
    sentAt: "Today, 09:16 AM",
    openedAt: "Today, 09:24 AM",
    clickedAt: "Today, 09:25 AM",
    provider: "ZeptoMail Enterprise",
    attachmentsCount: 3,
    htmlPreview: "Your consignment for 18 Units (420 KG) of PFS Pro Tour 8-Layer Acrylic material has been dispatched from our Bhiwandi Super Hub with GST E-Way Bill EWB-2026-88192014.",
  },
  {
    id: "eml-002",
    messageId: "zpt-2026-99182280",
    recipientEmail: "rohan.singhal@dlf.in",
    recipientName: "Rohan Singhal",
    subject: "PFS Sport — Technical Proposal & ITF Class 3 Specifications for DLF CyberCity",
    templateCategory: "Technical Dossier",
    status: "opened",
    sentAt: "Today, 10:46 AM",
    openedAt: "Today, 10:49 AM",
    provider: "ZeptoMail Enterprise",
    attachmentsCount: 2,
    htmlPreview: "Thank you for speaking with our AI Technical Desk. Attached please find the complete 8-Layer specification, ITF Class 3 pace certification, and formal turnkey estimate for 4 courts.",
  },
  {
    id: "eml-003",
    messageId: "zpt-2026-99181904",
    recipientEmail: "finance@olympicsportssurfaces.in",
    recipientName: "Sunita Verma",
    subject: "Monthly Commercial Credit Facility Statement — August 2026",
    templateCategory: "Statement",
    status: "delivered",
    sentAt: "Yesterday, 06:00 PM",
    provider: "ZeptoMail Enterprise",
    attachmentsCount: 1,
    htmlPreview: "Please find attached your verified monthly account ledger and credit facility headroom statement showing ₹18,50,000 available limit.",
  },
];

export interface CommunicationTriggerRule {
  id: string;
  name: string;
  eventTrigger: "lead_created" | "order_dispatched" | "invoice_overdue" | "kyc_approved" | "swatch_requested";
  channels: ("ai_voice" | "whatsapp" | "email")[];
  delayDescription: string;
  status: "active" | "paused";
  executionsCount: number;
  lastFired: string;
  description: string;
}

export const mockCommunicationTriggers: CommunicationTriggerRule[] = [
  {
    id: "ctr-01",
    name: "Instant Inbound Lead Qualification & Swatch Dispatch",
    eventTrigger: "lead_created",
    channels: ["whatsapp", "ai_voice", "email"],
    delayDescription: "Instant WhatsApp + AI Call in 5 Mins",
    status: "active",
    executionsCount: 184,
    lastFired: "10 mins ago",
    description: "Sends instant WhatsApp catalog PDF, schedules AI Voice qualification call within 5 mins, and logs structured CRM summary.",
  },
  {
    id: "ctr-02",
    name: "Consignment Dispatch E-Way Bill & Live Tracking Alert",
    eventTrigger: "order_dispatched",
    channels: ["whatsapp", "email"],
    delayDescription: "Immediate upon gate-out",
    status: "active",
    executionsCount: 312,
    lastFired: "45 mins ago",
    description: "Sends GST E-Way Bill PDF & live GPS tracking link to dealer WhatsApp and official tax invoice email via ZeptoMail.",
  },
  {
    id: "ctr-03",
    name: "Payment Due & Credit Headroom Reminder",
    eventTrigger: "invoice_overdue",
    channels: ["ai_voice", "whatsapp", "email"],
    delayDescription: "3 Days before SLA due",
    status: "active",
    executionsCount: 68,
    lastFired: "Yesterday",
    description: "Automated polite AI voice check-in and WhatsApp ledger breakdown to maintain 100% on-time dealer settlements.",
  },
  {
    id: "ctr-04",
    name: "Dealer KYC Approval Welcome Dossier",
    eventTrigger: "kyc_approved",
    channels: ["whatsapp", "email"],
    delayDescription: "Instant upon admin sign-off",
    status: "active",
    executionsCount: 42,
    lastFired: "2 days ago",
    description: "Dispatches welcome kit, rate card credentials, and assigned territory manager contact details.",
  },
];

