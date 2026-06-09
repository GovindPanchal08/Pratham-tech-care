# Pratham Tech Care — Enterprise IT Solutions Website

A production-ready, enterprise-grade company website built with **React 19**, **Vite**, **Tailwind CSS**, **Supabase**, and **Framer Motion**. Features a full CMS admin panel with role-based access control, audit logging, and real-time Supabase integration.

---

## 🛠 Tech Stack

| Layer           | Technology                                      |
| --------------- | ----------------------------------------------- |
| Framework       | React 19 + Vite 8                               |
| Styling         | Tailwind CSS v3                                 |
| Routing         | React Router DOM v7 (`createBrowserRouter`)     |
| Animation       | Framer Motion                                   |
| Backend / DB    | Supabase (PostgreSQL + Auth + Storage + RLS)    |
| State / Caching | TanStack React Query v5                         |
| Forms           | React Hook Form + Zod validation                |
| HTTP            | Axios (contact form only)                       |
| SEO             | React Helmet Async                              |
| Icons           | Lucide React + React Icons                      |
| Fonts           | Syne (display) · DM Sans (body) · JetBrains Mono |

---

## 📁 Project Structure / Folder Structure

```
pratham-tech-care/
│
├── 📄 .env                          # Environment variables (Supabase URL + Anon Key)
├── 📄 .gitignore                    # Git ignore rules
├── 📄 .prettierrc                   # Prettier code formatting config
├── 📄 eslint.config.js              # ESLint configuration
├── 📄 index.html                    # HTML entry point
├── 📄 package.json                  # Dependencies & scripts
├── 📄 postcss.config.js             # PostCSS config (Tailwind)
├── 📄 tailwind.config.js            # Tailwind CSS configuration + themes
├── 📄 vite.config.js                # Vite bundler configuration
│
├── 📂 public/                       # Static assets served as-is
│   ├── favicon.svg                  # Browser tab icon
│   ├── icons.svg                    # SVG sprite sheet
│   ├── robots.txt                   # Search engine crawl rules
│   └── sitemap.xml                  # SEO sitemap
│
├── 📂 supabase/                     # Supabase database setup
│   ├── supabase_schema.sql          # ⭐ MASTER SCHEMA: tables + RLS + triggers + seed data
│   ├── 📂 migrations/              # SQL migration files
│   │   ├── 20260609163645_new-migration.sql
│   │   └── 20260609165113_initial_schema.sql
│   └── 📂 .temp/                   # Temporary supabase files
│
├── 📂 dist/                         # Production build output (auto-generated)
│
└── 📂 src/                          # ⭐ APPLICATION SOURCE CODE
    │
    ├── 📄 main.jsx                  # App entry point (React root + QueryClient)
    ├── 📄 App.jsx                   # Root component (providers + router)
    ├── 📄 App.css                   # Global app styles
    ├── 📄 index.css                 # Base CSS + Tailwind directives + theme tokens
    │
    ├── 📂 assets/                   # Static images & SVGs
    │   ├── hero.png                 # Homepage hero image
    │   ├── react.svg
    │   └── vite.svg
    │
    ├── 📂 components/               # Reusable UI components
    │   ├── 📂 common/              # Shared utility components
    │   │   ├── PageHero.jsx         # Page header/hero banner
    │   │   ├── ProtectedRoute.jsx   # Auth guard (redirects unauthenticated users)
    │   │   ├── SEOHead.jsx          # Per-page SEO meta tags
    │   │   └── SectionHeader.jsx    # Reusable section title + subtitle
    │   ├── 📂 forms/               # Form input components
    │   ├── 📂 layout/              # Navbar + Footer
    │   ├── 📂 sections/            # Shared page sections
    │   │   └── CTABanner.jsx        # Call-to-action banner
    │   └── 📂 ui/                  # UI utilities
    │       └── ThemeSwitcher.jsx    # Multi-theme switcher widget
    │
    ├── 📂 constants/                # ⭐ ALL STATIC CONTENT (fallback when DB empty)
    │   ├── siteConfig.js            # Company info: name, phone, email, address, social
    │   ├── navigation.js            # Navbar + footer link definitions
    │   ├── services.js              # Services, infrastructure services, support plans
    │   ├── testimonials.js          # Client testimonials
    │   ├── clients.js               # Client logos, industries, case studies
    │   ├── contact.js               # Contact info, form fields
    │   ├── theme.js                 # Why-choose-us, tech stack, design tokens
    │   └── seo.js                   # Per-page SEO metadata (title, description, OG)
    │
    ├── 📂 context/                  # React Context providers
    │   ├── AuthContext.jsx          # ⭐ Supabase auth state (login, logout, roles)
    │   └── ThemeContext.jsx         # Theme switching (5 built-in themes)
    │
    ├── 📂 layouts/                  # Page layout wrappers
    │   ├── MainLayout.jsx           # Public site layout (Navbar + content + Footer)
    │   └── AdminLayout.jsx          # Admin panel layout (sidebar + content)
    │
    ├── 📂 pages/                    # ⭐ PAGE COMPONENTS
    │   ├── 📂 Home/                 # Homepage (hero, services, testimonials, clients)
    │   │   └── index.jsx
    │   ├── 📂 About/               # About us page
    │   │   └── index.jsx
    │   ├── 📂 Services/            # Services listing (fetches from Supabase)
    │   │   └── index.jsx
    │   ├── 📂 ITInfrastructure/    # IT Infrastructure detail page
    │   │   └── index.jsx
    │   ├── 📂 Clients/             # Our clients page
    │   │   └── index.jsx
    │   ├── 📂 Testimonials/        # Testimonials page
    │   │   └── index.jsx
    │   ├── 📂 Contact/             # Contact form page
    │   │   └── index.jsx
    │   ├── 📂 NotFound/            # 404 error page
    │   │   └── index.jsx
    │   └── 📂 Admin/               # ⭐ ADMIN CMS PANEL
    │       ├── Login.jsx            # Admin login page (/admin/login)
    │       ├── Dashboard.jsx        # Admin dashboard with stats overview
    │       ├── ServicesManager.jsx   # CRUD for services
    │       ├── SubServicesManager.jsx # CRUD for infrastructure services
    │       ├── SupportPlansManager.jsx # CRUD for support plans
    │       ├── TestimonialsManager.jsx # CRUD for testimonials
    │       ├── StatsManager.jsx     # CRUD for homepage stats counters
    │       ├── AuditLogsViewer.jsx  # View audit trail (admin/super_admin only)
    │       └── UserManager.jsx      # Manage user roles (super_admin only)
    │
    ├── 📂 routes/                   # Router configuration
    │   └── index.jsx                # All routes (lazy-loaded + protected)
    │
    └── 📂 services/                 # API & data services
        ├── supabase.js              # Supabase client initialization
        ├── contactService.js        # Contact form API (Axios)
        └── storage.js               # Supabase storage helpers
```

