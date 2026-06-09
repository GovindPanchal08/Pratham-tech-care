import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { uploadImage } from '../../services/storage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MessageSquare,
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
  Star,
  Upload,
  Image,
} from 'lucide-react';

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(2, 'Title/Role must be at least 2 characters'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  industry: z.string().min(2, 'Industry must be at least 2 characters'),
  avatar: z.string().min(1, 'Avatar (initials or image URL) is required'),
  rating: z.number().int().min(1).max(5),
  quote: z.string().min(15, 'Quote must be at least 15 characters long'),
  metric: z.string().min(2, 'Metric badge text is required'),
  active: z.boolean().default(true),
});

export default function TestimonialsManager() {
  const { isEditor, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');

  // Fetch Testimonials
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
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
          .from('testimonials')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id)
          .select();
        if (error) throw error;
        return data[0];
      } else {
        const { data, error } = await supabase
          .from('testimonials')
          .insert(payload)
          .select();
        if (error) throw error;
        return data[0];
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      setIsModalOpen(false);
      setEditingItem(null);
      setAvatarPreview('');
      triggerAlert(editingItem ? 'Testimonial updated successfully!' : 'Testimonial created successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to save testimonial', 'error');
    },
  });

  // Toggle status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }) => {
      const { error } = await supabase
        .from('testimonials')
        .update({ active: !active, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      triggerAlert('Testimonial status updated successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to toggle active status', 'error');
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      triggerAlert('Testimonial deleted successfully!', 'success');
    },
    onError: (err) => {
      triggerAlert(err.message || 'Failed to delete testimonial', 'error');
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
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      title: '',
      company: '',
      industry: '',
      avatar: '',
      rating: 5,
      quote: '',
      metric: '',
      active: true,
    },
  });

  const ratingValue = watch('rating');
  const avatarValue = watch('avatar');

  const handleOpenAdd = () => {
    reset({
      name: '',
      title: '',
      company: '',
      industry: '',
      avatar: '',
      rating: 5,
      quote: '',
      metric: '',
      active: true,
    });
    setEditingItem(null);
    setAvatarPreview('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    reset({
      name: item.name,
      title: item.title,
      company: item.company,
      industry: item.industry,
      avatar: item.avatar,
      rating: item.rating,
      quote: item.quote,
      metric: item.metric,
      active: item.active,
    });
    setEditingItem(item);
    setAvatarPreview(item.avatar.startsWith('http') ? item.avatar : '');
    setIsModalOpen(true);
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client testimonial? This action is logged.')) {
      deleteMutation.mutate(id);
    }
  };

  // Upload image handler
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadImage(file, 'avatars');
      setValue('avatar', url);
      setAvatarPreview(url);
      triggerAlert('Image uploaded successfully!', 'success');
    } catch (err) {
      triggerAlert(err.message || 'Failed to upload image', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Auto Initials helper
  const handleAutoInitials = () => {
    const name = watch('name');
    if (!name) return;
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    setValue('avatar', initials);
    setAvatarPreview('');
  };

  // Filters
  const filteredItems = testimonials.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.quote.toLowerCase().includes(search.toLowerCase());
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
          <h1 className="text-xl font-bold tracking-tight text-text-primary">Manage Testimonials</h1>
          <p className="text-xs text-text-secondary">View and modify client quotes and case metrics.</p>
        </div>
        {isEditor && (
          <button onClick={handleOpenAdd} className="btn-primary flex items-center gap-1.5 py-2 px-4 text-xs">
            <Plus size={16} />
            Add Testimonial
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
            placeholder="Search testimonials by name, company, or quote..."
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
          <span className="text-xs text-text-secondary">Loading testimonials...</span>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="bg-bg-subtle border border-border rounded-xl py-12 text-center text-xs text-text-secondary">
          No testimonials found. Click "Add Testimonial" to create one.
        </div>
      ) : (
        <div className="bg-bg border border-border rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-subtle border-b border-border text-[10px] font-bold tracking-widest uppercase text-text-secondary">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Metric Badge</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-subtle/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.avatar.startsWith('http') ? (
                          <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-headings font-bold text-accent text-xs shrink-0">
                            {item.avatar}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-text-primary">{item.name}</p>
                          <p className="text-[10px] text-text-secondary leading-snug">
                            {item.title}, {item.company} ({item.industry})
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-accent-subtle/40 border border-accent/10 text-accent">
                        {item.metric}
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
                {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Mehta"
                    className={`input-field text-xs py-2 ${errors.name ? 'border-red-500' : ''}`}
                    {...register('name')}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Client Job Title / Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CTO"
                    className={`input-field text-xs py-2 ${errors.title ? 'border-red-500' : ''}`}
                    {...register('title')}
                  />
                  {errors.title && <p className="text-[10px] text-red-500 mt-1">{errors.title.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Innovate Financial Services"
                    className={`input-field text-xs py-2 ${errors.company ? 'border-red-500' : ''}`}
                    {...register('company')}
                  />
                  {errors.company && <p className="text-[10px] text-red-500 mt-1">{errors.company.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Industry Verticals
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BFSI or Healthcare"
                    className={`input-field text-xs py-2 ${errors.industry ? 'border-red-500' : ''}`}
                    {...register('industry')}
                  />
                  {errors.industry && <p className="text-[10px] text-red-500 mt-1">{errors.industry.message}</p>}
                </div>
              </div>

              {/* Avatar Select / Upload */}
              <div className="border border-border rounded-xl p-4 bg-bg-subtle space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Avatar Configuration
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Preview avatar */}
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-border" />
                  ) : avatarValue ? (
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-headings font-bold text-accent text-sm uppercase">
                      {avatarValue}
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center text-text-secondary">
                      <Image size={20} />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Avatar Initials (e.g. RM) or Image URL"
                        className={`input-field text-xs py-1.5 ${errors.avatar ? 'border-red-500' : ''}`}
                        {...register('avatar')}
                      />
                      <button
                        type="button"
                        onClick={handleAutoInitials}
                        className="px-3 py-1.5 border border-border text-[10px] font-semibold bg-bg hover:bg-bg-subtle rounded-lg whitespace-nowrap transition-colors"
                      >
                        Auto Initials
                      </button>
                    </div>
                    {errors.avatar && <p className="text-[10px] text-red-500">{errors.avatar.message}</p>}

                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-border hover:border-accent bg-bg text-[10px] font-semibold text-text-secondary hover:text-accent rounded-lg transition-colors">
                        <Upload size={12} />
                        {uploadingImage ? 'Uploading...' : 'Upload Avatar Image'}
                        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating stars picker & Metric badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setValue('rating', star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={20}
                          className={star <= ratingValue ? 'fill-amber-400 text-amber-400' : 'text-text-secondary/35'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                    Metric Highlight Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 85% reduction in downtime"
                    className={`input-field text-xs py-2 ${errors.metric ? 'border-red-500' : ''}`}
                    {...register('metric')}
                  />
                  {errors.metric && <p className="text-[10px] text-red-500 mt-1">{errors.metric.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                  Client Quote / Feedback
                </label>
                <textarea
                  rows={4}
                  placeholder="Insert feedback copy here..."
                  className={`input-field text-xs py-2 ${errors.quote ? 'border-red-500' : ''}`}
                  {...register('quote')}
                />
                {errors.quote && <p className="text-[10px] text-red-500 mt-1">{errors.quote.message}</p>}
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary cursor-pointer">
                  <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" {...register('active')} />
                  Publish as Active (Visible on Website)
                </label>
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
                    'Save Testimonial'
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
