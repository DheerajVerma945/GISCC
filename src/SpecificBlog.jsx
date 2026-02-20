import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, ArrowLeft, Clock, Share2, Copy, Check, Phone } from 'lucide-react';
import { axiosInstance } from './axios';
import useSEO from './useSEO';

const SpecificBlog = () => {
  const { id } = useParams();
  const [blog, setBlog]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [copied, setCopied]           = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef  = useRef(null);
  const currentUrl    = window.location.href;

  useSEO({
    title:       blog?.title,
    description: blog?.description?.substring(0, 155),
    image:       blog?.imageUrl,
    url:         currentUrl,
  });

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/admin/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaNative = () => {
    if (navigator.share) {
      navigator.share({ title: blog.title, text: blog.description.substring(0, 100) + '…', url: currentUrl }).catch(console.error);
    } else {
      copyToClipboard();
    }
  };

  const shareViaEmail     = () => { window.location.href = `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(currentUrl)}`; };
  const shareViaWhatsApp  = () => { window.open(`https://wa.me/?text=${encodeURIComponent(blog.title + '\n' + currentUrl)}`, '_blank'); };
  const shareViaTwitter   = () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(currentUrl)}`, '_blank'); };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Loading article…</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Article not found</h2>
        <Link to="/blogs" className="text-blue-600 hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-[#0a1628] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: `url(${blog.imageUrl})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 to-[#0a1628]" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-36 pb-20 md:pt-44 md:pb-24">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Insights
          </Link>

          <div className="flex flex-wrap gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs backdrop-blur-sm">
              <CalendarDays className="w-3.5 h-3.5" />
              {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime || 5} min read
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-poppins font-extrabold leading-tight mb-8"
          >
            {blog.title}
          </motion.h1>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              {blog.author?.charAt(0) || 'G'}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{blog.author || 'Garvita Team'}</p>
              <p className="text-blue-300 text-xs">Infrastructure Specialist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-10 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Featured Image */}
          <figure className="aspect-video">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          {/* Body */}
          <div className="p-6 md:p-10 lg:p-12">
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-[15px] md:text-base">
              {blog.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-5">{paragraph}</p>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm flex-shrink-0">
                  {blog.author?.charAt(0) || 'G'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{blog.author || 'Garvita Team'}</p>
                  <p className="text-gray-400 text-xs">Infrastructure Specialist</p>
                </div>
              </div>

              {/* Share */}
              <div className="relative" ref={shareMenuRef}>
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors shadow-md"
                  aria-label="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {showShareMenu && (
                  <div className="absolute right-0 bottom-full mb-3 w-60 bg-white rounded-2xl shadow-2xl p-4 z-20 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-blue-600" />
                      Share this article
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[
                        { label: 'Native',    fn: shareViaNative  },
                        { label: 'Twitter',   fn: shareViaTwitter },
                        { label: 'WhatsApp',  fn: shareViaWhatsApp},
                        { label: 'Email',     fn: shareViaEmail   },
                      ].map(({ label, fn }) => (
                        <button
                          key={label}
                          onClick={fn}
                          className="py-2.5 px-3 bg-gray-50 hover:bg-blue-50 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="flex rounded-xl overflow-hidden border border-gray-200">
                      <input type="text" value={currentUrl} readOnly className="flex-1 px-3 py-2 text-xs text-gray-500 bg-gray-50 outline-none" />
                      <button
                        onClick={copyToClipboard}
                        className={`px-3 py-2 text-xs font-medium flex items-center gap-1 transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-900'}`}
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-8 md:p-10 text-center shadow-lg"
        >
          <h3 className="text-2xl font-poppins font-bold text-white mb-2">Ready to build the future with us?</h3>
          <p className="text-blue-100 text-sm max-w-sm mx-auto mb-7">
            Contact our team of experts to discuss your infrastructure project.
          </p>
          <a
            href="tel:+917837505862"
            className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default SpecificBlog;