---

## 🔄 Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        ENTRY POINT                              │
│  index.html → main.jsx → QueryClientProvider → App.jsx          │
│                                                                 │
│  App.jsx wraps everything in:                                   │
│  HelmetProvider → ThemeProvider → AuthProvider → AppRouter       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
          PUBLIC ROUTES              ADMIN ROUTES
          (MainLayout)           (ProtectedRoute + AdminLayout)
                  │                         │
    ┌─────────────┼───────────┐    ┌────────┼──────────────┐
    │    │    │    │    │      │    │        │              │
  Home About Svcs Infra ...  404  Login  Dashboard    Managers
                  │                         │              │
         ┌────────┴────────┐       ┌────────┴──────┐       │
         │                 │       │               │       │
   Static Data       Supabase    Supabase     Profile   CRUD Ops
   (constants/)      Query       Auth         Fetch     (Supabase)
                     (fallback                │
                      to static)         Role Check
                                    (super_admin/admin/editor)
```

### Data Flow

1. **Public pages** use `@tanstack/react-query` to fetch data from Supabase
2. If Supabase is not configured or returns no data, pages **fall back to static data** from `src/constants/`
3. **Admin pages** require authentication via Supabase Auth
4. All admin data mutations trigger **audit log entries** automatically via database triggers

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) project

### Installation

```bash
# Clone the repository
git clone https://github.com/GovindPanchal08/Pratham-tech-care.git
cd pratham-tech-care

# Install dependencies
npm install

# Start development server
npm run dev        # → http://localhost:5173
```

### Build & Preview

```bash
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

---

## ⚡ Supabase Setup (Database + Auth)

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your **Project URL** and **Anon/Public API Key** from:
   `Settings → API → Project URL` and `Project API Keys → anon/public`

### Step 2: Configure Environment Variables

Update your `.env` file:

