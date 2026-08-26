# PFS Sport ERP MVP

## Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 26 August 2026  
**Product type:** Responsive B2B ERP, dealer portal, CRM-lite, catalogue and automation platform  
**Primary market:** India  
**Future market readiness:** United States  
**Delivery approach:** AI-agent-assisted development using Claude, Codex, OpenCode models, Agy and similar engineering agents

---

## 1. Executive Summary

PFS Sport requires a modern ERP MVP that connects its dealer network, sales team and administrators in one responsive platform. The first release will prioritize a polished user experience, fast day-to-day workflows and reliable basic functionality instead of attempting every long-term integration and AI capability at once.

The MVP will provide:

- A responsive dealer portal for catalogue browsing, live stock visibility, order requests, shipment tracking, documents, account information and basic AI tools.
- An admin ERP console for products, inventory, dealers, leads, orders, shipments, documents, pricing, notifications and reports.
- A CRM-lite lead pipeline supporting manual leads, web leads and future Meta/WhatsApp integrations.
- A configurable automation engine for alerts, follow-ups, approvals, reminders and email communication.
- Kimi K2.6 or a later compatible model for assisted product discovery, lead summaries, estimate explanations and admin productivity.
- A modular architecture that can later support payments, WhatsApp/Voice AI, native mobile apps, advanced forecasting and US operations.

The product will be built as a responsive Next.js web application/PWA. Native iOS and Android applications are not included in this MVP because no native mobile framework is included in the approved stack.

---

## 2. Source Documents Reviewed

This PRD consolidates requirements from:

1. **PFS Sport Developer Feature Specification** - detailed roles, functional modules, AI tools, integrations, non-functional requirements and roadmap.
2. **PFS Sport Growth & GTM Strategy** - revenue goals, 80/20 dealer/direct model, lead funnel, dealer tiers, campaign requirements and US roadmap.
3. **PFS Sport Pitch Deck** - business positioning, product categories, success metrics and phased delivery narrative.
4. **PFS Sport MVP Demo** - intended navigation, dashboard hierarchy, brand palette, catalogue, stock/order, shipment, estimator, visualiser, document and admin interactions.

### Requirement precedence

Where the sources differ, this PRD uses the following order:

1. The current user-approved MVP scope and technology stack.
2. Developer Feature Specification for functional intent.
3. MVP demo for UI/UX direction.
4. GTM strategy and pitch deck for commercial context and later-phase requirements.

---

## 3. Product Vision

Create one simple, fast and trustworthy operating system for PFS Sport that allows administrators to control products, stock, dealers, leads and orders while giving dealers a professional self-service experience.

### 3.1 Business objectives

- Enable the dealer-led operating model expected to generate approximately 80% of business volume.
- Reduce repetitive calls, spreadsheets and manual status updates.
- Give dealers self-service access to accurate product, stock, order, shipment and document information.
- Create a single source of truth for leads, accounts, product data, inventory and commercial activity.
- Respond to and organize enquiries faster through automation and AI assistance.
- Establish a technical foundation that can scale from the India MVP to a multi-country platform.

### 3.2 MVP success definition

The MVP is successful when PFS staff can manage the essential dealer-to-order workflow without spreadsheets and a pilot dealer can independently:

1. Sign in.
2. Browse and filter products.
3. Check available stock.
4. Create an order request.
5. View its status and shipment timeline.
6. Download technical documents.
7. Create an indicative court estimate.
8. Save a colour combination.
9. Receive relevant email and in-app notifications.

---

## 4. MVP Principles

1. **UI-first, but production-capable:** build polished flows backed by real APIs and persisted data; avoid dead buttons and mock-only screens.
2. **Responsive by default:** desktop-first for ERP density, with excellent tablet and mobile-browser behavior.
3. **Progressive complexity:** simple forms first; advanced controls appear only when needed.
4. **Automation with control:** every automation is visible, configurable, logged and reversible where practical.
5. **Human approval for commercial risk:** AI may recommend or draft, but cannot finalize binding prices, credit decisions or contracts.
6. **Modular monolith:** one FastAPI application with clear domain modules for rapid development, without premature microservices.
7. **Provider abstraction:** email, AI, storage, payments and logistics use adapter interfaces so providers can be changed later.
8. **Auditability:** important data changes and automated actions must be traceable.

---

## 5. Users and Roles

### 5.1 MVP roles

| Role | Primary interface | MVP permissions |
|---|---|---|
| Super Admin | Admin ERP | Full configuration, users, permissions, products, inventory, dealers, leads, orders, documents, automation and reports |
| Inventory/Admin Executive | Admin ERP | Products, stock, batches, order fulfilment, shipments and documents |
| Sales Manager | Admin ERP/PWA | Leads, dealer accounts, assignments, follow-ups, estimates, quotes and dashboards |
| Sales Executive | Admin ERP/PWA | Assigned leads, notes, activities, estimates and dealer onboarding |
| Dealer Owner | Dealer Portal/PWA | Account, staff, catalogue, permitted pricing, stock, order requests, shipments, documents, estimates and notifications |
| Dealer Staff | Dealer Portal/PWA | Restricted dealer functions configured by the dealer owner or admin |

### 5.2 Future roles

