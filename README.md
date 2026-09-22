# Y.G Asafoetida — E-Commerce Web Application

A full-stack, responsive e-commerce web platform for **Y.G Asafoetida** (Estd. 1932, Tirunelveli — 94 Years of Heritage), built with TanStack Start, React 19, SQLite, and Tailwind CSS.

---

## Features

- **Storefront & Catalog**:
  - 9 authentic Y.G Asafoetida formulations (Gold Powder, Premium Powder, Gluten-Free, Pindi Cake, Chips, Pellets, Bottle Jar, Raw Lump, and 4-in-1 Heritage Box).
  - Compact & comfortable multi-column view modes with instant format filtering and price/rating sorting.
  - Interactive product detail pages with live photo gallery, pack size selector, culinary profiles, and express PIN code delivery lookup.

- **Shopping & Checkout**:
  - Real-time client & server cart synchronization with slide-over Cart Drawer.
  - Promo code discounts (e.g. `HERITAGE10`, `BULK15`, `HING50`) and automatic multi-tier discounts.
  - Full multi-step checkout with address auto-population, UPI/Card/COD options, and instant order tracking.

- **Community & Verified Customer Experience**:
  - Community Q&A with direct answers from the Tirunelveli production team.
  - Verified customer reviews with 5-star rating breakdowns and instant guest review submission.

- **Admin Management Portal (`/admin`)**:
  - Live revenue metrics, order pipeline status updates, stock level alerts, and quick filters.
  - Product catalog management with cover photo selector, local image file uploader, and multi-image gallery editor.
  - Customer ticket resolution and community Q&A moderation.

- **Backend & Database**:
  - Embedded SQLite database powered by Node's synchronous native database driver (`node:sqlite`).
  - Idempotent database migrations and initial seeders.

---

## Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Type-check
npx tsc --noEmit

# Build production bundle
npm run build
```
