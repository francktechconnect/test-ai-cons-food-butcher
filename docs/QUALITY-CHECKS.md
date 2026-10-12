# Validation checklist

The environment used to package this source may not have npm registry connectivity. The authoring session therefore cannot claim a completed `next build` unless explicitly stated elsewhere. Run these commands after dependencies are fetched in your own environment or CI:

```bash
npm ci   # when a lockfile exists; otherwise npm install
npm run typecheck
npm run build
npm run start
```

Review manually on desktop and mobile:

- `/shop` product filters and EN/FR language toggle.
- Add products with fractional kg and selected cuts.
- Place a fictional order, see generated order ID.
- `/app?view=orders` order visible in **same browser**.
- Actual weight changes recompute `sumOrder`.
- Order status advances; ready/confirmed produce simulated logs.
- New customer appears in CRM, notes persist on reload.
- Inventory prices and quantities persist on reload.
- Notification center logs samples only, no genuine delivery.
- Manual payment flags have no connection to real funds.
- Restore data from Settings.
- `/api/health` returns status `ok`.
- Verify in a private browser that separate users do not share state (expected for demo).

Before any real-customer pilot, add and verify server-side auth/persistence, automated tests and integrations as described in `PRODUCTION-ROADMAP.md`.
