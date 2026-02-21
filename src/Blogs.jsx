import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { axiosInstance } from './axios';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' } }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const SkeletonCard = () => (
  <div className="flex-shrink-0 w-full sm:w-80 bg-white rounded-2xl overflow-hidden shadow-md">
    <div className="aspect-video bg-gray-200 animate-pulse" />
    <div className="p-5">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3 animate-pulse" />
      <div className="h-5 bg-gray-200 rounded w-4/5 mb-2 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
    </div>
  </div>
);

const Blogs = () => {
  const [blogs, setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/admin/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-2">Knowledge Hub</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-3">
            Latest Insights
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto">
            Expert perspectives on infrastructure innovation and sustainable development.
          </motion.p>
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hidden">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">No posts yet</h3>
            <p className="text-gray-500 mt-1 text-sm">Check back soon for the latest insights.</p>
          </div>
        )}

        {/* Blog cards */}
        {!loading && blogs.length > 0 && (
          <div className="relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex overflow-x-auto gap-6 pb-4 scrollbar-hidden"
            >
              {blogs.map((blog, i) => (
                <motion.div key={blog._id} variants={fadeUp} custom={i} className="flex-shrink-0 w-full sm:w-80">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full"
                  >
                    {blog.image ? (
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                          Infrastructure
                        </span>
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="absolute top-3 left-3 bg-blue-500/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                          Infrastructure
                        </span>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{blog.description}</p>
                      <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            {/* Fade gradient right */}
            <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" aria-hidden="true" />
          </div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;

