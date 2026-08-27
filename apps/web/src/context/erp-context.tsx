"use client";

import * as React from "react";
import {
  DealerUser,
  mockUsers,
  ProductItem,
  mockProducts,
  OrderRecord,
  mockOrders,
  ShipmentRecord,
  mockShipments,
  CRMLead,
  mockLeads,
  AutomationRule,
  mockAutomationRules,
  DocumentItem,
  mockDocuments,
  AuditEvent,
  mockAuditEvents,
  AICallRecord,
  mockAICalls,
  WhatsAppThread,
  mockWhatsAppThreads,
  WhatsAppMessage,
  EmailRecord,
  mockEmails,
  CommunicationTriggerRule,
  mockCommunicationTriggers,
} from "@/lib/mock-data";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "order" | "shipment" | "inventory" | "lead" | "document" | "system";
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface SavedEstimate {
  id: string;
  title: string;
  sport: string;
  courtCount: number;
  areaSqFt: number;
  systemTier: string;
  baseCondition: string;
  accessories: string[];
  locationZone: string;
  estimatedLow: number;
  estimatedHigh: number;
  gstAmount: number;
  grandTotalLow: number;
  grandTotalHigh: number;
  createdAt: string;
  rateCardVersion: string;
  dealerTierUsed: string;
}

export interface SavedCourtDesign {
  id: string;
  name: string;
  sport: string;
  zones: Record<string, string>;
  createdAt: string;
}

export interface AIPayload {
  leadName?: string;
  projectName?: string;
  org?: string;
  courtCount?: number;
  sport?: string;
  city?: string;
  senderName?: string;
  estimatedLow?: number;
  estimatedHigh?: number;
  areaSqFt?: number;
  grandTotalLow?: number;
  grandTotalHigh?: number;
  systemTier?: string;
  accessories?: string[];
  [key: string]: unknown;
}

export interface DispatchConsignmentPayload {
  orderId?: string;
  orderNumber: string;
  dealerName: string;
  carrierName: string;
  trackingAwb: string;
  originWarehouse: string;
  destinationCity: string;
  estimatedDeliveryDate: string;
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  eWayBillNumber?: string;
  packageCount?: number;
  totalWeightKg?: number;
  packageBreakdown?: string;
  qcInspectionPassed?: boolean;
  notes?: string;
}

interface ERPContextType {
  currentUser: DealerUser;
  setCurrentUserRole: (roleKey: string) => void;
  isAdmin: boolean;
  isDealer: boolean;
  products: ProductItem[];
  orders: OrderRecord[];
  shipments: ShipmentRecord[];
  leads: CRMLead[];
  automationRules: AutomationRule[];
  documents: DocumentItem[];
  auditEvents: AuditEvent[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  cart: CartItem[];
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  createOrderFromCart: (paymentTerms: OrderRecord["paymentTerms"], destinationCity: string, projectRef: string) => OrderRecord;
  updateOrderStatus: (orderId: string, newStatus: OrderRecord["status"]) => void;
  dispatchOrderConsignment: (payload: DispatchConsignmentPayload) => ShipmentRecord;
  toggleAutomationRule: (ruleId: string) => void;
  updateLeadStage: (leadId: string, stage: CRMLead["stage"]) => void;
  addLeadNote: (leadId: string, text: string) => void;
  createLead: (lead: Omit<CRMLead, "id" | "score" | "createdAt" | "lastFollowUp" | "notes">) => CRMLead;
  savedEstimates: SavedEstimate[];
  saveEstimate: (estimate: Omit<SavedEstimate, "id" | "createdAt">) => SavedEstimate;
  savedDesigns: SavedCourtDesign[];
  saveCourtDesign: (name: string, sport: string, zones: Record<string, string>) => SavedCourtDesign;
  activeSearchQuery: string;
  setActiveSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  activeAIModal: {
    isOpen: boolean;
    type: "lead_summary" | "estimate_explain" | "email_draft" | "search_assist" | null;
    title: string;
    payload?: AIPayload;
  };
  openAIModal: (type: "lead_summary" | "estimate_explain" | "email_draft" | "search_assist", title: string, payload?: AIPayload) => void;
  closeAIModal: () => void;
  aiCalls: AICallRecord[];
  triggerAICall: (recipientName: string, recipientPhone: string, campaignType: AICallRecord["campaignType"], recipientOrg?: string) => AICallRecord;
  whatsappThreads: WhatsAppThread[];
  sendWhatsAppMessage: (threadId: string, text: string, mediaType?: "pdf" | "image", mediaUrl?: string) => void;
  toggleThreadAiBot: (threadId: string) => void;
  emails: EmailRecord[];
  sendEmail: (recipientEmail: string, recipientName: string, subject: string, templateCategory: EmailRecord["templateCategory"], htmlPreview: string) => EmailRecord;
  communicationTriggers: CommunicationTriggerRule[];
  toggleCommunicationTrigger: (id: string) => void;
}

const ERPContext = React.createContext<ERPContextType | undefined>(undefined);

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Order Dispatched",
    message: "Order PFS-ORD-2026-089 is on vehicle MH-04-EB-8891 heading to Pune Site.",
    type: "shipment",
    timestamp: "10 mins ago",
    read: false,
    link: "/dealer/shipments/SHP-2026-044",
  },
  {
    id: "notif-2",
    title: "SLA Alert: Hot Lead Pending Contact",
    message: "Rohan Singhal (DLF CyberCity Club, 4 courts) requires contact within 2 hours.",
    type: "lead",
    timestamp: "1 hour ago",
    read: false,
    link: "/admin/leads",
  },
  {
    id: "notif-3",
    title: "New Technical Specification Published",
    message: "PFS Pro Tour 8-Layer TDS v3.2 is now live in Document Vault.",
    type: "document",
    timestamp: "Yesterday",
    read: true,
    link: "/dealer/documents",
  },
];

