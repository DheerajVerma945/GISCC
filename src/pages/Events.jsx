import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, ArrowRight, Search, X } from 'lucide-react';
import { axiosInstance } from '../axios';
import useSEO from '../useSEO';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
    <div className="aspect-video bg-gray-200 animate-pulse" />
    <div className="p-5">
      <div className="h-3 bg-gray-200 rounded w-1/3 mb-3 animate-pulse" />
      <div className="h-5 bg-gray-200 rounded w-4/5 mb-2 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
    </div>
  </div>
);

const Events = () => {
  const [events, setEvents]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  useSEO({
    title: 'Events',
    description: 'Explore upcoming and past events hosted by Garvita Infrastructure — conferences, workshops and more.',
  });

  useEffect(() => {
    axiosInstance.get('/admin/events')
      .then((res) => setEvents(res.data))
      .catch((err) => console.error('Error fetching events:', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.venue?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages   = Math.ceil(filtered.length / eventsPerPage);
  const indexOfFirst = (currentPage - 1) * eventsPerPage;
  const current      = filtered.slice(indexOfFirst, indexOfFirst + eventsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="relative bg-[#0a1628] text-white pt-36 pb-24 md:pt-44 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=70')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 to-[#0a1628]" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Community &amp; Events
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-5xl font-poppins font-extrabold mb-4 leading-tight"
          >
            Upcoming Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto mb-10"
          >
            Join us at our latest conferences, workshops and industry gatherings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search events…"
              className="w-full py-3.5 pl-12 pr-10 rounded-full bg-white text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {searchTerm ? 'No events found' : 'No events yet'}
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              {searchTerm ? 'Try a different search term.' : 'Check back soon for upcoming events.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {current.map((event, i) => (
                <motion.div key={event._id} variants={fadeUp} custom={i}>
                  <Link to={`/events/${event._id}`} className="group block h-full">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      {event.image ? (
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          {event.isActive && (
                            <span className="absolute top-3 left-3 bg-green-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                          <CalendarDays className="w-16 h-16 text-white/30" />
                          {event.isActive && (
                            <span className="absolute top-3 left-3 bg-green-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-gray-400 mb-3 gap-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" />
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          {event.venue && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {event.venue}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{event.description}</p>
                        <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold">
                          View Details <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="mt-14 flex justify-center gap-2">
                <button
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