```env
VITE_API_URL=/api
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3: Run the Database Schema

1. Go to your Supabase Dashboard → **SQL Editor**
2. Copy the **entire contents** of `supabase/supabase_schema.sql`
3. Paste it into the SQL Editor and click **Run**

This single SQL file does everything:
- ✅ Creates all 7 database tables (profiles, services, infrastructure_services, support_plans, testimonials, stats, audit_logs)
- ✅ Enables Row Level Security (RLS) on all tables
- ✅ Creates security policies for public read + authenticated write
- ✅ Creates the `handle_new_user()` trigger (auto-creates profile on signup)
- ✅ Creates audit logging triggers for all content tables
- ✅ Creates the storage bucket for file uploads
- ✅ Seeds all tables with initial sample data

### Step 4: Verify Tables Were Created

In Supabase Dashboard → **Table Editor**, you should see these tables:

| Table                      | Purpose                                |
| -------------------------- | -------------------------------------- |
| `profiles`                 | User profiles with roles               |
| `services`                 | Main service cards (6 seeded)          |
| `infrastructure_services`  | IT Infrastructure sub-services         |
| `support_plans`            | Bronze/Silver/Gold/Platinum plans      |
| `testimonials`             | Client testimonials (6 seeded)         |
| `stats`                    | Homepage counter stats (4 seeded)      |
| `audit_logs`               | Automatic audit trail for all changes  |

---

## 🔐 Admin Panel Login

### How to Create Your Admin Account

The app uses **Supabase Auth** — there are no hardcoded credentials. You need to create a user:

#### Option A: Via Supabase Dashboard (Recommended)

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: `admin@prathamtechcare.com` (or your email)
   - **Password**: Choose a strong password (min 6 characters)
   - **Auto Confirm User**: ✅ Toggle ON (important!)
4. Click **Create user**

#### Option B: Via SQL (if trigger already exists)

```sql
-- You can also invite a user via Supabase Auth API
-- The handle_new_user() trigger will auto-create their profile
```

### First User = Super Admin

The database has a smart trigger: **the very first user who signs up automatically gets the `super_admin` role**. All subsequent users get the `editor` role by default.

So after running the schema:
1. Create ONE user (that becomes `super_admin`)
2. Any additional users will be `editor` by default
3. The `super_admin` can promote users via the **User Roles** page in the admin panel

### Accessing the Admin Panel

1. Start your dev server: `npm run dev`
2. Navigate to: **http://localhost:5173/admin/login**
3. Enter the email and password you created in Supabase
4. You'll be redirected to the admin dashboard

### Role Permissions

| Role          | Can View  | Can Edit  | Can Delete | User Mgmt | Audit Logs |
| ------------- | --------- | --------- | ---------- | --------- | ---------- |
| `super_admin` | ✅ All    | ✅ All    | ✅ All     | ✅ Yes    | ✅ Yes     |
| `admin`       | ✅ All    | ✅ All    | ✅ All     | ❌ No     | ✅ Yes     |
| `editor`      | ✅ All    | ✅ All    | ❌ No      | ❌ No     | ❌ No      |

---

## 🔍 Troubleshooting: "Not Getting Data from Supabase"

If your website shows data from constants (static) instead of Supabase, check these common issues:

### 1. Schema Not Executed

**Problem**: Tables don't exist in Supabase.

**Fix**: Run the full `supabase/supabase_schema.sql` in Supabase SQL Editor.

### 2. RLS Policies Blocking Reads

**Problem**: Tables exist but are empty when queried.

**Fix**: The schema includes `active = true` policies for public reads. Verify:
```sql
-- Check if policies exist
SELECT * FROM pg_policies WHERE tablename = 'services';
```

If no policies show up, re-run the RLS policy section from the schema.

### 3. `.env` Not Loaded

**Problem**: `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` is empty/wrong.

**Fix**:
- Ensure `.env` is at the project root (not inside `src/`)
- Variable names MUST start with `VITE_` for Vite to expose them
- Restart the dev server after changing `.env`

### 4. `isSupabaseConfigured()` Returns False

The app checks if Supabase is configured before making any queries. Open browser DevTools → Console and check for warnings. The check is in `src/services/supabase.js`:

```js
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL');
};
```

### 5. Seed Data Not Inserted

**Problem**: Tables exist but have no rows.

**Fix**: The seed `INSERT` statements are at the bottom of `supabase_schema.sql`. They use `ON CONFLICT ... DO NOTHING` — so they won't duplicate if run again. Re-run the schema.

### 6. How the Fallback Works

The Services page (and others) follow this pattern:
```js
const { data: services = [] } = useQuery({...});
const servicesToRender = services.length > 0 ? services : STATIC_SERVICES;
```

If Supabase returns data → renders from DB.  
If Supabase returns empty → renders from `src/constants/`.

---

## 🎨 Themes

The site includes 5 built-in themes, switchable via the floating theme picker:

| Theme            | Style              |
| ---------------- | ------------------ |
| Cloud White      | Clean, corporate   |
| Midnight Navy    | Dark, premium      |
| Slate Pro        | Dark neutral       |
| Forest Trust     | Calm, eco-friendly |
| Warm Enterprise  | Warm, approachable |

---

## 🗺 Route Map

### Public Routes

| Path                 | Page               |
| -------------------- | ------------------ |
| `/`                  | Homepage           |
| `/about`             | About Us           |
| `/services`          | All Services       |
| `/it-infrastructure` | IT Infrastructure  |
| `/clients`           | Our Clients        |
| `/testimonials`      | Client Testimonials|
| `/contact`           | Contact Form       |

### Admin Routes (Protected)

| Path                      | Page                 | Access            |
| ------------------------- | -------------------- | ----------------- |
| `/admin/login`            | Login Page           | Public            |
| `/admin`                  | Dashboard            | All authenticated |
| `/admin/services`         | Manage Services      | All authenticated |
| `/admin/sub-services`     | Manage Sub-Services  | All authenticated |
| `/admin/support-plans`    | Manage Support Plans | All authenticated |
| `/admin/testimonials`     | Manage Testimonials  | All authenticated |
| `/admin/stats`            | Manage Stats         | All authenticated |
| `/admin/audit-logs`       | View Audit Logs      | admin, super_admin|
| `/admin/users`            | Manage User Roles    | super_admin only  |

---

## 📊 Database Schema (ERD)

```
┌──────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│     profiles     │     │      services         │     │  support_plans  │
├──────────────────┤     ├──────────────────────┤     ├─────────────────┤
│ id (FK→auth.users)│    │ id (UUID PK)          │     │ id (UUID PK)    │
│ email            │     │ slug (unique)         │     │ name            │
│ role             │     │ icon, title           │     │ price, period   │
│ created_at       │     │ short_desc, description│    │ description     │
└──────────────────┘     │ features[], color, path│    │ features[]      │
                         │ active, timestamps     │    │ highlight       │
                         └──────────────────────┘     │ active          │
                                                       └─────────────────┘
