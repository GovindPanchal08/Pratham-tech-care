# Pratham Tech Care — Enterprise IT Solutions Website

A production-ready, enterprise-grade company website built with React, Vite, Tailwind CSS, React Router, and Framer Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v6 (createBrowserRouter) |
| Animation | Framer Motion |
| Forms | React Hook Form |
| HTTP | Axios |
| SEO | React Helmet Async |
| Fonts | Syne (display) · DM Sans (body) · JetBrains Mono |

## Project Structure

```
src/
├── assets/            # Images, icons, fonts
├── components/
│   ├── common/        # SEOHead, SectionHeader, PageHero
│   ├── forms/         # Reusable form inputs
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # CTABanner, shared sections
│   └── ui/            # Icon (inline SVG system)
├── constants/         # ALL content — edit here to update the site
│   ├── siteConfig.js  # Company name, phone, email, address, social
│   ├── navigation.js  # Nav + footer links
│   ├── services.js    # Services, infrastructure, support plans
│   ├── testimonials.js
│   ├── clients.js     # Client list, industries, case studies
│   ├── contact.js     # Contact info, form field config
│   ├── theme.js       # Why choose us, tech stack, design tokens
│   └── seo.js         # Per-page SEO metadata
├── layouts/           # MainLayout (Navbar + Outlet + Footer)
├── pages/             # Home, About, Services, ITInfrastructure,
│   │                  # Clients, Testimonials, Contact, NotFound
├── routes/            # Lazy-loaded router (createBrowserRouter)
└── services/          # contactService.js (Axios API layer)
```

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

## Customising Content

All site content is driven through `src/constants/`. No component contains hardcoded strings.

| File | Controls |
|---|---|
| `siteConfig.js` | Company name, phone, email, address, social links |
| `services.js` | Service cards, features, support plan pricing |
| `testimonials.js` | Client quotes, stats |
| `clients.js` | Client logos, industries, case studies |
| `theme.js` | Why-choose-us bullets, tech stack categories |
| `seo.js` | Meta title/description per page |

## Connecting the Contact Form

In `src/services/contactService.js`, replace the `DEV` simulation block with your real API endpoint:

```js
const response = await api.post('/contact', data);
return response.data;
```

Set `VITE_API_URL` in `.env` to point to your backend.

## Performance

Production build output (gzip):
- `vendor` (React): ~56 kB
- `router`: ~32 kB  
- `motion` (Framer): ~41 kB
- Per-page chunks: 1–4 kB each

All pages are lazy-loaded via `React.lazy()` with a Suspense fallback.

## SEO

- React Helmet Async with per-page title, description, OG tags, Twitter cards
- JSON-LD Organization structured data on every page
- `public/sitemap.xml` — update URLs before deployment
- `public/robots.txt`
- Semantic HTML5 throughout
- ARIA labels on interactive elements
"# Pratham-tech-care" 
