import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Server,
  Sliders,
  DollarSign,
  MessageSquare,
  BarChart3,
  History,
  Users,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';

export default function AdminLayout() {
  const { profile, logout, isSuperAdmin, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Services', path: '/admin/services', icon: Server },
    { label: 'Sub-Services', path: '/admin/sub-services', icon: Sliders },
    { label: 'Support Plans', path: '/admin/support-plans', icon: DollarSign },
    { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { label: 'Stats', path: '/admin/stats', icon: BarChart3 },
  ];

  // Restrict access to these menus
  if (isAdmin) {
    menuItems.push({ label: 'Audit Logs', path: '/admin/audit-logs', icon: History });
  }
  if (isSuperAdmin) {
    menuItems.push({ label: 'User Roles', path: '/admin/users', icon: Users });
  }

  const roleLabel = () => {
    if (!profile?.role) return 'User';
    return profile.role
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  const getRoleColor = () => {
    switch (profile?.role) {
      case 'super_admin':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'admin':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-bg border-r border-border">
      {/* Brand */}
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          <Shield size={18} />
        </div>
        <div>
          <h2 className="font-headings font-bold text-sm text-text-primary leading-tight">
            Pratham Care
          </h2>
          <p className="text-[10px] text-text-secondary">Admin Console</p>
        </div>
      </div>

      {/* Nav Link List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 border ${
                  isActive
                    ? 'bg-accent/10 border-accent/20 text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-subtle'
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile & Logout */}
      <div className="p-4 border-t border-border bg-bg-subtle">
        <div className="flex items-center justify-between mb-4">
          <div className="truncate pr-2">
            <p className="text-xs font-semibold text-text-primary truncate">
              {profile?.email}
            </p>
            <span
              className={`inline-block text-[9px] font-bold tracking-widest uppercase border px-1.5 py-0.5 rounded-md mt-1 ${getRoleColor()}`}
            >
              {roleLabel()}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border bg-bg text-text-secondary hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5 rounded-lg text-xs font-semibold transition-all duration-150"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-bg border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <Shield className="text-accent" size={18} />
          <span className="font-headings font-bold text-sm text-text-primary">
            Pratham Care Admin
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded-lg bg-bg-subtle border border-border flex items-center justify-center text-text-secondary"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        className={`md:hidden fixed top-0 bottom-0 left-0 w-64 z-50 transition-transform duration-200 transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>

      {/* Main Panel Viewport */}
      <main className="flex-1 min-w-0 p-6 lg:p-10 bg-bg">
        <Outlet />
      </main>
    </div>
  );
}
