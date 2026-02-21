import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { axiosInstance } from '../axios';
import toast from 'react-hot-toast';

const emptyForm = { imageUrl: '', title: '', category: '' };

const AdminGallery = () => {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]         = useState(emptyForm);
  const [filterCat, setFilterCat] = useState('');

  const fetchItems = (category = '') => {
    setLoading(true);
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    axiosInstance.get(`/admin/gallery${query}`)
      .then((res) => setItems(res.data))
      .catch(() => toast.error('Failed to load gallery'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(filterCat); }, [filterCat]);

  const categories = [...new Set(items.map((i) => i.category).filter(Boolean))];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageUrl.trim()) {
      toast.error('Image URL is required');
      return;
    }
    setSaving(true);
    try {
      await axiosInstance.post('/admin/gallery', form);
      toast.success('Image added to gallery');
      setShowModal(false);
      setForm(emptyForm);
      fetchItems(filterCat);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image from gallery?')) return;
    setDeleting(id);
    try {
      await axiosInstance.delete(`/admin/gallery/${id}`);
      toast.success('Image deleted');
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch {
      toast.error('Failed to delete image');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Gallery</h2>
        <button
          onClick={() => { setForm(emptyForm); setShowModal(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCat('')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${filterCat === '' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${filterCat === cat ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">No images yet</h3>
          <p className="text-gray-500 text-sm mt-1">Add your first image using the button above.</p>
        </div>
      )}

      {/* Grid */}
      {!loading && items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title || 'Gallery image'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-2.5">
                {item.title && <p className="text-xs font-medium text-gray-700 truncate">{item.title}</p>}
                {item.category && <p className="text-[11px] text-blue-600 mt-0.5">{item.category}</p>}
              </div>
              {/* Delete overlay */}
              <button
                onClick={() => handleDelete(item._id)}
                disabled={deleting === item._id}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg disabled:opacity-50"
                aria-label="Delete image"
              >
                {deleting === item._id ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Add Image</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {form.imageUrl && (
                    <div className="mt-2 aspect-video rounded-xl overflow-hidden border border-gray-100">
                      <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Image title (optional)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Urban, Transport (optional)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading…
                      </>
                    ) : (
                      'Add to Gallery'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;