- Installer/contractor
- Finance/accounting user
- Customer/end lead with a limited public experience
- US distributor user
- External warehouse/logistics operator

### 5.3 Access model

- Role-based access control at module and action level.
- Dealer users may access only their own account data and permitted territory/pricing.
- Sales users may access assigned regions, leads or accounts.
- Sensitive changes require explicit permissions: price override, stock adjustment, credit change, user administration and automation publishing.

---

## 6. Scope

### 6.1 Included in the MVP

- Authentication, session management and role-based access.
- Dealer and dealer-user management.
- Product catalogue and lightweight CMS.
- Inventory visibility and stock administration.
- Order request and order management.
- Basic quotations, pro forma invoices and tax-invoice records/PDFs.
- Manual payment status and document recording.
- Shipment status and timeline management.
- CRM-lite lead management.
- Court Cost Estimator with configurable rate cards.
- Court Colour Visualiser using official PFS colour codes.
- Document Vault and basic co-branding request workflow.
- Dashboard and operational reports.
- In-app and ZeptoMail email notifications.
- Rules-based workflow automation.
- Kimi-powered summaries, explanations and drafting assistance.
- Audit log and activity history.
- CSV import/export for key masters and transactions.

### 6.2 Deferred from the MVP

- Native iOS/Android apps.
- Fully autonomous WhatsApp and Voice AI.
- Direct Meta Lead Ads and Conversions API integration.
- Live payment gateway checkout and automated reconciliation.
- Live logistics/carrier tracking APIs and map tracking.
- ERP/accounting integrations such as Tally, Zoho Books, Odoo or SAP.
- GST e-invoice IRN production integration.
- Advanced statistical demand forecasting.
- 3D colour rendering; MVP uses responsive SVG court diagrams.
- Full PDF artwork composition engine for every document type.
- Warranty/AMC, academy, referral, co-op fund and public dealer locator.
- Multi-entity, multi-currency, US tax and US payment workflows.

### 6.3 MVP integration strategy

External processes will initially use controlled manual or semi-automated workflows:

- Orders are created in the ERP, while payment may be recorded manually.
- Shipment status and tracking numbers are updated by authorized staff.
- Leads may be entered manually, imported by CSV or submitted through a platform form.
- WhatsApp interaction uses prefilled `wa.me` links until official integration is approved.
- Co-branded document generation begins with a small set of supported templates.

---

## 7. Information Architecture and Navigation

### 7.1 Dealer Portal navigation

- Dashboard
- Product Catalogue
- Stock & Orders
- Shipment Tracking
- Court Cost Estimator
- Colour Visualiser
- Document Vault
- Notifications
- My Account
- Help & Support

### 7.2 Admin ERP navigation

- Overview Dashboard
- CRM & Leads
- Dealers
- Products & CMS
- Pricing
- Inventory
- Orders
- Quotations & Invoices
- Shipments
- Estimates & Quotes
- Documents
- Automations
- Notifications
- Reports
- Users & Roles
- Settings
- Audit Log

### 7.3 Route model

```text
/login
/forgot-password
/dealer/dashboard
/dealer/catalogue
/dealer/catalogue/[productId]
/dealer/stock
/dealer/orders
/dealer/orders/[orderId]
/dealer/shipments/[shipmentId]
/dealer/estimator
/dealer/visualiser
/dealer/documents
/dealer/account
/admin/dashboard
/admin/leads
/admin/dealers
/admin/products
/admin/inventory
/admin/orders
/admin/shipments
/admin/estimates
/admin/documents
/admin/automations
/admin/reports
/admin/settings
/admin/audit
```

---

## 8. UI/UX Requirements

### 8.1 Visual direction

Use the MVP demo as the baseline visual language:

- Deep navy navigation and primary actions.
- Gold as the premium accent.
- Orange for attention and conversion actions.
- Green for successful and healthy states.
- Neutral warm backgrounds and restrained card borders.
- Data-dense desktop layouts that collapse cleanly on mobile.

Suggested initial tokens:

| Token | Value | Purpose |
|---|---:|---|
| Navy | `#0A2A57` | Primary brand and headings |
| Dark Navy | `#071D3D` | Sidebar and high-contrast panels |
| Gold | `#B9903C` | Premium accent and tier indicators |
| Orange | `#F36E21` | Primary conversion/action emphasis |
| Green | `#006442` | Success, available stock and healthy status |
| Background | `#FAFAF8` | Application background |
| Border | `#E4E1D8` | Dividers and card outlines |

### 8.2 Interaction standards

- Every table supports loading, empty, error and populated states.
- Important filters persist in the URL query string.
- Destructive actions require confirmation and a clear target name.
- Forms use inline validation and preserve user input after recoverable errors.
- Success notifications state what changed and provide the next action.
- Long operations show progress and complete asynchronously.
- Status colors always include a text label and do not rely on color alone.
- Mobile tables switch to stacked cards or horizontal scrolling based on data density.
- Keyboard navigation, visible focus, labels and sufficient contrast are required.

### 8.3 Reusable components

- Application shell and role-aware sidebar.
- Page header with breadcrumbs and actions.
- KPI cards.
- Search/filter toolbar.
- Data table with pagination, sort and export.
- Status badge and timeline.
- Drawer/modal forms.
- File uploader with progress.
- Activity feed.
- Approval panel.
- Notification center.
- AI assistant panel with sources/context and human approval actions.
- Empty-state and error-state components.

