# Portfolio — Next.js 16 · Tailwind v4 · shadcn/ui · TypeScript · Supabase (optional) · Vercel

## Run it

```bash
npm install
cp .env.example .env.local   # everything optional
npm run dev                  # http://localhost:3000
```

With no env vars the site runs entirely on `content/seed.ts`. Edit that file to make it yours.

## Your images

Every image slot shows a striped placeholder until you set it.

- **Quick:** drop files into `public/images/` and reference them in `content/seed.ts`. Example: `portraitUrl: "/images/portrait.png"`.
- **Supabase:** upload to the `portfolio` bucket and store the path in the table. Example: `projects/halcyon/cover.jpg`.

| Slot | Field | Notes |
| --- | --- | --- |
| Hero portrait | `site.portraitUrl` | Transparent PNG cut-out, shoulders up, ~1600px wide. Rendered grayscale with a colour spotlight. |
| Footer avatar | `site.avatarUrl` | Square |
| Work cards | `project.coverUrl` | 1.41 : 1 |
| Case study | `project.gallery[]` | `[hero 16:10, section 16:10, …, last 16:9]` |
| Service previews | `service.previewUrl` | 1.38 : 1, appears on row hover |
| Experience previews | `experience.previewUrl` | 1.3 : 1, appears on row hover |

## Supabase (optional)

The database stores your content and contact-form messages.

1. Create a project at supabase.com.
2. Open **SQL Editor** and run `supabase/migrations/…_init.sql`, then `supabase/seed.sql`. With the CLI instead: `supabase link`, then `supabase db push`.
3. In `.env.local` (and later in Vercel), set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Settings → API Keys)
4. Edit content in the Table Editor. Contact-form submissions land in `contact_messages`.
5. Email alerts (optional): set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
6. Instant updates (optional):
   - Set `REVALIDATE_SECRET`.
   - In Database → Webhooks, add a webhook on each content table. Method: POST. URL: `https://YOUR-SITE/api/revalidate`. Header: `x-revalidate-secret: <secret>`.
   - Without the webhook, pages refresh hourly.

If Supabase is unreachable or misconfigured, the site falls back to the seed content instead of crashing. "Contact Me" falls back to a `mailto:` link.

## Deploy to Vercel

1. Push the folder to GitHub.
2. In Vercel, go to **Add New → Project** and import the repo. The framework is auto-detected and no settings are needed.
3. Add the env vars from `.env.example` that you use.
4. Deploy. `NEXT_PUBLIC_SITE_URL` falls back to the Vercel production URL.

## Design tokens

All tokens live in `app/globals.css`:

- shadcn tokens: `:root`
- Brand colours, type scale, shadows and easing: `@theme`

Sizes use `cqw`, a percentage of the site frame's width, so the 1440px reference scales exactly. Fonts:

| Font | Used for |
| --- | --- |
| Montserrat | Name and ghost words |
| Inter Tight | `/SECTION` titles and service rows |
| Manrope | Everything else |

## Animation map

| Effect | Where |
| --- | --- |
| Load-in: fade + rise 24px + unblur 8px, 1s, staggered | `.intro` + `style={delay(ms)}` (globals.css) |
| Scroll reveal: rise 36px + fade, 90–120ms stagger | `components/site/reveal.tsx` |
| Portrait colour spotlight following the cursor | `components/site/portrait.tsx` + `.spotlight` |
| Hero name auto-fit to full width | `components/site/fit-name.tsx` |
| Service row: charcoal fill, rolling label, expanding text, ↗ → × | `components/site/service-section.tsx` |
| Tilted, lagging, velocity-leaning hover preview | `use-follower.ts` + `follow-preview.tsx` |
| Filter tabs re-run the card reveal | `components/site/work-grid.tsx` |
| Phone/tablet menu: full-screen, staggered rows, close-then-scroll | `components/site/mobile-menu.tsx` |
| Page transition: fade/lift out, then the next page's load-in | `transition-link.tsx` + `page-transition.tsx` |
| Card lift, pill nudges, button rise | Tailwind `hover:` classes |

`prefers-reduced-motion` disables the load-in, the reveals and the page fade.

## Showcase frame

Off by default: the site is a normal full-bleed page. Set `NEXT_PUBLIC_SHOWCASE_FRAME=true` to float it in a rounded window over the cloud photo on desktop, as in the reference. Phones and tablets are always full-bleed.
