import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, X } from 'lucide-react';
import { axiosInstance } from '../axios';
import useSEO from '../useSEO';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
    <div className="aspect-square bg-gray-200 animate-pulse" />
    <div className="p-3">
      <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
    </div>
  </div>
);

const Gallery = () => {
  const [items, setItems]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeCategory, setCategory] = useState('');
  const [lightbox, setLightbox]       = useState(null);

  useSEO({
    title: 'Gallery',
    description: 'Browse our project gallery — infrastructure highlights from Garvita Infrastructure.',
  });

  useEffect(() => {
    const query = activeCategory ? `?category=${encodeURIComponent(activeCategory)}` : '';
    setLoading(true);
    axiosInstance.get(`/admin/gallery${query}`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error('Error fetching gallery:', err))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const categories = [...new Set(items.map((i) => i.category).filter(Boolean))];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="relative bg-[#0a1628] text-white pt-36 pb-24 md:pt-44 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=70')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 to-[#0a1628]" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-5xl font-poppins font-extrabold mb-4 leading-tight"
          >
            Project Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            Visual highlights from our infrastructure projects across India.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setCategory('')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === ''
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No images yet</h3>
            <p className="text-gray-500 mt-2 text-sm">Check back soon for our latest project photos.</p>
          </div>
        )}

        {!loading && items.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {items.map((item, i) => (
              <motion.div
                key={item._id}
                variants={fadeUp}
                custom={i}
                className="group cursor-pointer"
                onClick={() => setLightbox(item)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title || 'Gallery image'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View
                      </span>
                    </div>
                    {item.category && (
                      <span className="absolute top-2 left-2 bg-blue-600/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>
                  {item.title && (
                    <div className="px-3 py-2.5">
                      <p className="text-xs font-medium text-gray-700 line-clamp-1">{item.title}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title || 'Gallery image'}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            {lightbox.title && (
              <p className="text-white text-center mt-3 font-medium">{lightbox.title}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
