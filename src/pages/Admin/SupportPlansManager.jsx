import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  DollarSign,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  ToggleLeft,
  ToggleRight,
  PlusCircle,
  MinusCircle,
  Loader,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';

const supportPlanSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.string().min(1, 'Price is required'),
  period: z.string().default(''),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  highlight: z.boolean().default(false),
  active: z.boolean().default(true),
  features: z.array(z.string().min(1, 'Feature cannot be empty')).min(1, 'Add at least one feature bullet'),
});

export default function SupportPlansManager() {
  const { isEditor, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  // Fetch Support Plans
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ['admin-support-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('support_plans')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingItem) {
        const { data, error } = await supabase
          .from('support_plans')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id)
          .select();
        if (error) throw error;
        return data[0];
      } else {
        const { data, error } = await supabase
          .from('support_plans')
          .insert(payload)
          .select();
        if (error) throw error;
        return data[0];
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-support-plans'] });
      setIsModalOpen(false);
      setEditingItem(null);
      triggerAlert(editingItem ? 'Plan updated successfully!' : 'Plan created successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to save plan', 'error');
    },
  });

  // Toggle status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }) => {
      const { error } = await supabase
        .from('support_plans')
        .update({ active: !active, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-support-plans'] });
      triggerAlert('Plan status updated successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to update plan status', 'error');
    },
  });

  // Delete plan
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('support_plans').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-support-plans'] });
      triggerAlert('Support plan deleted successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to delete plan', 'error');
    },
  });

  const triggerAlert = (message, type = 'success') => {
    setAlertMsg({ message, type });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supportPlanSchema),
    defaultValues: {
      name: '',
      price: '',
      period: '/month',
      description: '',
      highlight: false,
      active: true,
      features: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features',
  });

  const handleOpenAdd = () => {
    reset({
      name: '',
      price: '',
      period: '/month',
      description: '',
      highlight: false,
      active: true,
      features: [''],
    });
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    reset({
      name: item.name,
      price: item.price,
      period: item.period,
      description: item.description,
      highlight: item.highlight,
      active: item.active,
      features: item.features,
    });
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this support plan tier? This action is logged.')) {
      deleteMutation.mutate(id);
    }
  };

  // Filters
  const filteredItems = plans.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
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
          <h1 className="text-xl font-bold tracking-tight text-text-primary">Manage Support Plans</h1>
          <p className="text-xs text-text-secondary">Configure service SLA tiers and subscription pricing plans.</p>
        </div>
        {isEditor && (
          <button onClick={handleOpenAdd} className="btn-primary flex items-center gap-1.5 py-2 px-4 text-xs">
            <Plus size={16} />
            Add Plan
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
            placeholder="Search support plans..."
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

      {/* Table grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader size={24} className="animate-spin text-accent" />
          <span className="text-xs text-text-secondary">Loading support plans...</span>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="bg-bg-subtle border border-border rounded-xl py-12 text-center text-xs text-text-secondary">
          No support plans found. Click "Add Plan" to create one.
        </div>
      ) : (
        <div className="bg-bg border border-border rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-subtle border-b border-border text-[10px] font-bold tracking-widest uppercase text-text-secondary">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Period</th>
                  <th className="px-6 py-4">Highlight</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-subtle/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-text-primary">
                      <div className="flex items-center gap-1.5">
                        {item.name}
                        {item.highlight && <Star size={12} className="fill-amber-400 text-amber-400" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-primary font-mono text-xs">{item.price}</td>
                    <td className="px-6 py-4 text-text-secondary text-xs">{item.period || 'N/A'}</td>
                    <td className="px-6 py-4 text-xs">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          item.highlight ? 'bg-amber-500/10 text-amber-500' : 'bg-bg-subtle text-text-secondary'
                        }`}
                      >
                        {item.highlight ? 'Popular' : 'Regular'}
                      </span>
                    </td>
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
          <div className="bg-bg border border-border w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border flex items-center justify-between bg-bg-subtle">
              <h3 className="font-headings font-bold text-sm text-text-primary">
                {editingItem ? 'Edit Support Plan' : 'Add New Support Plan'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gold"
                    className={`input-field text-xs py-2 ${errors.name ? 'border-red-500' : ''}`}
                    {...register('name')}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Price Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹75,000 or Custom"
                    className={`input-field text-xs py-2 ${errors.price ? 'border-red-500' : ''}`}
                    {...register('price')}
                  />
                  {errors.price && <p className="text-[10px] text-red-500 mt-1">{errors.price.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Billing Cycle Period
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /month (leave blank if custom)"
                    className={`input-field text-xs py-2 ${errors.period ? 'border-red-500' : ''}`}
                    {...register('period')}
                  />
                  {errors.period && <p className="text-[10px] text-red-500 mt-1">{errors.period.message}</p>}
                </div>

                <div className="flex flex-col justify-center pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary cursor-pointer mb-2">
                    <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" {...register('highlight')} />
                    Highlight as 'Most Popular'
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary cursor-pointer">
                    <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" {...register('active')} />
                    Publish as Active
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                  Plan Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Detail who this plan is tailored for..."
                  className={`input-field text-xs py-2 ${errors.description ? 'border-red-500' : ''}`}
                  {...register('description')}
                />
                {errors.description && <p className="text-[10px] text-red-500 mt-1">{errors.description.message}</p>}
              </div>

              {/* Specs dynamic list */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-border pb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Tier SLA Capabilities (Features)
                  </label>
                  <button
                    type="button"
                    onClick={() => append('')}
                    className="inline-flex items-center gap-1 text-accent text-[11px] font-bold hover:underline"
                  >
                    <PlusCircle size={14} /> Add Feature
                  </button>
                </div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`Feature #${index + 1}`}
                      className={`input-field text-xs py-1.5 flex-1 ${
                        errors.features?.[index] ? 'border-red-500' : ''
                      }`}
                      {...register(`features.${index}`)}
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-text-secondary hover:text-red-500 transition-colors"
                      >
                        <MinusCircle size={18} />
                      </button>
                    )}
                  </div>
                ))}
                {errors.features && !Array.isArray(errors.features) && (
                  <p className="text-[10px] text-red-500">{errors.features.message}</p>
                )}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3 bg-bg">
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
                    'Save Support Plan'
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
