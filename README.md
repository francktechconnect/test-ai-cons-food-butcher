# BoucherieFlow — Gold & Navy Butcher Shop Prototype

**A clickable stakeholder demonstration** for independent butcher shops, meat markets, and small custom meat processors in New Brunswick, Canada.

> This package is a **demonstration prototype**, not a live e-commerce or payment system. The example merchant **Boucherie Rivage**, customers, orders, catalog, pricing, inventory figures, and contacts are fictional. Do **not** enter real customer data until authentication, server-side persistence, privacy controls, and integrations are implemented.

## Explore the product

| Route | Experience | What to demonstrate |
| --- | --- | --- |
| `/shop` | Customer storefront | Gold/navy hero, bilingual EN/FR, products, custom cuts, variable-weight quantities, cart, pickup, checkout, local order creation and tracking |
| `/app` | Staff dashboard | KPIs, recent orders, pipeline, attention items |
| `/app?view=orders` | Unified order inbox | Search, status filter, phone/counter/manual order entry, order details |
| `/app?view=fulfillment` | Prep board | New → Confirmed → Preparing → Ready → Completed; sample notification when ready |
| `/app?view=customers` | CRM | Customers, notes, communication details, repeat history |
| `/app?view=inventory` | Catalog / inventory | Product stock, low-stock alerts, manual adjustments, price editing |
| `/app?view=notifications` | Messaging center | French/English previews, simulated SMS/email activity log |
| `/app?view=payments` | Payments | Deposits, final totals and manual statuses (no real charges) |
| `/app?view=analytics` | Insights | Real demo-store calculations; revenue trend chart deliberately marked illustrative |
| `/app?view=intake` | Assisted phone ordering | Rule-based text-to-order *preview*, staff confirmation required |
| `/app?view=settings` | Admin | Configurable sample settings and reset button |
| `/api/health` | API route | Verifies Node.js-based Next.js route can run |

### Live demonstration flow (5–8 minutes)

1. Begin at `/shop` and introduce the premium gold/navy ordering storefront. Switch to French with **EN/FR**.
2. Add **Ground Beef** (e.g. 2 kg), **Striploin Steak** (e.g. 1 kg, thick cut), and **BBQ box** to the cart.
3. Open checkout. Enter **fictional** contact details, pickup date and time; place the order. The order number is shown.
4. Click **See this in the staff dashboard**. Go to **Orders** and locate the new order.
5. Open order details, adjust a variable-weight line's **actual quantity**; note the final amount recalculates.
6. Move the order **New → Confirmed → Preparing → Ready** via the detail panel or preparation board.
7. Open **Notifications**; show the bilingual, **simulated** ready-for-pickup message. No message was sent.
8. Open **CRM** to show the newly created customer; **Inventory**, **Payments**, and **Analytics** to demonstrate the integrated operating concept.
9. Optionally paste a phone order into **Order intake lab** to show the staff-reviewed capture concept.
10. In **Settings**, click **Reset demo data** to restore seeded presentation records.

## Run locally

Prerequisites: Node.js **20+** and npm (Node 22 recommended).

```bash
unzip boucherieflow-prototype.zip
cd boucherieflow-prototype
npm install
npm run dev
```

Open **http://localhost:3000**. The home page forwards to `/shop`. To check the API route open `http://localhost:3000/api/health`.

Build for production (once dependencies are installed):

```bash
npm run typecheck
npm run build
npm run start
```

No `.env` is needed for demo mode. `.env.example` lists placeholders for **future** backend integrations; setting those placeholders does **not** activate any integration.

## Deploy to Vercel — browser dashboard (easiest)

