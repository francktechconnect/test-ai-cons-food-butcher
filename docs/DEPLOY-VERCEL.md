# Publish BoucherieFlow on Vercel — clear deployment playbook

## A. Local smoke test

From the project folder:

```bash
node --version           # >=20
npm --version
npm install
npm run typecheck
npm run build
npm run dev
```

Open http://localhost:3000/shop and http://localhost:3000/app. Check that ordering in the shop appears in the staff dashboard in the **same browser**.

> If `npm install` fails locally, check access to npm registry, firewall/proxy settings and the current supported Node runtime. Do not proceed with production sharing before a successful local or Vercel build.

## B. GitHub project

1. Create a GitHub repo (public or private) and push the source folder.
2. Commit `package.json`, `app/`, `components/`, `lib/`, `public/`, `docs/`, configuration files.
3. Do **not** commit `node_modules/`, `.next/`, local `.env`, customer data, secrets.

## C. Vercel setup

1. https://vercel.com/new → select **Import Git Repository**.
2. Authorize GitHub if prompted, select `boucherieflow-prototype`.
3. Framework preset: **Next.js**.
4. Root directory: project root containing `package.json`.
5. Build command: default Next.js build (`npm run build`).
6. Output directory: use Next.js defaults — do **not** set static-only output.
7. Environment variables: **none for this demo**.
8. Click **Deploy** and open your new `.vercel.app` URL.
9. Check `/api/health`, `/shop`, and `/app` in the deployed project.

## D. Shareable demo links

- Customer ordering: `https://YOUR-PROJECT.vercel.app/shop`
- Staff experience: `https://YOUR-PROJECT.vercel.app/app`
- Orders: `https://YOUR-PROJECT.vercel.app/app?view=orders`
- Fulfillment: `https://YOUR-PROJECT.vercel.app/app?view=fulfillment`
- CRM: `https://YOUR-PROJECT.vercel.app/app?view=customers`
- Inventory: `https://YOUR-PROJECT.vercel.app/app?view=inventory`
- Notifications: `https://YOUR-PROJECT.vercel.app/app?view=notifications`

**Every visitor gets their own independent browser demo state**. Cross-device order synchronization requires a database and server APIs; deploying this code to Vercel does not add those.

## E. Optional custom domain

In Vercel **Project → Settings → Domains**, add an owned domain/subdomain (such as `demo.yourdomain.ca`). Apply the DNS changes indicated by Vercel. For discovery presentations, a password-protected demo URL can be preferable to a public storefront URL.

## F. Updating the design

1. Edit Tailwind gold/navy tokens in `tailwind.config.ts` and `app/globals.css`.
2. Edit fictional product inventory in `lib/demo-data.ts`.
3. Edit storefront content in `app/shop/page.tsx`.
4. Edit staff panels in `app/app/page.tsx`.
5. Commit and push. Vercel rebuilds the connected branch.
6. Existing demo visitors may have **old localStorage data**; have them use **Settings → Reset demo data** to see updated seed records.

## G. Before using with real clients

**Do not process real personal/customer information in this prototype.** Implement authenticated merchant and customer sessions, durable tenant-scoped SQL records, encrypted transport, authorization, audit logs, privacy and retention, secure customer order tracking, payment integration, webhook verification, transactional inventory adjustment, proper consent handling, and regulatory review.