---

## 9. Functional Requirements

### 9.1 Authentication and User Management

**FR-AUTH-01:** Users can sign in using email and password.  
**FR-AUTH-02:** Password reset emails are sent through ZeptoMail.  
**FR-AUTH-03:** Sessions expire securely and can be revoked by an admin.  
**FR-AUTH-04:** Super Admin can create, invite, suspend and reactivate users.  
**FR-AUTH-05:** Permissions are enforced in both the UI and FastAPI backend.  
**FR-AUTH-06:** Dealer owners can invite staff within limits defined by the admin.  
**FR-AUTH-07:** Login, reset, invite, suspension and permission changes are audited.

**Acceptance criteria**

- Unauthorized API requests return `401`; forbidden actions return `403`.
- A dealer user cannot query or infer another dealer's records.
- Invitation and reset links are time-limited and single-use.

### 9.2 Dealer Management

**FR-DLR-01:** Admin can create and edit dealer profiles.  
**FR-DLR-02:** Profiles include legal name, display name, GST/PAN, address, contacts, territory, tier, credit terms and status.  
**FR-DLR-03:** Admin can upload KYC and agreement documents.  
**FR-DLR-04:** Dealer status follows Draft → Pending Review → Approved/Rejected → Suspended.  
**FR-DLR-05:** Dealer tier supports Registered, Silver, Gold and Platinum.  
**FR-DLR-06:** Dealer activity shows orders, estimates, documents, leads, emails and account changes.  
**FR-DLR-07:** Dealer list supports filters, CSV import and CSV export.

### 9.3 Product Catalogue and CMS

**FR-PRD-01:** Admin can manage categories, products, variants and SKUs.  
**FR-PRD-02:** Product fields include sport, system tier, description, thickness, indoor/outdoor suitability, certification claims, MOQ, lead time and media.  
**FR-PRD-03:** Products can be Draft, Published, Archived or Out of Stock.  
**FR-PRD-04:** Dealer catalogue supports search and filters by sport, surface, setting, certification and availability.  
**FR-PRD-05:** Dealer-specific price visibility is controlled by tier and explicit override.  
**FR-PRD-06:** Admin can reorder media and attach documents.  
**FR-PRD-07:** Catalogue changes are recorded in an audit trail.

### 9.4 Pricing and Rate Cards

**FR-PRC-01:** Admin can manage base prices per SKU and unit.  
**FR-PRC-02:** Pricing rules support dealer tier, effective date, volume slab and optional account override.  
**FR-PRC-03:** Court Estimator uses versioned rate cards, not hard-coded values.  
**FR-PRC-04:** Expired price rules are not applied to new orders.  
**FR-PRC-05:** Price override requires a reason and permission.  
**FR-PRC-06:** Existing orders retain their original price snapshot.

### 9.5 Inventory

**FR-INV-01:** Admin can manage warehouses/locations.  
**FR-INV-02:** Stock is stored by SKU, location and optional batch/lot.  
**FR-INV-03:** Stock transactions include receipt, adjustment, reservation, release, dispatch and return.  
**FR-INV-04:** Available quantity equals on-hand minus active reservations.  
**FR-INV-05:** Admin can configure reorder points per SKU/location.  
**FR-INV-06:** Low-stock and stockout states are calculated automatically.  
**FR-INV-07:** Every manual adjustment requires quantity, reason and responsible user.  
**FR-INV-08:** Dealers see only stock levels allowed for their territory/account.  
**FR-INV-09:** CSV import supports initial stock setup with a validation preview.

### 9.6 Orders

**FR-ORD-01:** Dealer creates a cart/order request using available products.  
**FR-ORD-02:** The backend calculates tier price, tax estimate, totals and credit information.  
**FR-ORD-03:** Supported payment terms include full payment, advance/balance and approved credit terms.  
**FR-ORD-04:** MVP payment status is recorded as Unpaid, Partially Paid, Paid, Overdue or Refunded.  
**FR-ORD-05:** Admin reviews and confirms or rejects an order request.  
**FR-ORD-06:** Order statuses are Draft → Submitted → Confirmed → Processing → Packed → Dispatched → Delivered; Cancelled is a controlled terminal status.  
**FR-ORD-07:** Confirmation creates a stock reservation using a database transaction.  
**FR-ORD-08:** Order detail includes items, totals, payment history, shipment, documents and activity.  
**FR-ORD-09:** Dealers can repeat a delivered order with current price and stock recalculation.  
**FR-ORD-10:** Order status changes trigger configured notifications.

### 9.6A Quotations, Invoices and Payments

**FR-FIN-01:** Authorized users can convert an estimate into a versioned draft quotation.  
**FR-FIN-02:** Quotations include validity, commercial terms, itemized taxes/discounts and approval status.  
**FR-FIN-03:** An accepted quotation can create an order without re-entering line items.  
**FR-FIN-04:** The system can generate branded quotation, pro forma invoice and invoice PDFs from approved templates.  
**FR-FIN-05:** Invoice numbering follows an admin-configured financial-year sequence and cannot be reused.  
**FR-FIN-06:** MVP invoices record GSTIN, place of supply, HSN/SAC, tax breakdown and payment status; PFS finance must approve the final production template and rules.  
**FR-FIN-07:** Authorized users can record receipts, references, dates and supporting files manually.  
**FR-FIN-08:** Confirmed invoices are not silently edited; corrections use a controlled revision/credit-note workflow approved for the MVP.  
**FR-FIN-09:** Commercial PDFs can be emailed through ZeptoMail and the action is logged.

