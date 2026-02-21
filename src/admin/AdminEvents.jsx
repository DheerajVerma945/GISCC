import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, CalendarDays, MapPin, Check } from 'lucide-react';
import { axiosInstance } from '../axios';
import toast from 'react-hot-toast';

const emptyForm = { title: '', description: '', date: '', venue: '', imageUrl: '', isActive: false };

const AdminEvents = () => {
  const [events, setEvents]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(null);

  const [showModal, setShowModal]   = useState(false);
  const [editingId, setEditingId]   = useState(null);
  const [form, setForm]             = useState(emptyForm);

  const fetchEvents = () => {
    setLoading(true);
    axiosInstance.get('/admin/events')
      .then((res) => setEvents(res.data))
      .catch(() => toast.error('Failed to load events'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEvents(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (event) => {
    setEditingId(event._id);
    setForm({
      title:       event.title       || '',
      description: event.description || '',
      date:        event.date ? event.date.substring(0, 10) : '',
      venue:       event.venue       || '',
      imageUrl:    event.imageUrl    || '',
      isActive:    event.isActive    || false,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.date) {
      toast.error('Title, description and date are required');
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await axiosInstance.put(`/admin/events/${editingId}`, form);
        toast.success('Event updated');
      } else {
        await axiosInstance.post('/admin/events', form);
        toast.success('Event created');
      }
      closeModal();
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setDeleting(id);
    try {
      await axiosInstance.delete(`/admin/events/${id}`);
      toast.success('Event deleted');
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch {
      toast.error('Failed to delete event');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Events</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && events.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">No events yet</h3>
          <p className="text-gray-500 text-sm mt-1">Create your first event using the button above.</p>
        </div>
      )}

      {/* Events Grid */}
      {!loading && events.length > 0 && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {event.imageUrl ? (
                <div className="aspect-video overflow-hidden">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <CalendarDays className="w-10 h-10 text-white/40" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-2 flex-1">{event.title}</h3>
                  <span className={`flex-shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${event.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {event.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{event.description}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  {event.venue && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {event.venue}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(event)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 text-xs font-medium transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    disabled={deleting === event._id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    {deleting === event._id ? (
                      <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
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
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingId ? 'Edit Event' : 'New Event'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Event title"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Event description"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Venue */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                  <input
                    type="text"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    placeholder="Event venue (optional)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg (optional)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* isActive */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setForm({ ...form, isActive: !form.isActive })}
                    className={`w-10 h-5.5 rounded-full transition-colors relative flex-shrink-0 ${form.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-all ${form.isActive ? 'left-5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Mark as Active</span>
                  {form.isActive && <Check className="w-4 h-4 text-blue-600" />}
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
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
                        Saving…
                      </>
                    ) : (
                      editingId ? 'Save Changes' : 'Create Event'
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

export default AdminEvents;