export function ERPProvider({ children }: { children: React.ReactNode }) {
  const [currentUserKey, setCurrentUserKey] = React.useState<string>("dealer_platinum");
  const currentUser = mockUsers[currentUserKey] || mockUsers.dealer_platinum;

  const [products] = React.useState<ProductItem[]>(mockProducts);
  const [orders, setOrders] = React.useState<OrderRecord[]>(mockOrders);
  const [shipments, setShipments] = React.useState<ShipmentRecord[]>(mockShipments);
  const [leads, setLeads] = React.useState<CRMLead[]>(mockLeads);
  const [automationRules, setAutomationRules] = React.useState<AutomationRule[]>(mockAutomationRules);
  const [documents] = React.useState<DocumentItem[]>(mockDocuments);
  const [auditEvents, setAuditEvents] = React.useState<AuditEvent[]>(mockAuditEvents);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(initialNotifications);
  const [aiCalls, setAiCalls] = React.useState<AICallRecord[]>(mockAICalls);
  const [whatsappThreads, setWhatsappThreads] = React.useState<WhatsAppThread[]>(mockWhatsAppThreads);
  const [emails, setEmails] = React.useState<EmailRecord[]>(mockEmails);
  const [communicationTriggers, setCommunicationTriggers] = React.useState<CommunicationTriggerRule[]>(mockCommunicationTriggers);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [activeSearchQuery, setActiveSearchQuery] = React.useState("");

  const [savedEstimates, setSavedEstimates] = React.useState<SavedEstimate[]>([
    {
      id: "est-101",
      title: "Pune Tennis Club 2x Pro Tour",
      sport: "pickleball",
      courtCount: 2,
      areaSqFt: 3600,
      systemTier: "PFS Pro Tour (8-Layer)",
      baseCondition: "Existing Sound Concrete",
      accessories: ["Tournament Net Posts", "LED Floodlight Fixtures"],
      locationZone: "West Zone (Maharashtra/Goa)",
      estimatedLow: 520000,
      estimatedHigh: 610000,
      gstAmount: 101700,
      grandTotalLow: 613600,
      grandTotalHigh: 719800,
      createdAt: "2026-08-21",
      rateCardVersion: "v1.4",
      dealerTierUsed: "Platinum",
    },
  ]);

  const [savedDesigns, setSavedDesigns] = React.useState<SavedCourtDesign[]>([
    {
      id: "des-101",
      name: "Apex Club Signature Pickleball",
      sport: "pickleball",
      zones: {
        playingArea: "#1976D2",
        kitchen: "#006442",
        perimeter: "#0A2A57",
        lines: "#FFFFFF",
      },
      createdAt: "2026-08-20",
    },
  ]);

  const [activeAIModal, setActiveAIModal] = React.useState<{
    isOpen: boolean;
    type: "lead_summary" | "estimate_explain" | "email_draft" | "search_assist" | null;
    title: string;
    payload?: AIPayload;
  }>({
    isOpen: false,
    type: null,
    title: "",
  });

  const isAdmin = ["super_admin", "sales_manager", "inventory_exec", "sales_exec"].includes(currentUser.role);
  const isDealer = ["dealer_owner", "dealer_staff"].includes(currentUser.role);

  const setCurrentUserRole = (roleKey: string) => {
    if (mockUsers[roleKey]) {
      setCurrentUserKey(roleKey);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const addToCart = (product: ProductItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Determine pricing based on active dealer tier
  const getProductPriceForCurrentDealer = (product: ProductItem) => {
    if (currentUser.dealerTier === "Platinum") return product.platinumPrice;
    if (currentUser.dealerTier === "Gold") return product.goldPrice;
    if (currentUser.dealerTier === "Silver") return product.silverPrice;
    return product.mrpInr;
  };

  const cartSubtotal = cart.reduce((sum, item) => {
    const unitPrice = getProductPriceForCurrentDealer(item.product);
    return sum + unitPrice * item.quantity;
  }, 0);

  const createOrderFromCart = (
    paymentTerms: OrderRecord["paymentTerms"],
    destinationCity: string,
    projectRef: string
  ): OrderRecord => {
    const orderNum = `PFS-ORD-2026-${Math.floor(100 + Math.random() * 900)}`;
    const lineItems = cart.map((item) => {
      const unitPrice = getProductPriceForCurrentDealer(item.product);
      return {
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        quantity: item.quantity,
        unit: item.product.category === "Surface Systems" || item.product.category === "Modular Tiles" || item.product.category === "PU Flooring" || item.product.category === "Turf" ? "sq ft" : "unit",
        unitPrice,
        totalPrice: unitPrice * item.quantity,
      };
    });

    const subtotal = lineItems.reduce((s, i) => s + i.totalPrice, 0);
    const gstAmount = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + gstAmount;

    const newOrder: OrderRecord = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      dealerId: currentUser.dealerId || "DLR-MUM-01",
      dealerName: currentUser.dealerName || "Apex Sports Infrastructure Pvt Ltd",
      dealerTier: currentUser.dealerTier || "Platinum",
      status: "submitted",
      createdAt: new Date().toISOString(),
      items: lineItems,
      subtotal,
      discountAmount: 0,
      gstAmount,
      totalAmount,
      paymentTerms,
      paymentStatus: "Unpaid",
      paidAmount: 0,
      destinationCity: destinationCity || "Site Location",
      projectReference: projectRef || "Custom Court Project",
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: "Order Request Submitted",
        message: `Order #${orderNum} submitted for review (₹${totalAmount.toLocaleString("en-IN")}).`,
        type: "order",
        timestamp: "Just now",
        read: false,
        link: `/dealer/orders`,
      },
      ...prev,
    ]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderRecord["status"]) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const dispatchOrderConsignment = (payload: DispatchConsignmentPayload): ShipmentRecord => {
    const shipmentId = `SHP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const shipmentNumber = `PFS-SHP-${Math.floor(80000 + Math.random() * 19999)}`;
    const todayStr = new Date().toISOString().split("T")[0];

    const newShipment: ShipmentRecord = {
      id: shipmentId,
      shipmentNumber,
      orderNumber: payload.orderNumber,
      dealerName: payload.dealerName,
      carrierName: payload.carrierName,
      trackingAwb: payload.trackingAwb,
      dispatchDate: todayStr,
      estimatedDeliveryDate: payload.estimatedDeliveryDate,
      originWarehouse: payload.originWarehouse,
      destinationCity: payload.destinationCity,
      status: "dispatched",
      vehicleNumber: payload.vehicleNumber,
      driverName: payload.driverName,
      driverPhone: payload.driverPhone,
      eWayBillNumber: payload.eWayBillNumber,
      packageCount: payload.packageCount || 18,
      totalWeightKg: payload.totalWeightKg || 420,
      packageBreakdown: payload.packageBreakdown,
      qcInspectionPassed: payload.qcInspectionPassed ?? true,
      timeline: [
        {
          title: "Order Picked, Palletized & QC Passed",
          location: payload.originWarehouse,
          timestamp: "Today, Just now",
          completed: true,
          description: `Consignment inspection completed. ${payload.packageBreakdown || "Sealed drums & accessories secured on pallets."}`,
        },
        {
          title: "Consignment Dispatched from Hub",
          location: payload.originWarehouse,
          timestamp: "Today, Just now",
          completed: true,
          current: true,
          description: `Handed over to ${payload.carrierName}. Vehicle No: ${payload.vehicleNumber || "Assigned Linehaul"}. Docket AWB: ${payload.trackingAwb}.`,
        },
        {
          title: `In Transit to ${payload.destinationCity} Corridor Hub`,
          location: `${payload.destinationCity} Highway Corridor`,
          timestamp: `${payload.estimatedDeliveryDate} (Estimated)`,
          completed: false,
          description: "Carrier linehaul truck en route with automated GPS telemetry.",
        },
        {
          title: "Out for Final Site Delivery",
          location: `${payload.destinationCity} Local Delivery Hub`,
          timestamp: `${payload.estimatedDeliveryDate} (Scheduled)`,
          completed: false,
          description: "Local dispatch vehicle scheduled with site offloading crew.",
        },
        {
          title: "Delivered & Proof of Delivery (POD) Signed",
          location: `${payload.destinationCity} Project Site`,
          timestamp: `${payload.estimatedDeliveryDate} (Target)`,
          completed: false,
          description: "Consignee delivery challan verification and digital sign-off.",
        },
      ],
    };

    // Update shipments list
    setShipments((prev) => [newShipment, ...prev]);

    // Update corresponding order status to "dispatched" and link shipmentId
    setOrders((prev) =>
      prev.map((ord) =>
        ord.orderNumber === payload.orderNumber || ord.id === payload.orderId
          ? { ...ord, status: "dispatched", shipmentId }
          : ord
      )
    );

    // Trigger in-app notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: "Order Consignment Dispatched",
        message: `Order #${payload.orderNumber} dispatched via ${payload.carrierName} (AWB: ${payload.trackingAwb}) to ${payload.destinationCity}. ETA: ${payload.estimatedDeliveryDate}.`,
        type: "shipment",
        timestamp: "Just now",
        read: false,
        link: `/dealer/shipments/${shipmentId}`,
      },
      ...prev,
    ]);

    // Append audit event
    setAuditEvents((prev) => [
      {
        id: `aud-${Date.now()}`,
        actorName: currentUser.name,
        actorEmail: currentUser.email,
        role: currentUser.roleLabel,
        module: "Orders",
        action: "DISPATCH_CONSIGNMENT_CREATED",
        targetEntity: "Order Consignment",
        entityId: payload.orderNumber,
        ipAddress: "103.21.124.8",
        timestamp: new Date().toISOString(),
        details: `Dispatched from ${payload.originWarehouse} via ${payload.carrierName} [AWB: ${payload.trackingAwb}, EWB: ${payload.eWayBillNumber || "Auto-Linked"}, ETA: ${payload.estimatedDeliveryDate}]. ZeptoMail webhook triggered.`,
      },
      ...prev,
    ]);

    return newShipment;
  };

  const toggleAutomationRule = (ruleId: string) => {
    setAutomationRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId
          ? {
              ...rule,
              status: rule.status === "active" ? "paused" : "active",
            }
          : rule
      )
    );
  };

  const updateLeadStage = (leadId: string, stage: CRMLead["stage"]) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, stage } : lead))
    );
  };

  const addLeadNote = (leadId: string, text: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const newNote = {
            id: `note-${Date.now()}`,
            author: currentUser.name,
            timestamp: "Just now",
            text,
          };
          return {
            ...lead,
            notes: [newNote, ...lead.notes],
            lastFollowUp: new Date().toISOString(),
          };
        }
        return lead;
      })
    );
  };

  const createLead = (
    leadData: Omit<CRMLead, "id" | "score" | "createdAt" | "lastFollowUp" | "notes">
  ): CRMLead => {
    const newLead: CRMLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      leadNumber: `LEAD-2026-${Math.floor(100 + Math.random() * 900)}`,
      score: 88,
      scoreBand: "Hot",
      stage: leadData.stage || "New",
      assignedTo: leadData.assignedTo || "Siddharth Verma (Regional Lead)",
      nextFollowUpDue: "Today",
      slaBreach: false,
      createdAt: "Just now",
      lastFollowUp: "Just now",
      notes: [
        {
          id: `note-${Date.now()}`,
          author: "PFS Public Inbound Engine",
          timestamp: "Just now",
          text: `Inbound inquiry captured for ${leadData.sportInterest || "Pickleball"} court project in ${leadData.city}.`,
        },
      ],
    };

    setLeads((prev) => [newLead, ...prev]);

    // Dispatch real-time ERP notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "New Inbound CRM Lead Captured",
      message: `${newLead.fullName} (${newLead.organization || newLead.city}) requested ${newLead.sportInterest} estimate.`,
      type: "lead",
      timestamp: "Just now",
      read: false,
      link: "/admin/leads",
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newLead;
  };

  const saveEstimate = (estimate: Omit<SavedEstimate, "id" | "createdAt">): SavedEstimate => {
    const created: SavedEstimate = {
      ...estimate,
      id: `est-${Date.now()}`,
      createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    };
    setSavedEstimates((prev) => [created, ...prev]);
    return created;
  };

  const saveCourtDesign = (name: string, sport: string, zones: Record<string, string>): SavedCourtDesign => {
    const created: SavedCourtDesign = {
      id: `des-${Date.now()}`,
      name: name || "My Custom Court Combination",
      sport,
      zones,
      createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    };
    setSavedDesigns((prev) => [created, ...prev]);
    return created;
  };

  const openAIModal = (
    type: "lead_summary" | "estimate_explain" | "email_draft" | "search_assist",
    title: string,
    payload?: AIPayload
  ) => {
    setActiveAIModal({
      isOpen: true,
      type,
      title,
      payload,
    });
  };

  const closeAIModal = () => {
    setActiveAIModal({
      isOpen: false,
      type: null,
      title: "",
    });
  };

  const triggerAICall = (
    recipientName: string,
    recipientPhone: string,
    campaignType: AICallRecord["campaignType"],
    recipientOrg: string = "Direct Customer"
  ): AICallRecord => {
    const newCall: AICallRecord = {
      id: `call-${Date.now()}`,
      callSid: `CA-AI-2026-${Math.floor(10000 + Math.random() * 89999)}`,
      recipientName,
      recipientPhone,
      recipientOrg,
      roleType: "Lead",
      campaignType,
      direction: "outbound",
      status: "completed",
      durationSeconds: Math.floor(65 + Math.random() * 95),
      sentimentScore: Math.floor(88 + Math.random() * 11),
      sentimentBand: "Positive",
      intentIdentified: `AI ${campaignType} consultation completed with high commercial propensity.`,
      transcript: [
        {
          speaker: "AI Agent",
          timestamp: "00:02",
          text: `Hello ${recipientName}! This is Antigravity AI Voice Assistant from PFS Sport Infrastructure. Following up regarding your inquiry.`,
        },
        {
          speaker: "Customer",
          timestamp: "00:14",
          text: "Hi, thank you for calling. We are reviewing the turnkey court specifications and acrylic system estimates.",
        },
        {
          speaker: "AI Agent",
          timestamp: "00:28",
          text: "Excellent! I have forwarded the official ITF Class 3 TDS technical sheets and 18% GST input credit breakdown directly to your WhatsApp.",
        },
      ],
      structuredSummary: `AI Voice agent connected with ${recipientName} (${recipientOrg}). Qualified court scope and auto-dispatched product TDS & estimate on WhatsApp.`,
      actionItems: [
        "Dispatched digital TDS brochure & swatch guide via WhatsApp API",
        "Updated CRM Lead timeline with verified AI voice sentiment score",
      ],
      createdAt: "Just now",
    };

    setAiCalls((prev) => [newCall, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "AI Voice Call Completed",
      message: `AI Agent qualified ${recipientName} (${campaignType}) — Sentiment: ${newCall.sentimentScore}% Positive.`,
      type: "lead",
      timestamp: "Just now",
      read: false,
      link: "/admin/communications",
    };
    setNotifications((prev) => [notif, ...prev]);

    return newCall;
  };

  const sendWhatsAppMessage = (
    threadId: string,
    text: string,
    mediaType?: "pdf" | "image",
    mediaUrl?: string
  ) => {
    const newMessage: WhatsAppMessage = {
      id: `wam-${Date.now()}`,
      sender: "business",
      text,
      timestamp: "Just now",
      status: "delivered",
      ...(mediaType ? { mediaType, mediaUrl } : {}),
    };

    setWhatsappThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            lastMessageTime: "Just now",
            lastMessageText: text,
            messages: [...thread.messages, newMessage],
          };
        }
        return thread;
      })
    );

    // Simulate customer auto-acknowledgement after 2 seconds
    setTimeout(() => {
      const replyMsg: WhatsAppMessage = {
        id: `wam-reply-${Date.now()}`,
        sender: "customer",
        text: "Thank you for the update! Acknowledged and reviewed.",
        timestamp: "Just now",
        status: "read",
      };
      setWhatsappThreads((prev) =>
        prev.map((thread) => {
          if (thread.id === threadId) {
            return {
              ...thread,
              lastMessageTime: "Just now",
              lastMessageText: replyMsg.text,
              messages: [...thread.messages, replyMsg],
            };
          }
          return thread;
        })
      );
    }, 2000);
  };

  const toggleThreadAiBot = (threadId: string) => {
    setWhatsappThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? { ...thread, isAiBotActive: !thread.isAiBotActive }
          : thread
      )
    );
  };

  const sendEmail = (
    recipientEmail: string,
    recipientName: string,
    subject: string,
    templateCategory: EmailRecord["templateCategory"],
    htmlPreview: string
  ): EmailRecord => {
    const newEmail: EmailRecord = {
      id: `eml-${Date.now()}`,
      messageId: `zpt-2026-${Math.floor(10000000 + Math.random() * 89999999)}`,
      recipientEmail,
      recipientName,
      subject,
      templateCategory,
      status: "delivered",
      sentAt: "Just now",
      provider: "ZeptoMail Enterprise",
      attachmentsCount: 1,
      htmlPreview,
    };

    setEmails((prev) => [newEmail, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "ZeptoMail Outbox Sent",
      message: `Dispatched "${subject}" to ${recipientEmail} with cryptographic delivery seal.`,
      type: "document",
      timestamp: "Just now",
      read: false,
      link: "/admin/communications",
    };
    setNotifications((prev) => [notif, ...prev]);

    return newEmail;
  };

  const toggleCommunicationTrigger = (id: string) => {
    setCommunicationTriggers((prev) =>
      prev.map((trigger) =>
        trigger.id === id
          ? {
              ...trigger,
              status: trigger.status === "active" ? "paused" : "active",
            }
          : trigger
      )
    );
  };

  return (
    <ERPContext.Provider
      value={{
        currentUser,
        setCurrentUserRole,
        isAdmin,
        isDealer,
        products,
        orders,
        shipments,
        leads,
        automationRules,
        documents,
        auditEvents,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        createOrderFromCart,
        updateOrderStatus,
        dispatchOrderConsignment,
        toggleAutomationRule,
        updateLeadStage,
        addLeadNote,
        createLead,
        savedEstimates,
        saveEstimate,
        savedDesigns,
        saveCourtDesign,
        activeSearchQuery,
        setActiveSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        activeAIModal,
        openAIModal,
        closeAIModal,
        aiCalls,
        triggerAICall,
        whatsappThreads,
        sendWhatsAppMessage,
        toggleThreadAiBot,
        emails,
        sendEmail,
        communicationTriggers,
        toggleCommunicationTrigger,
      }}
    >
      {children}
    </ERPContext.Provider>
  );
}

export function useERP() {
  const context = React.useContext(ERPContext);
  if (!context) {
    throw new Error("useERP must be used within an ERPProvider");
  }
  return context;
}
