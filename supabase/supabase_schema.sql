-- Pratham Tech Care - Supabase Database Schema & Seed Script

-- 1. Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text not null check (role in ('super_admin', 'admin', 'editor')) default 'editor',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.profiles enable row level security;

-- 2. Services
create table public.services (
  id uuid default gen_random_uuid() primary key,
  slug varchar unique not null,
  icon varchar not null,
  title varchar not null,
  short_desc text not null,
  description text not null,
  features text[] not null,
  color varchar not null,
  path varchar not null,
  active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.services enable row level security;

-- 3. Infrastructure Services
create table public.infrastructure_services (
  id uuid default gen_random_uuid() primary key,
  slug varchar unique not null,
  icon varchar not null,
  title varchar not null,
  description text not null,
  specs text[] not null,
  active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.infrastructure_services enable row level security;

-- 4. Support Plans
create table public.support_plans (
  id uuid default gen_random_uuid() primary key,
  name varchar not null,
  price varchar not null,
  period varchar not null,
  description text not null,
  features text[] not null,
  highlight boolean default false not null,
  active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.support_plans enable row level security;

-- 5. Testimonials
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  name varchar not null,
  title varchar not null,
  company varchar not null,
  industry varchar not null,
  avatar varchar not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  quote text not null,
  metric varchar not null,
  active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.testimonials enable row level security;

-- 6. Stats
create table public.stats (
  id uuid default gen_random_uuid() primary key,
  value varchar not null,
  label varchar not null,
  active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.stats enable row level security;

-- 7. Audit Logs
create table public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  table_name varchar not null,
  action varchar not null,
  record_id uuid not null,
  old_data jsonb,
  new_data jsonb,
  performed_by_id uuid references auth.users on delete set null,
  performed_by_email varchar,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.audit_logs enable row level security;

-- SECURITY HELPER FUNCTIONS
create or replace function public.get_my_role()
returns text as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer;

-- ROW LEVEL SECURITY POLICIES
create policy "Allow users to read their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Allow admin/super_admin to read all profiles" on public.profiles for select using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin'));
create policy "Allow super_admin to manage profiles" on public.profiles for all using (auth.role() = 'authenticated' and public.get_my_role() = 'super_admin');

-- Policies helper for standard tables
create policy "Public read active services" on public.services for select using (active = true);
create policy "Admins/Editors read all services" on public.services for select using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors write services" on public.services for insert with check (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors update services" on public.services for update using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins delete services" on public.services for delete using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin'));

create policy "Public read active infra services" on public.infrastructure_services for select using (active = true);
create policy "Admins/Editors read all infra services" on public.infrastructure_services for select using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors write infra services" on public.infrastructure_services for insert with check (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors update infra services" on public.infrastructure_services for update using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins delete infra services" on public.infrastructure_services for delete using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin'));

create policy "Public read active plans" on public.support_plans for select using (active = true);
create policy "Admins/Editors read all plans" on public.support_plans for select using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors write plans" on public.support_plans for insert with check (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors update plans" on public.support_plans for update using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins delete plans" on public.support_plans for delete using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin'));

create policy "Public read active testimonials" on public.testimonials for select using (active = true);
create policy "Admins/Editors read all testimonials" on public.testimonials for select using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors write testimonials" on public.testimonials for insert with check (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors update testimonials" on public.testimonials for update using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins delete testimonials" on public.testimonials for delete using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin'));

create policy "Public read active stats" on public.stats for select using (active = true);
create policy "Admins/Editors read all stats" on public.stats for select using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors write stats" on public.stats for insert with check (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins/Editors update stats" on public.stats for update using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Admins delete stats" on public.stats for delete using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin'));

create policy "Only admin/super_admin can read audit logs" on public.audit_logs for select using (auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin'));

-- FUNCTIONS & TRIGGERS
create or replace function public.handle_new_user()
returns trigger as $$
declare
  is_first_user boolean;
begin
  select count(*) = 0 into is_first_user from public.profiles;
  if is_first_user then
    insert into public.profiles (id, email, role) values (new.id, new.email, 'super_admin');
  else
    insert into public.profiles (id, email, role) values (new.id, new.email, 'editor');
  end if;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.log_audit_action()
returns trigger as $$
declare
  user_id uuid;
  user_email text;
begin
  user_id := auth.uid();
  user_email := auth.jwt() ->> 'email';
  insert into public.audit_logs (table_name, action, record_id, old_data, new_data, performed_by_id, performed_by_email)
  values (TG_TABLE_NAME, TG_OP, coalesce(NEW.id, OLD.id), case when TG_OP = 'INSERT' then null else to_jsonb(OLD) end, case when TG_OP = 'DELETE' then null else to_jsonb(NEW) end, user_id, user_email);
  if TG_OP = 'DELETE' then return OLD; else return NEW; end if;
end;
$$ language plpgsql security definer;

create trigger audit_services_trigger after insert or update or delete on public.services for each row execute procedure public.log_audit_action();
create trigger audit_infra_services_trigger after insert or update or delete on public.infrastructure_services for each row execute procedure public.log_audit_action();
create trigger audit_plans_trigger after insert or update or delete on public.support_plans for each row execute procedure public.log_audit_action();
create trigger audit_testimonials_trigger after insert or update or delete on public.testimonials for each row execute procedure public.log_audit_action();
create trigger audit_stats_trigger after insert or update or delete on public.stats for each row execute procedure public.log_audit_action();

-- STORAGE BUCKET
insert into storage.buckets (id, name, public) values ('uploads', 'uploads', true) on conflict (id) do nothing;
create policy "Allow public read access to uploads" on storage.objects for select using (bucket_id = 'uploads');
create policy "Allow authenticated users to upload to uploads" on storage.objects for insert with check (bucket_id = 'uploads' and auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Allow authenticated users to update uploads" on storage.objects for update using (bucket_id = 'uploads' and auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin', 'editor'));
create policy "Allow admin/super_admin to delete from uploads" on storage.objects for delete using (bucket_id = 'uploads' and auth.role() = 'authenticated' and public.get_my_role() in ('super_admin', 'admin'));

-- SEED MIGRATIONS
insert into public.services (slug, icon, title, short_desc, description, features, color, path) values
('infrastructure', 'Server', 'IT Infrastructure', 'End-to-end design, deployment, and management of enterprise IT infrastructure.', 'We architect and deploy robust IT infrastructure tailored to your business scale — from on-premise servers to hybrid environments. Our team handles everything from hardware procurement to ongoing infrastructure management.', ARRAY['Server design & deployment', 'Storage area networks (SAN/NAS)', 'Virtualization (VMware, Hyper-V)', 'Hardware procurement & lifecycle', 'Data center planning', 'Infrastructure monitoring'], 'brand', '/it-infrastructure'),
('managed', 'Settings', 'Managed IT Services', 'Proactive 24×7 IT management so your team can focus on core business.', 'Our managed services model delivers predictable IT costs, proactive monitoring, and rapid incident response. We act as your extended IT team, handling day-to-day operations and strategic planning.', ARRAY['24×7 NOC monitoring', 'Helpdesk & end-user support', 'Patch management', 'Incident & problem management', 'IT asset management', 'SLA-backed response times'], 'blue', '/services#managed'),
('networking', 'Network', 'Networking Solutions', 'High-performance enterprise networking from LAN to WAN and SD-WAN.', 'We design and implement secure, high-throughput networking solutions for enterprises of all sizes. From branch connectivity to campus networks, we deliver reliability and performance.', ARRAY['LAN/WAN architecture', 'SD-WAN deployment', 'Network segmentation & VLANs', 'Wi-Fi enterprise solutions', 'Firewall & UTM configuration', 'Network performance optimization'], 'cyan', '/services#networking'),
('security', 'Shield', 'Cybersecurity', 'Comprehensive security posture management and threat protection.', 'Protect your business from evolving cyber threats with our layered security approach. We implement, manage, and continuously improve your security posture across endpoints, networks, and data.', ARRAY['Security assessments & audits', 'Endpoint detection & response (EDR)', 'SIEM implementation', 'Zero Trust architecture', 'Compliance (ISO 27001, SOC 2)', 'Incident response planning'], 'red', '/services#security'),
('cloud', 'Cloud', 'Cloud Support', 'Cloud migration, optimization, and managed cloud operations.', 'Navigate your cloud journey with confidence. We help businesses migrate to, optimize, and govern cloud environments across AWS, Azure, and GCP — ensuring cost efficiency and operational excellence.', ARRAY['Cloud migration strategy', 'AWS / Azure / GCP management', 'Cost optimization', 'Cloud security & compliance', 'Disaster recovery & backup', 'Multi-cloud governance'], 'sky', '/services#cloud'),
('consulting', 'Briefcase', 'IT Consulting', 'Strategic technology advisory to align IT with business objectives.', 'Our senior consultants work closely with leadership teams to develop technology roadmaps, evaluate vendor solutions, and drive digital transformation initiatives that deliver measurable ROI.', ARRAY['IT strategy & roadmapping', 'Digital transformation advisory', 'Vendor evaluation & selection', 'Technology due diligence', 'IT budget planning', 'CTO-as-a-Service'], 'violet', '/services#consulting')
on conflict (slug) do nothing;

insert into public.infrastructure_services (slug, icon, title, description, specs) values
('network-setup', 'Network', 'Network Setup & Design', 'Structured cabling, switching, routing, and wireless infrastructure designed for performance and redundancy.', ARRAY['Cat6A / Fiber cabling', 'Cisco / Juniper switching', 'BGP/OSPF routing', 'Enterprise Wi-Fi 6']),
('servers', 'Server', 'Server Deployment', 'Physical and virtual server deployment, configuration, and ongoing management for any workload type.', ARRAY['Dell / HPE / Lenovo servers', 'Windows Server / Linux', 'VMware ESXi / Hyper-V', 'Clustering & HA']),
('security-infra', 'ShieldCheck', 'Security Infrastructure', 'Firewall deployment, IDS/IPS, VPN gateways, and security monitoring infrastructure to protect your perimeter.', ARRAY['FortiGate / Palo Alto', 'IDS/IPS deployment', 'SSL/TLS inspection', 'VPN & zero-trust']),
('hardware', 'HardDrive', 'Hardware Procurement', 'Authorized hardware sourcing from leading OEMs with full warranty support and lifecycle management.', ARRAY['Authorized reseller', 'Best-price procurement', 'Asset tagging & inventory', 'Warranty management']),
('infra-mgmt', 'Activity', 'Infrastructure Management', 'Continuous monitoring, patch management, and performance optimization for your entire infrastructure estate.', ARRAY['24×7 monitoring (PRTG/Zabbix)', 'Automated patching', 'Capacity planning', 'Performance reporting']),
('support', 'Headphones', 'Support Plans', 'Flexible support tiers from basic remote support to on-site dedicated engineers — scaled to your needs.', ARRAY['Bronze / Silver / Gold / Platinum', '4hr to NBD response SLA', 'Dedicated engineer options', 'Monthly reporting'])
on conflict (slug) do nothing;

insert into public.support_plans (name, price, period, description, features, highlight) values
('Bronze', '₹15,000', '/month', 'Remote support for small businesses.', ARRAY['Remote support (business hours)', 'Email & phone support', 'Monthly health check', 'Up to 10 devices', '24hr response SLA'], false),
('Silver', '₹35,000', '/month', 'Proactive managed support for growing teams.', ARRAY['Remote + 2 on-site visits/month', 'Business hours + evening support', 'Weekly health check', 'Up to 30 devices', '8hr response SLA', 'Patch management'], false),
('Gold', '₹75,000', '/month', 'Full managed services for enterprises.', ARRAY['24×7 remote support', 'Unlimited on-site visits', 'Daily monitoring', 'Up to 100 devices', '4hr response SLA', 'Patch & change management', 'Quarterly IT review'], true),
('Platinum', 'Custom', '', 'Dedicated team for large enterprises.', ARRAY['Dedicated on-site engineer', '24×7 NOC monitoring', 'Real-time alerting', 'Unlimited devices', '1hr response SLA', 'Full ITSM integration', 'Monthly executive reporting'], false);

insert into public.testimonials (name, title, company, industry, avatar, rating, quote, metric) values
('Rajesh Mehta', 'CTO', 'Innovate Financial Services', 'BFSI', 'RM', 5, 'Pratham Tech Care transformed our entire IT infrastructure in under 90 days. Their team''s expertise in network design and server virtualization helped us reduce downtime by 85% and cut infrastructure costs by 30%. They are not just a vendor — they are a strategic partner.', '85% reduction in downtime'),
('Priya Sharma', 'Director of Operations', 'MedCore Diagnostics', 'Healthcare', 'PS', 5, 'Migrating our clinical systems to a hybrid cloud environment was a complex undertaking. Pratham''s team executed flawlessly — zero data loss, minimal disruption, and a 40% improvement in application performance. Their project management was exceptional throughout.', '40% performance improvement'),
('Arjun Nair', 'VP Technology', 'LogiSwift Logistics', 'Logistics', 'AN', 5, 'We had a critical ransomware incident that threatened our operations. Pratham''s incident response team contained the threat within hours and had us fully operational in 48 hours — far exceeding our recovery objectives. Their cybersecurity practice is world-class.', '48hr full recovery from ransomware'),
('Sunita Verma', 'Head of IT', 'EduTech Global', 'Education', 'SV', 5, 'Pratham deployed a campus-wide Wi-Fi 6 network across 12 buildings for 5,000+ users. The planning, cable management, and configuration were impeccable. We haven''t had a single network outage in 18 months since deployment. Outstanding work.', '18 months zero network outages'),
('Vikram Desai', 'Managing Director', 'Apex Manufacturing', 'Manufacturing', 'VD', 5, 'We evaluated three IT firms before choosing Pratham. Their technical depth, transparent pricing, and commitment to SLAs made them stand out. 3 years later, they continue to exceed expectations. Our IT is no longer a concern — it''s a competitive advantage.', '3+ years trusted partnership'),
('Kavitha Krishnan', 'CFO', 'RetailMax India', 'Retail', 'KK', 5, 'Pratham''s managed IT services have been a game-changer for our multi-location retail operations. Centralized monitoring, rapid issue resolution, and predictable monthly costs have reduced our IT overhead by 45% while improving service quality.', '45% reduction in IT overhead');

insert into public.stats (value, label) values
('500+', 'Projects Delivered'),
('200+', 'Enterprise Clients'),
('99.9%', 'Average Uptime SLA'),
('12+', 'Years of Experience');
