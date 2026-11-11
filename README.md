# Vision Tech starter website

A mobile-first React + Vite frontend prototype for Vision Tech, a phones and electronics marketplace for Sierra Leone.

## Included in this first stage
- Responsive homepage and mobile navigation
- Product categories and search
- Sample product listings
- SLE/USD display selector (USD display is illustrative only)
- Local cart with quantity controls
- Dealer recruitment call-to-action
- Marketplace information sections

## Not connected yet
This is a frontend prototype. It does not yet include:
- Supabase authentication or database
- Dealer KYC or store subscriptions
- Real product inventory
- Monime payments
- Live delivery tracking
- Real affiliate attribution or payouts
- Production customer checkout

Do not accept real payments or customer KYC documents through this prototype.

## Run locally
Install Node.js, then:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

To create a production build:

```bash
npm run build
```

The production files are created in `dist/`.

## Next development stage
Connect Supabase, then implement authentication, database tables, row-level security and server-side business logic before enabling real transactions.
