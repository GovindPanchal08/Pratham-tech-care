import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  BarChart3,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  ToggleLeft,
  ToggleRight,
  Loader,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const statSchema = z.object({
  value: z.string().min(1, 'Display value is required (e.g. 500+ or 99.9%)'),
  label: z.string().min(3, 'Label must be at least 3 characters'),
  active: z.boolean().default(true),
});

export default function StatsManager() {
  const { isEditor, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  // Fetch Stats
  const { data: statsList = [], isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingItem) {
        const { data, error } = await supabase
          .from('stats')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id)
          .select();
        if (error) throw error;
        return data[0];
      } else {
        const { data, error } = await supabase
          .from('stats')
          .insert(payload)
          .select();
        if (error) throw error;
        return data[0];
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      setIsModalOpen(false);
      setEditingItem(null);
      triggerAlert(editingItem ? 'Stat updated successfully!' : 'Stat created successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to save stat', 'error');
    },
  });

  // Toggle active status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }) => {
      const { error } = await supabase
        .from('stats')
        .update({ active: !active, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      triggerAlert('Stat status updated successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to toggle status', 'error');
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('stats').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      triggerAlert('Stat deleted successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to delete stat', 'error');
    },
  });

  const triggerAlert = (message, type = 'success') => {
    setAlertMsg({ message, type });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(statSchema),
    defaultValues: {
      value: '',
      label: '',
      active: true,
    },
  });

  const handleOpenAdd = () => {
    reset({
      value: '',
      label: '',
      active: true,
    });
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    reset({
      value: item.value,
      label: item.label,
      active: item.active,
    });
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this stat? This action is logged.')) {
      deleteMutation.mutate(id);
    }
  };

  // Filter & Search
  const filteredItems = statsList.filter((item) => {
    const matchesSearch =
      item.value.toLowerCase().includes(search.toLowerCase()) ||
      item.label.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filterActive === 'all' ||
      (filterActive === 'active' && item.active) ||
      (filterActive === 'inactive' && !item.active);
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-text-primary">Manage Counters & Stats</h1>
          <p className="text-xs text-text-secondary">Configure company counter milestones displayed on the About page.</p>
        </div>
        {isEditor && (
          <button onClick={handleOpenAdd} className="btn-primary flex items-center gap-1.5 py-2 px-4 text-xs">
            <Plus size={16} />
            Add Stat
          </button>
        )}
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
      <div className="flex flex-col md:flex-row gap-3 bg-bg-subtle border border-border p-4 rounded-xl">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/50">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder="Search stats..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input-field pl-10 py-2"
          />
        </div>
        <select
          value={filterActive}
          onChange={(e) => {
            setFilterActive(e.target.value);
            setPage(1);
          }}
          className="px-3.5 py-2 text-xs font-semibold bg-bg border border-border rounded-lg text-text-secondary focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader size={24} className="animate-spin text-accent" />
          <span className="text-xs text-text-secondary">Loading statistics...</span>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="bg-bg-subtle border border-border rounded-xl py-12 text-center text-xs text-text-secondary">
          No stats found. Click "Add Stat" to create one.
        </div>
      ) : (
        <div className="bg-bg border border-border rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-subtle border-b border-border text-[10px] font-bold tracking-widest uppercase text-text-secondary">
                  <th className="px-6 py-4">Value</th>
                  <th className="px-6 py-4">Label</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-subtle/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-text-primary font-mono text-base text-accent">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{item.label}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => isEditor && toggleActiveMutation.mutate(item)}
                        disabled={!isEditor}
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          item.active ? 'text-emerald-500' : 'text-text-secondary'
                        }`}
                      >
                        {item.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                        {item.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isEditor && (
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 text-text-secondary hover:text-accent rounded hover:bg-bg-subtle transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                        {isAdmin && (
                          <button
                            onClick={() => onDelete(item.id)}
                            className="p-1.5 text-text-secondary hover:text-red-500 rounded hover:bg-red-500/5 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-bg border border-border w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border flex items-center justify-between bg-bg-subtle">
              <h3 className="font-headings font-bold text-sm text-text-primary">
                {editingItem ? 'Edit Counter Stat' : 'Add New Counter Stat'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                  Display Value
                </label>
                <input
                  type="text"
                  placeholder="e.g. 500+ or 99.9%"
                  className={`input-field text-xs py-2 ${errors.value ? 'border-red-500' : ''}`}
                  {...register('value')}
                />
                {errors.value && <p className="text-[10px] text-red-500 mt-1">{errors.value.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                  Stat Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Projects Delivered"
                  className={`input-field text-xs py-2 ${errors.label ? 'border-red-500' : ''}`}
                  {...register('label')}
                />
                {errors.label && <p className="text-[10px] text-red-500 mt-1">{errors.label.message}</p>}
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary cursor-pointer">
                  <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" {...register('active')} />
                  Publish as Active
                </label>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-border text-xs font-semibold rounded-lg hover:bg-bg-subtle transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader size={12} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    'Save Stat'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