┌──────────────────────────┐  ┌─────────────────┐  ┌─────────────────────┐
│ infrastructure_services  │  │   testimonials  │  │      stats          │
├──────────────────────────┤  ├─────────────────┤  ├─────────────────────┤
│ id (UUID PK)             │  │ id (UUID PK)    │  │ id (UUID PK)        │
│ slug (unique)            │  │ name, title     │  │ value, label        │
│ icon, title              │  │ company         │  │ active              │
│ description              │  │ industry, avatar│  │ timestamps          │
│ specs[]                  │  │ rating, quote   │  └─────────────────────┘
│ active, timestamps       │  │ metric          │
└──────────────────────────┘  │ active          │  ┌─────────────────────┐
                              └─────────────────┘  │    audit_logs       │
                                                    ├─────────────────────┤
                                                    │ id (UUID PK)        │
                                                    │ table_name, action  │
                                                    │ record_id           │
                                                    │ old_data, new_data  │
                                                    │ performed_by_id/email│
                                                    │ created_at          │
                                                    └─────────────────────┘
```

---

## ⚙️ Performance

- All pages are **lazy-loaded** via `React.lazy()` with Suspense fallback
- Data cached via **React Query** (no refetch on window focus, 1 retry)
- **Code splitting** per route for minimal initial bundle
- Tailwind CSS **purges** unused styles in production

---

## 📝 Customising Content

### Via Admin Panel (Recommended)
Log in at `/admin/login` and use the CMS to manage all content in real-time.

### Via Constants (Fallback)
If Supabase is not set up, edit files in `src/constants/`:

| File              | Controls                                          |
| ----------------- | ------------------------------------------------- |
| `siteConfig.js`   | Company name, phone, email, address, social links |
| `services.js`     | Service cards, features, support plan pricing     |
| `testimonials.js` | Client quotes, stats                              |
| `clients.js`      | Client logos, industries, case studies             |
| `theme.js`        | Why-choose-us bullets, tech stack categories      |
| `seo.js`          | Meta title/description per page                   |

---

## 🔗 Connecting the Contact Form

In `src/services/contactService.js`, replace the `DEV` simulation block with your real API endpoint:

```js
const response = await api.post('/contact', data);
return response.data;
```

Set `VITE_API_URL` in `.env` to point to your backend.

---

## 📄 License

MIT © Pratham Tech Care