### 9.7 Shipments

**FR-SHP-01:** Admin creates a shipment against a confirmed order.  
**FR-SHP-02:** Shipment fields include carrier, tracking number, dispatch date, ETA, status and notes.  
**FR-SHP-03:** Admin can update the shipment timeline manually.  
**FR-SHP-04:** Dealers view a simple milestone timeline.  
**FR-SHP-05:** POD files can be attached at delivery.  
**FR-SHP-06:** Shipment updates send in-app/email notifications according to preferences.

### 9.8 CRM-Lite and Leads

**FR-CRM-01:** Leads can be created manually, by public form or CSV import.  
**FR-CRM-02:** Lead fields include source, campaign, sport/product, project type, area/court count, location, budget band, timeline, authority, owner and status.  
**FR-CRM-03:** Pipeline stages are New → Contacted → Qualified → Estimate/Quote → Won/Lost → Nurture.  
**FR-CRM-04:** Leads support notes, tasks, activity history and next follow-up.  
**FR-CRM-05:** Rules-based lead scoring uses configurable weights based on the GTM strategy.  
**FR-CRM-06:** Lead assignment supports manual assignment and territory-based automation.  
**FR-CRM-07:** Leads can be linked to a dealer, estimate, quote and order.  
**FR-CRM-08:** Kimi can summarize lead notes and draft a follow-up; the user must approve sending.  
**FR-CRM-09:** Hot leads with overdue follow-up appear in an SLA breach queue.  
**FR-CRM-10:** A prefilled WhatsApp link can be opened from a lead record.

### 9.9 Court Cost Estimator

**FR-EST-01:** Inputs include sport, number of courts, area, indoor/outdoor, system tier, base condition, accessories and location/freight zone.  
**FR-EST-02:** Calculation uses a versioned deterministic formula and current rate card.  
**FR-EST-03:** Output shows an itemized low/high range for materials, base work, labour, add-ons and freight.  
**FR-EST-04:** Every result displays: “Indicative budgetary estimate; final quotation subject to site assessment.”  
**FR-EST-05:** An estimate can be saved against a lead or dealer.  
**FR-EST-06:** Kimi may explain the calculation in plain language but must not change the numeric calculation.  
**FR-EST-07:** An authorized user can convert an estimate into a draft quote.  
**FR-EST-08:** The estimate retains the formula and rate-card version used.

### 9.10 Colour Visualiser

**FR-VIS-01:** User selects sport and zone-specific PFS colours.  
**FR-VIS-02:** The court preview updates instantly as an SVG.  
**FR-VIS-03:** Supported MVP sports: pickleball, badminton, padel, tennis and basketball.  
**FR-VIS-04:** Each swatch shows PFS code and hex value; RAL is optional when data is available.  
**FR-VIS-05:** User can save, name and reopen a combination.  
**FR-VIS-06:** A combination can prefill the Cost Estimator.  
**FR-VIS-07:** Dealer can download/share a basic branded image or PDF when the template is configured.

### 9.11 Document Vault

**FR-DOC-01:** Admin uploads and categorizes technical data sheets, manuals, warranties, approvals, reports and brochures.  
**FR-DOC-02:** Documents can be linked to categories, products and SKUs.  
**FR-DOC-03:** Document versions have effective date, status and replacement relationship.  
**FR-DOC-04:** Dealers see only Published documents permitted for their role/tier.  
**FR-DOC-05:** Downloads are logged.  
**FR-DOC-06:** MVP supports co-branding for an approved set of templates using dealer logo and contact details.  
**FR-DOC-07:** When a published document is superseded, prior versions remain in admin history but disappear from normal dealer browsing.  
**FR-DOC-08:** File storage uses AWS S3 or compatible managed object storage; NeonDB stores metadata only.

### 9.12 Notifications

**FR-NTF-01:** Notification channels in MVP are in-app and ZeptoMail email.  
**FR-NTF-02:** Supported triggers include user invitation, password reset, dealer approval, order submission/confirmation/status, shipment update, payment reminder, low stock, assigned lead, overdue follow-up and document revision.  
**FR-NTF-03:** Templates support variables, preview and test send.  
**FR-NTF-04:** Users can configure non-critical preferences; security messages cannot be disabled.  
**FR-NTF-05:** Delivery status, provider message ID and failure reason are logged.  
**FR-NTF-06:** Failed transactional emails are retried with bounded exponential backoff.

### 9.13 Dashboards and Reports

**FR-RPT-01:** Admin dashboard shows revenue/order value, active dealers, open leads, order status, low stock, overdue follow-ups and recent activity.  
**FR-RPT-02:** Dealer dashboard shows monthly order value, active orders, outstanding amount, tier, referred leads, stock alerts and recent documents.  
**FR-RPT-03:** Reports support date, territory, category, dealer, owner and status filters.  
**FR-RPT-04:** Users can export authorized report data to CSV.  
**FR-RPT-05:** MVP reports are operational; a dedicated BI warehouse is deferred.

