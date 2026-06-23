# Kerb — Functional Specification

*Last updated: 2026-06-17 (rev 3 — enquiry routing, billing trigger, photo upload wired on new + edit, Companies House monitor)*

---

## Overview

Kerb is a UK car marketplace. Verified dealers list their vehicles. Buyers search, find, and contact dealers directly. The platform never intermediates between buyer and dealer.

---

## User types

| User | Description |
|---|---|
| **Buyer** | Anonymous visitor. Searches listings, views detail pages, sends enquiry directly to dealer. No account required. |
| **Dealer** | Registered business. Managed via Clerk auth. Lists and manages vehicles. Receives buyer enquiries directly via phone/email. |
| **Admin** | Hans. No admin panel yet — managed via Supabase dashboard. |

---

## Buyer flows

### Search and browse
1. Land on homepage — sees latest live listings, make shortcuts, body type filter
2. Search by keyword (make/model) via hero search bar or `/search`
3. Filter by make, body type (search page)
4. Click listing card → listing detail page
5. Fill in enquiry form → submits to `/api/enquiries` → Resend email to dealer ✅
6. Sees dealer phone + email on detail page — can contact directly

### Listing detail page
- Shows: photos (if uploaded), year/make/model, price, key specs grid, description, dealer card with phone + email
- Enquiry form: name, email, phone (optional), message
- URL structure: `/cars/[id]` (listing UUID)

---

## Dealer flows

### Registration
1. Sign up via Clerk (`/sign-up`)
2. Redirected to `/dealers/register` — 3-step wizard:
   - Step 1: Personal details (name, email, phone)
   - Step 2: Business details — Companies House lookup auto-verifies registered UK companies. Manual entry also allowed.
   - Step 3: Specialisms (makes, inventory size, price range)
3. On submit: dealer row created in Supabase with `status: approved` (if Companies House verified) or `status: pending`
4. Redirected to `/dashboard`

### Dashboard
- Stats: total listings, live count, average price, top listing
- Listings table: vehicle, price, mileage, status, date, edit link
- Verification badge: Companies House verified status
- Add listing button

### Add listing (`/dashboard/listings/new`)
Multi-step wizard:
- Step 1: Vehicle details (make, model, year, colour, body type, doors, fuel, transmission, engine size)
- Step 2: Description builder (condition, service history, features, MOT, recent work, issues)
- Step 3: Pricing, mileage, status (draft/live)
- Photos: cover slot + 5-column grid, drag-and-drop, bulk select, up to 20 ✅
- On submit: POST `/api/listings` → saved to Supabase

### Edit listing (`/dashboard/listings/[id]/edit`)
- Single-page form: all vehicle fields, pricing, mileage, description, status
- Photos: pre-loaded from database, same cover + grid UI, add more or remove ✅
- Save → PATCH `/api/listings/[id]` (includes updated photo array)
- Delete (with confirm) → DELETE `/api/listings/[id]`
- Both operations enforce dealer ownership — a dealer can only edit/delete their own listings

### Listing statuses
| Status | Visible to buyers? |
|---|---|
| `draft` | No |
| `live` | Yes |
| `sold` | No |
| `archived` | No |

---

## Billing model

- Free until first buyer enquiry
- First enquiry triggers: Stripe checkout session → billing link emailed to dealer
- Trial: free until 1st of following calendar month
- Plans: Solo £55/month · Pro £132/month
- Annual: 10 months paid, 12 listed. Switch to monthly before renewal — no forced rollover.

---

## Business rules

- Dealers must be Companies House verified (or manually approved) before listings go live
- A listing only appears on homepage/search if `status = 'live'`
- Edit and delete operations are scoped to the authenticated dealer's own listings
- All buyer enquiries route directly to the dealer's registered email — Kerb is never in the conversation

### Search integrity rule
Organic search results are ordered by relevance and recency only. No dealer can pay to rank above another. This is a founding charter commitment — never break this rule in code or product decisions.

---

## Background operations

### Companies House monthly monitor
- GitHub Actions cron: 1st of each month at 08:00 UTC
- Checks all approved dealers' company status against Companies House
- Updates `company_status` in Supabase if changed
- Sends alert email to `hans@kerb.autos` via Resend if any status changed
- Silence = all clear

---

## What's built ✅

- Dealer registration with Companies House auto-verify
- Clerk authentication (sign in/up, protected routes)
- New listing wizard with photo upload (cover + grid, drag-and-drop, up to 20)
- Edit listing with photo management (add/remove, pre-loaded from database)
- Delete listing
- Homepage and search pulling real Supabase data
- Car detail page with dealer card and wired enquiry form
- Buyer enquiry → Resend email direct to dealer
- Billing trigger on first enquiry → Stripe checkout link emailed to dealer
- Dashboard with stats and listings table
- Analytics: Google Analytics 4, Clarity, Search Console
- Companies House monthly monitoring cron + Resend alert email
- Dealer acquisition landing page with screenshots

---

## Not yet built — roadmap

| Feature | Priority | Notes |
|---|---|---|
| Stripe live mode | P0 | Switch secret key to live when first dealer onboards |
| Buyer-facing dealer directory / dealer profile page | P1 | `/dealers` currently shows acquisition page |
| Spotlight feature (dashboard + dealer profile + homepage) | P1 | Schema ready — `spotlighted` column exists |
| Admin panel | P2 | Currently managed via Supabase dashboard |
| Vehicle history check (HPI) | P2 | Q1 2027 |
| Finance introduction flow | P3 | 2027 |
| Insurance referrals | P3 | 2027 |

---

## Analytics

| Tool | Status | ID |
|---|---|---|
| Google Analytics 4 | Live | G-MFCDLJ52QL |
| Microsoft Clarity | Live | x7v8fg28yj |
| Google Search Console | Verified | — |
