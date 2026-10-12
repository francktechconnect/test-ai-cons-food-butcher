# BoucherieFlow sales demonstration — show, don't only tell

## Audience

Independent butcher shops, meat markets, custom meat cutters, farm-direct meat businesses, and bilingual NB retailers. Present "Boucherie Rivage" as a **fictional shop** standing in for the prospect — it is not a claim about any real Cormier business.

## Elevator pitch (20–30 seconds)

> "Imagine customers ordering their preferred cuts through a simple bilingual page — or your team entering telephone orders directly. Instead of paper slips, every order appears on a shared preparation board. Staff updates actual weights, sees the final price, and the customer receives an update when the package is ready. Meanwhile, your customer records, follow-ups, products and sales activity stay connected. That's the workflow we're proposing."

## Screen-by-screen demo

### 1. Storefront — `/shop` (60–90 sec)

Talk about the business's branding, product selection, stock-dependent items, per-kg/per-pack pricing and language toggle. Add ground beef and a customized steak. Explain why meat must have estimated quantities and real final weights.

### 2. Checkout (45 sec)

Select fictional customer info and pickup time. Order gets a `BF-...` reference. Clarify: **no payment collected and no notification sent**. Use the link to open staff area.

### 3. Orders — `/app?view=orders` (45 sec)

Locate the order. Show online, phone, counter and message channels in one view. Add a phone order to demonstrate staff-assisted capture. Show a single customer record rather than duplicated paper orders.

### 4. Fulfillment — `/app?view=fulfillment` (60 sec)

Explain New → Confirmed → Preparing → Ready → Completed. Show large prep ticket details and change a weight to recalculate final price. Click the stage arrow. The simulated notification appears in activity when the order becomes ready.

### 5. CRM — `/app?view=customers` (30 sec)

Show repeat customer, preferences, linked orders and service notes. Discuss repeat buying and easier follow-ups without aggressive marketing or unsolicited messages.

### 6. Inventory — `/app?view=inventory` (30 sec)

Show products, price units, low stock, and manual stock controls. Explain that live stock reservation and supplier traceability would be part of a subsequent production design.

### 7. Notifications and payments (40 sec)

Preview an EN/FR message and log it as simulated. Point to deposit tracking, final balance and paid/unpaid flags, noting no live integrations are active.

### 8. Analytics and intake (60 sec)

Show the channel distribution and top requested products. Show the **illustrative** weekly revenue chart. Use the phone-note extractor to discuss the future AI assistant — human verification remains mandatory.

## Discovery questions after the presentation

- Roughly how many customer orders do you process on an average weekday and on peak days?
- Where do orders arrive now — calls, texts, email, walk-ins, Facebook, website?
- How often are a pickup, cut request, quantity, or phone number missed?
- What POS, accounting, inventory or weighing systems are already used?
- Are most products sold by piece, pack, estimated weight or actual weight?
- Do customers place half-/quarter-animal orders, need cutting sheets, or pay deposits?
- Which result would be worth paying for: fewer lost orders, faster fulfillment, less waste, better customer retention, or something else?
- How many staff need access, and what language do they prefer?

## Suggested paid pilot scope

**Phase 1:** digitize order intake + prep board + customer history + transactional notifications. Require a measurable before/after KPI such as time to capture an order, order correction rate, or pickup delays. Start with a small number of SKUs and one location.

**Phase 2:** add payment collection, variable-weight settlement, actual-stock reservations, accounting/POS synchronization, and regulatory record workflows as appropriate.

**Phase 3:** add AI-assisted phone intake, predictive ordering, customer loyalty, and wholesale/farm-direct packs based on validated needs.

## Objection handling

**"We're happy with phone orders."** — "Keep the phone. We can help staff turn each call into one searchable prep ticket, and avoid re-entering the same details."

**"We already have a cash register."** — "We don't want to replace it without reason. The first step is to see what it handles and connect only the missing workflow."

**"Our meat is sold by weight."** — "The prototype distinguishes the customer's estimated order from the butcher's recorded final weight; production settlement needs a properly integrated payment process."

**"Will the AI get orders wrong?"** — "It can. That's why we propose staff review before confirmation, and no automatic substitutions or charges."