### 9.14 Audit Log

**FR-AUD-01:** Audit events capture actor, action, entity, entity ID, timestamp and relevant before/after fields.  
**FR-AUD-02:** Sensitive values and secrets are never stored in logs.  
**FR-AUD-03:** Audit entries are append-only through application permissions.  
**FR-AUD-04:** Admin can filter audit history by user, module, entity and date.

---

## 10. Automation Requirements

### 10.1 Automation engine

The MVP automation engine will be rules-based and database-driven. It will support event triggers, optional conditions and one or more actions.

**Trigger → Condition → Action**

Examples:

| Trigger | Condition | Automated action |
|---|---|---|
| Stock balance changed | Available ≤ reorder point | Create alert, notify inventory team and add dashboard task |
| New stock received | SKU has subscribed dealers | Queue a dealer email notification after admin approval |
| Lead created | Territory has an active owner | Assign lead and start first-contact SLA timer |
| Lead score updated | Score ≥ configured hot threshold | Mark Hot, notify owner and create follow-up task |
| Follow-up due | Task incomplete | Remind owner; escalate after configured delay |
| Dealer application submitted | Required fields/files present | Move to Pending Review and notify approver |
| Order submitted | Stock is sufficient | Reserve stock temporarily and notify order desk |
| Order confirmed | Valid email available | Send confirmation and create fulfilment tasks |
| Shipment dispatched | Tracking number present | Update timeline and notify dealer |
| Payment due date approaching | Balance > 0 | Send reminder and add outstanding-payment alert |
| Document published | Replaces an earlier version | Notify affected dealers who downloaded the old version |
| Estimate created | Linked lead has no next task | Create follow-up task for sales owner |

### 10.2 Automation controls

- Each rule has Draft, Active, Paused and Archived status.
- Rules support dry-run/test mode.
- Admin can inspect execution history and failure reason.
- Actions must be idempotent; retries cannot create duplicate orders, emails or tasks.
- High-risk actions require approval, including bulk communication, price override and stock write-off.
- A global kill switch pauses non-critical automations.
- Automation service uses an outbox/jobs table for MVP reliability.
- Railway cron or AWS EventBridge triggers scheduled jobs; FastAPI workers process them.

### 10.3 Automation templates shipped with MVP

1. Low-stock alert.
2. Lead assignment by territory.
3. Hot-lead notification.
4. Lead follow-up reminder and escalation.
5. Dealer approval email.
6. Order submission acknowledgement.
7. Order status notification.
8. Shipment dispatch/delivery notification.
9. Payment due reminder.
10. Revised-document notification.
11. New-stock dealer broadcast with approval.
12. Inactive-dealer reminder task for account managers.

---

## 11. Kimi LLM Requirements

### 11.1 Model policy

- Primary model: **Kimi K2.6 or a later approved compatible version**.
- All model access goes through an internal `LLMProvider` adapter.
- Model name, endpoint, timeout, token limit and safety configuration are environment-controlled.
- The platform must allow a future provider to be added without rewriting product modules.

### 11.2 MVP AI use cases

- Summarize lead notes and activity.
- Draft sales follow-up emails.
- Explain deterministic cost estimates in clear language.
- Suggest relevant catalogue products from a structured user query.
- Summarize order, dealer or inventory activity for admins.
- Convert natural-language admin queries into safe filter suggestions, not unrestricted SQL.
- Draft product descriptions or notification templates for admin review.

### 11.3 AI guardrails

- The LLM cannot directly update stock, prices, credit limits or order status.
- All structured outputs are validated using Pydantic schemas.
- Numeric estimates come from business rules; the LLM only explains them.
- AI-generated communication remains a draft until a human approves it.
- Prompts must minimize unnecessary personal or commercially sensitive data.
- Store request metadata, model/version, latency, token usage, output status and user decision.
- Do not claim to store hidden chain-of-thought. Store inputs, tool calls, structured outputs and decision summaries needed for audit.
- Rate limits, timeouts, retries and a circuit breaker protect the platform from model failure.
- A non-AI fallback must exist for every core workflow.

---

## 12. Technical Architecture

### 12.1 Approved stack

| Layer | Technology | MVP responsibility |
|---|---|---|
| Web/PWA | Next.js + TypeScript | Dealer portal, admin ERP, public lead form, server rendering and responsive UI |
| API | FastAPI + Python | Business rules, RBAC, workflows, AI orchestration, integrations and OpenAPI contract |
| Database | NeonDB PostgreSQL | Transactional data, audit events, automation jobs and reporting queries |
| Email | ZeptoMail | Transactional emails and operational notifications |
| Frontend hosting | Vercel | Next.js deployments, preview environments and CDN |
| Backend hosting | Railway for MVP; AWS for scale | FastAPI API and worker processes |
| File storage | AWS S3 | Product media, KYC, documents, POD and generated assets |
| LLM | Kimi K2.6+ | Controlled assistive AI capabilities through provider adapter |

### 12.2 Deployment recommendation

**MVP:**

- Next.js on Vercel.
- FastAPI API and worker on Railway using Docker.
- NeonDB in the nearest appropriate supported region.
- AWS S3 for object storage.
- ZeptoMail for transactional email.

