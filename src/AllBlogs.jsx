import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, X } from 'lucide-react';
import { axiosInstance } from './axios';
import useSEO from './useSEO';

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
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        <div>
          <div className="h-3 bg-gray-200 rounded w-20 mb-1 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-28 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const AllBlogs = () => {
  const [blogs, setBlogs]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  useSEO({
    title: 'Insights & Articles',
    description: 'Browse the latest infrastructure insights, project stories and technical articles from the Garvita Infrastructure team.',
  });

  useEffect(() => {
    axiosInstance.get('/admin/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Error fetching blogs:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages      = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfFirst    = (currentPage - 1) * blogsPerPage;
  const currentBlogs    = filteredBlogs.slice(indexOfFirst, indexOfFirst + blogsPerPage);

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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=70')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 to-[#0a1628]" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Knowledge Hub
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-5xl font-poppins font-extrabold mb-4 leading-tight"
          >
            Insights &amp; Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto mb-10"
          >
            Discover the latest trends, innovations and stories from the world of infrastructure development.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search articles…"
              className="w-full py-3.5 pl-12 pr-10 rounded-full bg-white text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
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

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-gray-400" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No articles found</h3>
            <p className="text-gray-500 mt-2 text-sm">Try a different search term.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && filteredBlogs.length > 0 && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {currentBlogs.map((blog, i) => (
                <motion.div key={blog._id} variants={fadeUp} custom={i}>
                  <Link to={`/blogs/${blog._id}`} className="group block h-full">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      {blog.image ? (
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                      ) : (
                        <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                          <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-gray-400 mb-3 gap-2">
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>·</span>
                          <span>{blog.readTime || 5} min read</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{blog.description}</p>
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-700 font-bold text-xs">
                              {blog.author?.charAt(0) || 'G'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{blog.author || 'Garvita Team'}</p>
                            <p className="text-xs text-gray-400">Infrastructure Specialist</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-blue-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
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

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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

export default AllBlogs;

