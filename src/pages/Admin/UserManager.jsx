import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Search,
  Loader,
  X,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
} from 'lucide-react';

export default function UserManager() {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [editingItem, setEditingItem] = useState(null);
  const [selectedRole, setSelectedRole] = useState('editor');
  const [alertMsg, setAlertMsg] = useState(null);

  // Fetch all profiles
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Role mutation
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
      setEditingItem(null);
      triggerAlert('User role updated successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to update user role', 'error');
    },
  });

  const triggerAlert = (message, type = 'success') => {
    setAlertMsg({ message, type });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setSelectedRole(item.role);
  };

  const handleRoleSave = () => {
    if (!editingItem) return;
    if (editingItem.id === currentUser.id) {
      if (!window.confirm('You are editing your own role. Removing your Super Admin rights will lock you out of this page. Are you sure?')) {
        return;
      }
    }
    roleMutation.mutate({ id: editingItem.id, role: selectedRole });
  };

  const filteredItems = profiles.filter((item) =>
    item.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'admin':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    }
  };

  const formatRoleName = (role) => {
    return role
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-text-primary">Admin User Roles</h1>
        <p className="text-xs text-text-secondary">
          Super Admin Panel for controlling user roles and system privileges.
        </p>
      </div>

      {/* Alert */}
      {alertMsg && (
        <div
          className={`p-3 rounded-lg border text-xs ${
            alertMsg.type === 'error'
              ? 'bg-red-500/10 border-red-500/20 text-red-500'
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
          }`}
        >
          {alertMsg.message}
        </div>
      )}

      {/* Search Filter */}
      <div className="flex bg-bg-subtle border border-border p-4 rounded-xl">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/50">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder="Search users by email address..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input-field pl-10 py-2 text-xs"
          />
        </div>
      </div>

      {/* Table grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader size={24} className="animate-spin text-accent" />
          <span className="text-xs text-text-secondary">Loading profiles list...</span>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="bg-bg-subtle border border-border rounded-xl py-12 text-center text-xs text-text-secondary">
          No registered user profiles found.
        </div>
      ) : (
        <div className="bg-bg border border-border rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-subtle border-b border-border text-[10px] font-bold tracking-widest uppercase text-text-secondary">
                  <th className="px-6 py-4">User Email</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4">Registration Date</th>
                  <th className="px-6 py-4 text-right">Role Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-subtle/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-text-primary">
                      {item.email} {item.id === currentUser?.id && <span className="text-[10px] text-accent font-normal">(You)</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-0.5 border rounded-md text-[9px] font-bold uppercase ${getRoleBadge(item.role)}`}>
                        {formatRoleName(item.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
                      >
                        <UserCheck size={12} /> Adjust Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
              <span>
                Showing {(page - 1) * itemsPerPage + 1} to{' '}
                {Math.min(page * itemsPerPage, filteredItems.length)} of {filteredItems.length} entries
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-1 border border-border hover:bg-bg-subtle rounded disabled:opacity-45"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="p-1 border border-border hover:bg-bg-subtle rounded disabled:opacity-45"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-bg border border-border w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
            <div className="p-5 border-b border-border flex items-center justify-between bg-bg-subtle">
              <h3 className="font-headings font-bold text-sm text-text-primary flex items-center gap-1.5">
                <Shield size={16} className="text-accent" />
                Change User Role
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-text-secondary hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-xs text-text-secondary">
                <span className="block font-semibold uppercase tracking-wider text-[9px] mb-1">Target User</span>
                <span className="text-text-primary font-medium text-sm block truncate">{editingItem.email}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                  Select Role Assignment
                </label>
                <div className="space-y-2.5">
                  {[
                    { value: 'super_admin', label: 'Super Admin', desc: 'Full root access (CRUD, Roles, Logs)' },
                    { value: 'admin', label: 'Admin', desc: 'Full CRUD and Logs access (No role editing)' },
                    { value: 'editor', label: 'Editor', desc: 'Read/Write CRUD edits only (No delete or logs)' },
                  ].map((roleOption) => (
                    <label
                      key={roleOption.value}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedRole === roleOption.value
                          ? 'border-accent bg-accent/5'
                          : 'border-border bg-bg hover:bg-bg-subtle'
                      }`}
                    >
                      <input
                        type="radio"
                        name="user-role-select"
                        value={roleOption.value}
                        checked={selectedRole === roleOption.value}
                        onChange={() => setSelectedRole(roleOption.value)}
                        className="mt-0.5 text-accent border-border focus:ring-accent"
                      />
                      <div>
                        <span className="block text-xs font-bold text-text-primary">
                          {roleOption.label}
                        </span>
                        <span className="block text-[10px] text-text-secondary mt-0.5">
                          {roleOption.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3 bg-bg">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-border text-xs font-semibold rounded-lg hover:bg-bg-subtle transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRoleSave}
                  disabled={roleMutation.isPending}
                  className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5"
                >
                  {roleMutation.isPending ? (
                    <>
                      <Loader size={12} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    'Confirm Change'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