**Scale path:**

- Keep Next.js on Vercel.
- Move FastAPI containers to AWS ECS/Fargate if load, compliance or networking needs justify it.
- Use AWS SQS and EventBridge for durable asynchronous/scheduled work.
- Add ElastiCache only when measured performance requires it.

### 12.3 Logical components

```text
Browser / PWA
    |
    v
Next.js on Vercel
    |
    v
FastAPI REST API on Railway/AWS
    |------ NeonDB PostgreSQL
    |------ AWS S3
    |------ ZeptoMail
    |------ Kimi LLM Gateway
    `------ Worker / Scheduler
```

### 12.4 Architecture rules

- Next.js never contains authoritative commercial calculations.
- FastAPI owns authorization, validation, price calculation, inventory reservation and workflow transitions.
- Database constraints protect uniqueness and valid relationships.
- Long-running work is queued, not performed inside the user request.
- External webhooks are authenticated, stored, acknowledged quickly and processed asynchronously.
- Use REST for MVP; GraphQL is not required.
- Use OpenAPI as the API contract and generate typed frontend clients.

---

## 13. Core Data Model

### 13.1 Identity and access

- `users`
- `roles`
- `permissions`
- `user_roles`
- `sessions`
- `invites`

### 13.2 Dealers and CRM

- `dealer_accounts`
- `dealer_contacts`
- `dealer_territories`
- `dealer_documents`
- `leads`
- `lead_scores`
- `lead_assignments`
- `activities`
- `tasks`

### 13.3 Products and pricing

- `categories`
- `products`
- `product_variants`
- `skus`
- `product_media`
- `product_certifications`
- `price_lists`
- `price_rules`
- `rate_cards`
- `rate_card_items`

### 13.4 Inventory and commerce

- `warehouses`
- `stock_batches`
- `stock_balances`
- `stock_movements`
- `stock_reservations`
- `orders`
- `order_items`
- `quotes`
- `quote_items`
- `invoices`
- `invoice_items`
- `payment_records`
- `shipments`
- `shipment_events`

### 13.5 Tools and content

- `estimates`
- `estimate_items`
- `colour_combinations`
- `documents`
- `document_versions`
- `document_downloads`
- `co_brand_jobs`

### 13.6 Platform operations

- `notification_templates`
- `notifications`
- `automation_rules`
- `automation_runs`
- `outbox_jobs`
- `ai_runs`
- `audit_events`
- `system_settings`

### 13.7 Data design requirements

- UUID primary keys.
- UTC timestamps, displayed in the user's configured time zone.
- Soft deletion only where restoration/audit is required; financial and stock records are never silently deleted.
- Money stored in minor currency units or exact decimals, never floating point.
- Order, price, estimate and tax snapshots remain immutable after confirmation.
- Optimistic locking/version fields for high-contention records.
- Composite indexes for common filters such as account/status/date, SKU/location and lead owner/status.
- Neon pooled connections in production; migrations use a direct connection where required.

---

## 14. API Requirements

### 14.1 API conventions

- Base path: `/api/v1`.
- JSON request/response bodies.
- Standard error envelope with code, human message, field errors and request ID.
- Cursor pagination for large activity/audit feeds; page pagination is acceptable for smaller admin lists.
- Idempotency keys for order submission, email actions and relevant webhooks.
- OpenAPI documentation available in non-production environments; production access restricted.

### 14.2 Initial API groups

```text
/auth
/users
/roles
/dealers
/leads
/tasks
/categories
/products
/skus
/pricing
/warehouses
/inventory
/orders
/quotes
/invoices
/payments
/shipments
/estimates
/colour-combinations
/documents
/notifications
/automations
/reports
/ai
/audit
/settings
```

### 14.3 Workflow validation

- State changes use dedicated transition endpoints, not unrestricted status field edits.
- Every transition checks current state, permissions and business conditions.
- Invalid transitions return a stable domain error.
- Stock reservation and order confirmation execute within one database transaction.

---

## 15. Non-Functional Requirements

### 15.1 Performance

- Catalogue/stock read API p95 under 500 ms under expected MVP load, excluding third-party latency.
- Core pages become usable within 3 seconds on a typical mid-range mobile connection after first load.
- Common list queries are paginated and indexed.
- Images use optimized formats and responsive sizes.
- Expensive report exports and document generation run asynchronously.

### 15.2 Availability and resilience

- MVP availability target: 99.5% monthly, excluding planned maintenance.
- Database backups and point-in-time recovery configured according to the selected Neon plan.
- External provider failure cannot block unrelated ERP functions.
- Email and AI failures are visible and retryable.
- Health endpoints cover API liveness and readiness without exposing secrets.

### 15.3 Security

- TLS for all network traffic.
- Passwords hashed with a modern adaptive algorithm.
- Secure, HTTP-only, SameSite cookies preferred for web sessions.
- CSRF protection for cookie-authenticated mutations.
- Input validation in frontend and backend.
- Signed, short-lived file download/upload URLs.
- Secrets stored only in managed environment variables/secret stores.
- Rate limiting for login, password reset, public forms and AI endpoints.
- Dependency and container scanning in CI.
- No card data stored in the platform.

### 15.4 Privacy and compliance

- Consent and purpose fields for leads where required.
- Data minimization and configurable retention.
- Access, correction and deletion workflows compatible with India's DPDP requirements, subject to legal validation.
- Financial/audit data retained according to applicable legal requirements.
- Production compliance claims require review by PFS legal/finance teams.

### 15.5 Accessibility and localization

- Target WCAG 2.2 AA for major workflows.
- English in MVP; architecture prepared for Hindi and later languages.
- All user-facing copy kept in translation dictionaries.
- Dates, numbers, currency and units use locale-aware formatting.

---

## 16. Analytics and KPIs

### 16.1 Product usage

- Active dealers and active dealer users.
- Dealer login frequency.
- Catalogue searches and product views.
- Order request completion rate.
- Estimate creation and estimate-to-order conversion.
- Document downloads and co-brand requests.
- Automation success/failure rate.
- AI draft acceptance/edit/rejection rate.

### 16.2 Commercial operations

- Lead first-response time.
- Lead-to-qualified rate.
- Qualified-to-estimate and estimate-to-order conversion.
- Follow-up SLA compliance.
- Order value and status distribution.
- Dealer/direct channel split.
- Outstanding payments.
- Low-stock and stockout count.
- Order-to-dispatch cycle time.

### 16.3 Technical monitoring

- API latency and error rate.
- Worker queue depth and oldest-job age.
- Database connection utilization.
- Failed email rate.
- AI latency, error rate and cost/usage.
- Frontend errors and Core Web Vitals.

---

## 17. Development Structure for AI Agents

### 17.1 Repository structure

```text
/apps
  /web                 # Next.js application
  /api                 # FastAPI application