1. Sign into GitHub and create a **new private repository** named `boucherieflow-prototype`.
2. Push the *contents of this project folder* to that repo. Keep `.env*`, keys, tokens and real customer files out of Git.
3. Open [vercel.com/new](https://vercel.com/new) and choose **Import Git Repository**.
4. Select your repository. **Framework Preset: Next.js**. **Root Directory: `./`** if the repository root contains `package.json`.
5. Leave build defaults (`npm run build`); **no environment variables** are required for demo mode.
6. Select **Deploy**, then open the URL provided by Vercel.
7. Visit `/shop` for the customer flow and `/app` for operations.
8. Each Git push to your connected branch generates a new deployment; set a custom domain through **Project → Settings → Domains**, if desired.
9. Check `/api/health` to confirm the deployed Next.js route works.
10. For stakeholder privacy, restrict the deployment to authorized viewers using available Vercel protection settings **before** sharing. Note that platform protection features can depend on plan.

**Important:** the browser demo uses `localStorage`. It is **not shared** across different devices, browser profiles or visitors. Submitting an order on your laptop will not appear on a prospect's laptop. Demonstrate shop and dashboard in the **same browser/origin**. Vercel itself does not persist browser state server-side.

## Deploy to Vercel — CLI

```bash
npm install
npm run build
npx vercel login
npx vercel
npx vercel --prod
```

Accept the project import/create prompts and use the folder containing `package.json` as the project root. The CLI provides your deployment URL. The first `npx vercel` command may install the CLI.

## Push to GitHub

After creating an empty repository on GitHub:

```bash
git init
git add .
git commit -m "Initial BoucherieFlow demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/boucherieflow-prototype.git
git push -u origin main
```

Or use the GitHub UI to upload the extracted project files. **Do not commit `node_modules`**.

## Included technology

- **Next.js App Router + Node.js**; React 19 and TypeScript
- **Tailwind CSS 3** with custom gold (`#C89B35`) and midnight navy (`#10223D`)
- **Lucide** icon system; custom reusable demo state provider
- **Browser localStorage** for fictional demo data across `/shop` and `/app` in the same browser
- Vercel-ready Node runtime health endpoint
- No Stripe, Twilio, Resend, CRM backend, SQL persistence or speech-to-text active in prototype
- Product photos reference Unsplash; each catalog card has a colored/emoji fallback and the hero has a bundled SVG fallback. Most text/UI remains accessible without imagery.

## Files / organization

```
app/
  page.tsx            # redirect to storefront
  shop/page.tsx       # customer flow
  app/page.tsx        # staff dashboard + functional panels
  api/health/route.ts # Node.js API example
  layout.tsx          # provider + metadata
  globals.css         # UI tokens, reusable utility classes
components/
  brand.tsx           # branding + language control
  demo-provider.tsx   # shared demo state, local persistence, actions
lib/
  demo-data.ts        # strict domain types and fictional fixtures
database/
  schema.sql          # proposed future relational schema (not applied)
docs/
  DEPLOY-VERCEL.md
  PITCH-WALKTHROUGH.md
  PRODUCTION-ROADMAP.md
public/
  hero-meat.svg       # offline fallback visual
```

## Constraints and safety boundaries

| Prototype capability | Implemented in this package? |
| --- | --- |
| Add products to cart and place a sample order | **Yes**, same-browser demo |
| See same-browser order in staff inbox/CRM | **Yes** |
| Change fulfillment status, note actual weights, update totals | **Yes** |
| Log bilingual sample SMS/email templates | **Yes**, not delivered |
| Track stock and change listed prices manually | **Yes**, local only |
| Take real payment / send real SMS / send real email | **No** |
| Multi-user shared DB, secure authentication, role permissions | **No** |
| Real AI transcription | **No**, rule-based illustration |
| Inventory lot traceability / legal compliance workflows | **No**, requires specialized design |
| Full bilingual staff admin | **Not yet**: customer ordering bilingual; notification message templates bilingual, staff workspace English demo |
| Shared order lookup secure for real customers | **No**, tracking is sample-only |

For commercial operation, implement the items in `docs/PRODUCTION-ROADMAP.md`, especially database persistence, tenant isolation, auth, privacy, payment validation, inventory transactions and appropriate regulatory controls.

## Suggested pitch

**“Your customers can order their meat exactly the way they want. Your staff gets one digital ticket. Your team sees what needs preparing. The customer receives the ready notice. And the owner has customer history and operational visibility — in one simple bilingual experience.”**

Prototype packaged for business discovery and pilot discussion; no affiliation with an actual company called Cormier is implied.
