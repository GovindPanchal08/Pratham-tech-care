import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Server,
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
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric and hyphens only'),
  icon: z.enum(['Server', 'Settings', 'Network', 'Shield', 'Cloud', 'Briefcase']),
  short_desc: z.string().min(10, 'Short description must be at least 10 characters'),
  description: z.string().min(20, 'Full description must be at least 20 characters'),
  color: z.enum(['brand', 'blue', 'cyan', 'red', 'sky', 'violet']),
  path: z.string().min(1, 'Path is required'),
  active: z.boolean().default(true),
  features: z.array(z.string().min(1, 'Feature cannot be empty')).min(1, 'Add at least one feature'),
});

const ICONS = ['Server', 'Settings', 'Network', 'Shield', 'Cloud', 'Briefcase'];
const COLORS = ['brand', 'blue', 'cyan', 'red', 'sky', 'violet'];

export default function ServicesManager() {
  const { isEditor, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('all'); // all, active, inactive
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  // Fetch Services
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Create or Update mutation
  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingItem) {
        const { data, error } = await supabase
          .from('services')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id)
          .select();
        if (error) throw error;
        return data[0];
      } else {
        const { data, error } = await supabase
          .from('services')
          .insert(payload)
          .select();
        if (error) throw error;
        return data[0];
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setIsModalOpen(false);
      setEditingItem(null);
      triggerAlert(editingItem ? 'Service updated successfully!' : 'Service created successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to save service', 'error');
    },
  });

  // Toggle status mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }) => {
      const { error } = await supabase
        .from('services')
        .update({ active: !active, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      triggerAlert('Status toggled successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to toggle status', 'error');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      triggerAlert('Service deleted successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to delete service', 'error');
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
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      slug: '',
      icon: 'Server',
      short_desc: '',
      description: '',
      color: 'brand',
      path: '',
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
      title: '',
      slug: '',
      icon: 'Server',
      short_desc: '',
      description: '',
      color: 'brand',
      path: '',
      active: true,
      features: [''],
    });
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    reset({
      title: item.title,
      slug: item.slug,
      icon: item.icon,
      short_desc: item.short_desc,
      description: item.description,
      color: item.color,
      path: item.path,
      active: item.active,
      features: item.features,
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
      setValue('path', `/services#${slug}`);
    }
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service? This action is permanent and logged.')) {
      deleteMutation.mutate(id);
    }
  };

  // Searching and Filtering
  const filteredItems = services.filter((item) => {
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
          <h1 className="text-xl font-bold tracking-tight text-text-primary">Manage Services</h1>
          <p className="text-xs text-text-secondary">Create and edit offerings displayed on the website.</p>
        </div>
        {isEditor && (
          <button onClick={handleOpenAdd} className="btn-primary flex items-center gap-1.5 py-2 px-4 text-xs">
            <Plus size={16} />
            Add Service
          </button>
        )}
      </div>

      {/* Alert Banner */}
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

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 bg-bg-subtle border border-border p-4 rounded-xl">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/50">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder="Search by title or slug..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input-field pl-10 py-2"
          />
        </div>
        <div className="flex gap-2">
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
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader size={24} className="animate-spin text-accent" />
          <span className="text-xs text-text-secondary">Loading services list...</span>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="bg-bg-subtle border border-border rounded-xl py-12 text-center text-xs text-text-secondary">
          No services found. Click "Add Service" to create one.
        </div>
      ) : (
        <div className="bg-bg border border-border rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-subtle border-b border-border text-[10px] font-bold tracking-widest uppercase text-text-secondary">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Color</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-subtle/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 font-semibold text-text-primary">
                        <span className="text-accent">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-text-secondary">{item.slug}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-bg-subtle border border-border text-text-secondary uppercase">
                        {item.color}
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
          <div className="bg-bg border border-border w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-bg-subtle">
              <h3 className="font-headings font-bold text-sm text-text-primary">
                {editingItem ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            {/* Form Scrollable */}
            <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IT Consulting"
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
                    placeholder="e.g. it-consulting"
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

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Theme Color
                  </label>
                  <select
                    className="input-field text-xs py-2 text-text-primary bg-bg"
                    {...register('color')}
                  >
                    {COLORS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Navigation Path
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /services#consulting"
                    className={`input-field text-xs py-2 ${errors.path ? 'border-red-500' : ''}`}
                    {...register('path')}
                  />
                  {errors.path && <p className="text-[10px] text-red-500 mt-1">{errors.path.message}</p>}
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
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summarize the service in one sentence..."
                  className={`input-field text-xs py-2 ${errors.short_desc ? 'border-red-500' : ''}`}
                  {...register('short_desc')}
                />
                {errors.short_desc && <p className="text-[10px] text-red-500 mt-1">{errors.short_desc.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                  Full Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail the service scope, processes, values..."
                  className={`input-field text-xs py-2 ${errors.description ? 'border-red-500' : ''}`}
                  {...register('description')}
                />
                {errors.description && <p className="text-[10px] text-red-500 mt-1">{errors.description.message}</p>}
              </div>

              {/* Dynamic Feature List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-border pb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Key Capabilities (Bullets)
                  </label>
                  <button
                    type="button"
                    onClick={() => append('')}
                    className="inline-flex items-center gap-1 text-accent text-[11px] font-bold hover:underline"
                  >
                    <PlusCircle size={14} /> Add Bullet
                  </button>
                </div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`Bullet #${index + 1}`}
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

              {/* Action Buttons */}
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
                    'Save Service'
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