/packages
  /api-client          # Generated TypeScript client
  /ui                  # Shared UI components and tokens
  /config              # Shared linting/formatting configuration
/infra
  /railway
  /aws
/docs
  /prd
  /architecture
  /api
  /decisions
  /runbooks
/tests
  /e2e
```

### 17.2 Agent-readable project files

- `AGENTS.md`: repository rules, commands, boundaries and quality gates.
- `CLAUDE.md`: optional Claude-specific working instructions referencing the same canonical rules.
- `README.md`: setup, environment and common commands.
- `docs/architecture/`: domain boundaries, authentication, authorization, jobs and deployment.
- `docs/decisions/`: concise Architecture Decision Records.
- `openapi.json`: generated API contract.
- `.env.example`: variable names only; never real credentials.

### 17.3 AI-assisted development rules

- Agents work from small, testable tickets with explicit acceptance criteria.
- One domain/module per task where practical.
- No agent may silently change the PRD, database contract or permission model.
- Schema changes require a migration and rollback note.
- API changes require regenerated clients and contract tests.
- UI work must include loading, empty, validation, permission and error states.
- Generated code must pass formatter, linter, type checks, unit tests and relevant E2E tests.
- Security-sensitive code receives human review.
- Agents do not deploy production or run destructive migrations without explicit human approval.
- Secrets, customer data and production dumps are never placed in prompts.

### 17.4 Definition of Done

A feature is complete only when:

1. Acceptance criteria pass.
2. API and UI permissions are enforced.
3. Unit/integration tests cover the main success and failure paths.
4. Relevant Playwright E2E flow passes.
5. Loading, empty and error states are implemented.
6. Audit event is added where required.
7. Documentation and OpenAPI are updated.
8. No critical/high security or accessibility issue remains.
9. Preview deployment is reviewed on desktop and mobile widths.

---

## 18. Testing Strategy

### 18.1 Automated testing

- FastAPI unit tests for services, validation and workflow transitions.
- Database integration tests against isolated Neon branches or disposable test databases.
- API contract tests generated from OpenAPI.
- Next.js component tests for critical forms and permissions.
- Playwright E2E tests for core journeys.
- Security tests for authorization boundaries and cross-dealer access.

### 18.2 Required E2E journeys

1. Admin creates and approves a dealer.
2. Dealer user accepts invite and signs in.
3. Admin creates product, rate and stock.
4. Dealer browses product and submits an order.
5. Admin confirms order and stock is reserved.
6. Admin issues the approved commercial document, records payment and dispatches the order; the dealer sees the shipment timeline.
7. Sales user creates/qualifies a lead and schedules follow-up.
8. Dealer creates and saves a court estimate.
9. Dealer creates and saves a colour combination.
10. Admin publishes a revised document and affected dealer receives notification.
11. Low-stock automation fires exactly once for a threshold event.
12. Dealer cannot access another dealer's records through UI or API.

### 18.3 Seed and demo data

Provide repeatable seed data matching the MVP demo:

- Dealer tiers and example dealer account.
- PFS sport categories and colour codes.
- Example products/SKUs and stock statuses.
- Sample leads, orders, shipments and documents.
- Separate demo accounts for each role.

---

## 19. Delivery Plan

### 19.1 Recommended MVP timeline: 8-10 weeks

| Sprint | Focus | Primary outputs |
|---|---|---|
| Sprint 0 - Week 1 | Foundation | Repositories, design tokens, environments, auth architecture, database baseline, CI/CD and seed strategy |
| Sprint 1 - Weeks 2-3 | Core masters and UI shell | App shell, RBAC, users, dealers, catalogue/CMS, responsive components |
| Sprint 2 - Weeks 4-5 | Inventory and orders | Warehouses, stock ledger, pricing, dealer stock view, cart/order request, admin order flow |
| Sprint 3 - Week 6 | CRM and shipments | Lead pipeline, tasks, scoring rules, shipment timeline and notifications |
| Sprint 4 - Week 7 | Tools and documents | Cost Estimator, Colour Visualiser, Document Vault and basic co-brand workflow |
| Sprint 5 - Week 8 | Automation and AI | Automation templates, ZeptoMail, Kimi gateway and approved AI assistance |
| Stabilization - Weeks 9-10 | QA and pilot | E2E testing, performance, security review, data import, training, pilot feedback and production release |

### 19.2 Release gates

- **Alpha:** internal PFS staff can manage products, dealers, leads, stock and orders.
- **Beta:** pilot dealers can complete core self-service workflows with seed/controlled production data.
- **Production MVP:** security, backups, monitoring, email domain configuration, operational runbooks and acceptance testing complete.

---

## 20. MVP Acceptance Criteria

The MVP can be accepted when:

- All included modules are available in production with role-based access.
- The 12 required E2E journeys pass.
- No known critical or high-severity security issue remains.
- Cross-dealer data isolation is verified.
- Order confirmation correctly reserves stock without overselling in concurrency tests.
- All commercial totals are calculated by tested backend rules.
- Invoice numbering, immutable snapshots and approved tax calculations are verified by PFS finance.
- ZeptoMail sends and logs required transactional messages.
- Automation retries do not duplicate actions.
- Kimi failure does not block core workflows.
- Desktop, tablet and mobile-browser UX has been reviewed.
- Admin can import initial dealers, products and stock from validated CSV templates.
- Backup, restore, incident and deployment procedures are documented.
- Business owners approve the pilot workflow and initial data.

---

## 21. Risks and Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Scope expansion into the full long-term platform | Delayed MVP | Maintain strict MVP/deferred list and require change approval |
| Over-automating immature workflows | Wrong actions or staff distrust | Begin with suggestions/approvals, log outcomes and activate autonomy gradually |
| AI creates incorrect commercial information | Financial/reputation risk | Deterministic calculations, structured validation and human approval |
| Inaccurate source stock data | Dealer frustration | Controlled stock ownership, adjustment audit and visible last-updated time |
| Dealer adoption is low | Reduced operational value | PWA, simple UI, onboarding, email links and optional WhatsApp deeplinks |
| Background jobs duplicate actions | Duplicate email/tasks/reservations | Idempotency keys, outbox pattern, unique constraints and bounded retries |
| Third-party provider outage | Workflow disruption | Adapters, retry queues, status visibility and non-AI/manual fallbacks |
| Native mobile expectations reappear | Scope conflict | Explicitly position MVP as responsive PWA; estimate native work separately |
| Legal/tax assumptions are treated as final | Compliance exposure | Legal/finance review before production invoicing or DPDP claims |

---

## 22. Assumptions and Decisions Required

### 22.1 Current assumptions

- MVP is a responsive web/PWA, not native mobile.
- India and INR are the only live country/currency in MVP.
- English is the initial interface language.
- PFS will provide approved catalogue copy, product specifications, price lists, colour mapping, certificates and rate cards.
- PFS will own and configure the Vercel, Railway/AWS, Neon, ZeptoMail, S3 and Kimi accounts.
- Payment and shipment data can be maintained manually in MVP.
- Official Meta, WhatsApp, Voice AI, payment and logistics connections are later phases.

### 22.2 Decisions needed before Sprint 1 ends

1. Final PFS product/SKU hierarchy and units of measure.
2. Warehouse/location list and who owns stock updates.
3. Dealer tier pricing and territory rules.
4. Order approval, cancellation and reservation expiry policies.
5. GST display/calculation requirements for the MVP.
6. Final lead score threshold and territory assignment rules.
7. ZeptoMail sender domain, addresses and approved email templates.
8. Kimi API endpoint, credentials, data-processing terms and model identifier.
9. S3 bucket region, retention and file-size/type limits.
10. Pilot user list and data migration templates.

---

## 23. Post-MVP Roadmap

### Phase 1 - Connected Operations

- Razorpay/PayU payment integration.
- Carrier/logistics API integration.
- Meta Lead Ads and Conversions API.
- Official WhatsApp Business integration.
- Advanced co-branded PDF generation.
- Accounting/ERP export or connector.

### Phase 2 - AI and Network Scale

- Voice AI qualification and booking.
- Statistical demand forecasting with Kimi explanations.
- Dealer academy, warranty/AMC, service tickets and referrals.
- Marketing co-op fund and public Find a Dealer.
- Deeper BI and cohort analytics.

### Phase 3 - International and Native

- Multi-entity and multi-currency.
- US price, tax, certification and distributor flows.
- Stripe/ACH and US logistics.
- Native mobile apps if usage justifies them.
- Multi-region deployment and higher availability target.

---

## 24. Final Product Boundary

This MVP is an operational ERP and dealer self-service platform—not yet a fully autonomous AI sales organization, complete accounting suite, marketplace or native mobile ecosystem. Its purpose is to put PFS Sport's most important workflows on a clean, reliable foundation quickly, prove adoption with real users and create measured evidence for the next investment phase.
