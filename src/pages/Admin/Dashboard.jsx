import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Server,
  Sliders,
  DollarSign,
  History,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function Dashboard() {
  const { profile, isAdmin } = useAuth();

  // Queries for dashboard stats
  const { data: servicesCount = 0, isLoading: loadingServices } = useQuery({
    queryKey: ['services-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: subServicesCount = 0, isLoading: loadingSubServices } = useQuery({
    queryKey: ['sub-services-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('infrastructure_services')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: plansCount = 0, isLoading: loadingPlans } = useQuery({
    queryKey: ['plans-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('support_plans')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return count || 0;
    },
  });



  const { data: recentLogs = [], isLoading: loadingLogs } = useQuery({
    queryKey: ['recent-logs'],
    queryFn: async () => {
      if (!isAdmin) return [];
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data || [];
    },
    enabled: isAdmin,
  });

  const stats = [
    { label: 'Services', value: servicesCount, loading: loadingServices, icon: Server, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', link: '/admin/services' },
    { label: 'Sub-Services', value: subServicesCount, loading: loadingSubServices, icon: Sliders, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20', link: '/admin/sub-services' },
    { label: 'Support Plans', value: plansCount, loading: loadingPlans, icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', link: '/admin/support-plans' },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting Banner */}
      <div className="relative overflow-hidden bg-bg-subtle border border-border rounded-2xl p-6 lg:p-8">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Welcome Back</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-text-primary">
              Hello, {profile?.email?.split('@')[0]}!
            </h1>
            <p className="text-sm text-text-secondary mt-1 max-w-xl">
              You are logged in as an authorized content editor. Use this portal to manage your services listings, sub-services capabilities, support tiers, and counter stats.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.link}
              className="group bg-bg-subtle hover:bg-bg border border-border hover:border-accent/30 rounded-xl p-5 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${stat.color}`}>
                  <Icon size={16} />
                </div>
                <ArrowRight size={14} className="text-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" />
              </div>
              <p className="text-xs text-text-secondary">{stat.label}</p>
              {stat.loading ? (
                <div className="w-12 h-6 bg-border/50 animate-pulse rounded mt-1" />
              ) : (
                <p className="font-headings font-bold text-2xl text-text-primary mt-1">
                  {stat.value}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Audits */}
        {isAdmin && (
          <div className="lg:col-span-2 bg-bg-subtle border border-border rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <History size={16} className="text-text-secondary" />
                  <h3 className="font-headings font-bold text-sm text-text-primary">
                    Recent Activity Logs
                  </h3>
                </div>
                <Link
                  to="/admin/audit-logs"
                  className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                >
                  View All
                  <ArrowRight size={12} />
                </Link>
              </div>

              {loadingLogs ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-10 bg-border/50 animate-pulse rounded" />
                  ))}
                </div>
              ) : recentLogs.length === 0 ? (
                <div className="text-center py-6 text-xs text-text-secondary">
                  No audit logs found. Write operations will populate audits automatically.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentLogs.map((log) => {
                    const actionColors = {
                      INSERT: 'bg-emerald-500/10 text-emerald-500',
                      UPDATE: 'bg-amber-500/10 text-amber-500',
                      DELETE: 'bg-red-500/10 text-red-500',
                    };
                    return (
                      <div key={log.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                        <div className="flex items-start gap-3 min-w-0">
                          <span
                            className={`px-1.5 py-0.5 rounded font-mono font-bold text-[9px] ${
                              actionColors[log.action] || 'bg-border text-text-secondary'
                            }`}
                          >
                            {log.action}
                          </span>
                          <div className="min-w-0">
                            <p className="text-text-primary font-medium truncate">
                              Modified <span className="font-mono text-accent">{log.table_name}</span>
                            </p>
                            <span className="text-[10px] text-text-secondary truncate block">
                              By: {log.performed_by_email || 'System'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-text-secondary shrink-0">
                          <Clock size={10} />
                          {new Date(log.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Shortcut Panel */}
        <div className="bg-bg-subtle border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-text-secondary" />
            <h3 className="font-headings font-bold text-sm text-text-primary">
              Management Actions
            </h3>
          </div>
          <div className="grid gap-2">
            <Link
              to="/admin/services"
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/30 bg-bg hover:bg-bg-subtle text-xs font-semibold transition-colors duration-150"
            >
              <span>Add New Service</span>
              <ArrowRight size={14} className="text-text-secondary" />
            </Link>
            <Link
              to="/admin/sub-services"
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/30 bg-bg hover:bg-bg-subtle text-xs font-semibold transition-colors duration-150"
            >
              <span>Configure Sub-services</span>
              <ArrowRight size={14} className="text-text-secondary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
