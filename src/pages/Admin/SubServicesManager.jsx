import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Sliders,
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
} from 'lucide-react';

const subServiceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric and hyphens only'),
  icon: z.enum(['Network', 'Server', 'ShieldCheck', 'HardDrive', 'Activity', 'Headphones']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  active: z.boolean().default(true),
  specs: z.array(z.string().min(1, 'Spec cannot be empty')).min(1, 'Add at least one capability spec'),
});

const ICONS = ['Network', 'Server', 'ShieldCheck', 'HardDrive', 'Activity', 'Headphones'];

export default function SubServicesManager() {
  const { isEditor, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  // Fetch SubServices
  const { data: subServices = [], isLoading } = useQuery({
    queryKey: ['admin-sub-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('infrastructure_services')
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
          .from('infrastructure_services')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id)
          .select();
        if (error) throw error;
        return data[0];
      } else {
        const { data, error } = await supabase
          .from('infrastructure_services')
          .insert(payload)
          .select();
        if (error) throw error;
        return data[0];
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sub-services'] });
      setIsModalOpen(false);
      setEditingItem(null);
      triggerAlert(editingItem ? 'Sub-service updated successfully!' : 'Sub-service created successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to save sub-service', 'error');
    },
  });

  // Toggle status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }) => {
      const { error } = await supabase
        .from('infrastructure_services')
        .update({ active: !active, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sub-services'] });
      triggerAlert('Status updated successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to toggle status', 'error');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('infrastructure_services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sub-services'] });
      triggerAlert('Sub-service deleted successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to delete sub-service', 'error');
    },
  });

  const triggerAlert = (message, type = 'success') => {
    setAlertMsg({ message, type });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subServiceSchema),
    defaultValues: {
      title: '',
      slug: '',
      icon: 'Network',
      description: '',
      active: true,
      specs: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specs',
  });

  const handleOpenAdd = () => {
    reset({
      title: '',
      slug: '',
      icon: 'Network',
      description: '',
      active: true,
      specs: [''],
    });
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    reset({
      title: item.title,
      slug: item.slug,
      icon: item.icon,
      description: item.description,
      active: item.active,
      specs: item.specs,
    });
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSlugAutoFill = (e) => {
    if (!editingItem) {
      const title = e.target.value;
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setValue('slug', slug);
    }
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sub-service? This action is logged.')) {
      deleteMutation.mutate(id);
    }
  };

  // Filter & Search
  const filteredItems = subServices.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase());
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
          <h1 className="text-xl font-bold tracking-tight text-text-primary">Manage Sub-Services</h1>
          <p className="text-xs text-text-secondary">Configure capabilities listed on the IT Infrastructure page.</p>
        </div>
        {isEditor && (
          <button onClick={handleOpenAdd} className="btn-primary flex items-center gap-1.5 py-2 px-4 text-xs">
            <Plus size={16} />
            Add Sub-Service
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
            placeholder="Search sub-services..."
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
          <span className="text-xs text-text-secondary">Loading sub-services...</span>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="bg-bg-subtle border border-border rounded-xl py-12 text-center text-xs text-text-secondary">
          No sub-services found. Click "Add Sub-Service" to create one.
        </div>
      ) : (
        <div className="bg-bg border border-border rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-subtle border-b border-border text-[10px] font-bold tracking-widest uppercase text-text-secondary">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Icon</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-subtle/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-text-primary">{item.title}</td>
                    <td className="px-6 py-4 font-mono text-xs text-text-secondary">{item.slug}</td>
                    <td className="px-6 py-4 text-text-secondary font-mono text-xs">{item.icon}</td>
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
                {editingItem ? 'Edit Sub-Service' : 'Add New Sub-Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Server Deployment"
                    className={`input-field text-xs py-2 ${errors.title ? 'border-red-500' : ''}`}
                    {...register('title', { onChange: handleSlugAutoFill })}
                  />
                  {errors.title && <p className="text-[10px] text-red-500 mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. servers-deployment"
                    className={`input-field text-xs py-2 ${errors.slug ? 'border-red-500' : ''}`}
                    {...register('slug')}
                  />
                  {errors.slug && <p className="text-[10px] text-red-500 mt-1">{errors.slug.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Icon Name
                  </label>
                  <select
                    className="input-field text-xs py-2 text-text-primary bg-bg"
                    {...register('icon')}
                  >
                    {ICONS.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary cursor-pointer">
                    <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" {...register('active')} />
                    Publish as Active (Visible on Website)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail the technical implementation details..."
                  className={`input-field text-xs py-2 ${errors.description ? 'border-red-500' : ''}`}
                  {...register('description')}
                />
                {errors.description && <p className="text-[10px] text-red-500 mt-1">{errors.description.message}</p>}
              </div>

              {/* Specs dynamic list */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-border pb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Technical Specifications (Specs)
                  </label>
                  <button
                    type="button"
                    onClick={() => append('')}
                    className="inline-flex items-center gap-1 text-accent text-[11px] font-bold hover:underline"
                  >
                    <PlusCircle size={14} /> Add Spec
                  </button>
                </div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`Spec #${index + 1}`}
                      className={`input-field text-xs py-1.5 flex-1 ${
                        errors.specs?.[index] ? 'border-red-500' : ''
                      }`}
                      {...register(`specs.${index}`)}
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
                {errors.specs && !Array.isArray(errors.specs) && (
                  <p className="text-[10px] text-red-500">{errors.specs.message}</p>
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
                    'Save Sub-Service'
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
