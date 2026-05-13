# Hanoi Tourism — Car Rental Site

Next.js 14 (App Router) car rental website with a full admin CMS. Vietnamese-language UI. Dark/light mode.

## Tech Stack

- **Framework**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Rich text**: TinyMCE v8 (self-hosted, no API key — `public/tinymce/` via `postinstall`)
- **State**: Zustand (`lib/store.ts`)
- **Icons**: Lucide React
- **Animation**: Framer Motion

## Commands

```bash
npm run dev       # dev server
npm run build     # production build
npm run lint      # ESLint
npx tsc --noEmit  # type check (no output = clean)
```

## Project Structure

```
app/
  page.tsx               # Home page (force-dynamic)
  admin/
    page.tsx             # Admin CMS — 7 tabs
    _components/         # CarsManager, ServicesManager, PricingManager,
                         # TestimonialsManager, FAQsManager, WhyUsManager, BookingsTab
  api/admin/
    cars/                # GET, POST + [id] PUT, DELETE
    services/            # GET, POST + [id] PUT, DELETE
    pricing/             # GET, POST + [id] PUT, DELETE
    testimonials/        # GET, POST + [id] PUT, DELETE
    faqs/                # GET, POST + [id] PUT, DELETE
    whyus/               # GET, POST (partners), PUT + [id] PUT, DELETE
    auth/                # login / logout
    seed/                # one-time seed endpoint
  xe/[id]/               # Public car detail page
components/sections/     # All home page sections (async server components)
lib/
  content.ts             # Data access layer — all Supabase reads/writes
  types.ts               # Shared TypeScript interfaces
  data.ts                # formatCurrency, COMPANY_INFO, default CARS array
  defaults.ts            # Fallback data for all content types
  supabase.ts            # Supabase client
```

## Data Layer

`lib/content.ts` is the single source of truth for all data. Each content type has:
- `getX()` — reads from Supabase, falls back to `lib/defaults.ts` if table is empty or errors
- `createX()`, `updateX()`, `deleteX()` — write to Supabase

### Supabase Tables

| Table | Key columns |
|-------|-------------|
| `cars` | id, name, brand, category, seats, year, transmission, fuel, price_per_day, price_per_month, image, features (text), available |
| `services` | id, icon, title, description, features (text[]), highlight |
| `pricing_plans` | id, name, price, unit, description, features (text[]), cta, highlight |
| `testimonials` | id, name, role, avatar, rating, text, date |
| `faqs` | id, q, a |
| `whyus_reasons` | id, icon, title, description |
| `settings` | key, value (used for partners list) |
| `bookings` | id, created_at, status, type, full_name, phone, email, car_model, start_date, end_date, pickup_location, notes, estimated_price |

### Pending DB migrations

`services.features` and `pricing_plans.features` are still `text[]` in Supabase. The code works around this by storing HTML as a single-element array on write and normalizing on read. Run these when ready:

```sql
-- services
ALTER TABLE services ALTER COLUMN features TYPE text USING (
  CASE WHEN array_length(features, 1) > 0
  THEN '<ul><li>' || array_to_string(features, '</li><li>') || '</li></ul>'
  ELSE '' END
);

-- pricing_plans
ALTER TABLE pricing_plans ALTER COLUMN features TYPE text USING (
  CASE WHEN array_length(features, 1) > 0
  THEN '<ul><li>' || array_to_string(features, '</li><li>') || '</li></ul>'
  ELSE '' END
);

-- cars (if not yet migrated)
ALTER TABLE cars ALTER COLUMN features TYPE text USING (
  CASE WHEN array_length(features, 1) > 0
  THEN '<ul><li>' || array_to_string(features, '</li><li>') || '</li></ul>'
  ELSE '' END
);
```

After running each migration, remove the `[field] ? [field] : []` workaround in `lib/content.ts` and replace with the plain field value.

## Rich Text (TinyMCE)

TinyMCE is self-hosted: `postinstall` copies `node_modules/tinymce → public/tinymce`. No API key needed (`licenseKey="gpl"`).

Fields using TinyMCE in admin:
- **Cars** — `features`
- **Services** — `description`, `features`
- **Pricing** — `features`

Pattern for loading existing content into a TinyMCE editor (use this, not `initialValue`):
```tsx
init={{
  setup: (editor) => {
    editor.on('init', () => editor.setContent(snapshot || ''));
  },
}}
```

Always use unique `key` per editor instance (`key={`feat-${itemId}`}`) so React remounts when switching records.

## Styling Conventions

- Dark theme: `#0A0A0A` bg, `#141414` cards, `#2A2A2A` borders, `#CCCCCC` text, `#8A8A8A` muted
- Primary green: `#006400` / `#008000`
- Light mode overrides live in `app/globals.css` — `html:not(.dark) footer .text-white` turns white text black. Add `dark-section` class to any dark-background element that must keep white text in light mode.
- `input-dark`, `btn-gold`, `btn-outline-gold`, `card-dark` are utility classes defined in `globals.css`

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=... \
  --build-arg NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=... \
  -t hanoi-tourism .

docker run -p 3000:3000 -e SUPABASE_SERVICE_ROLE_KEY=... hanoi-tourism
```

`NEXT_PUBLIC_*` vars are baked in at build time. Runtime secrets go in `-e`.
