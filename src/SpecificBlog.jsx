import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "./axios";
import { CalendarDays, ArrowLeft, Clock, Share2,  Copy, Check } from "lucide-react";

const SpecificBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef(null);
  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/admin/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaNative = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description.substring(0, 100) + "...",
        url: currentUrl
      }).catch(console.error);
    } else {
      copyToClipboard();
    }
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(currentUrl)}`;
  };

  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(blog.title + "\n" + currentUrl)}`, '_blank');
  };

  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blogs"
              className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Insights
            </Link>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-blue-800 bg-opacity-40 px-4 py-1.5 rounded-full text-sm flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="bg-blue-800 bg-opacity-40 px-4 py-1.5 rounded-full text-sm flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{blog.readTime || 5} min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center mt-10">
              <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl w-12 h-12 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-800 text-lg">
                  {blog.author?.charAt(0) || 'G'}
                </span>
              </div>
              <div>
                <p className="font-medium text-blue-100">{blog.author || 'Garvita Team'}</p>
                <p className="text-blue-200 text-sm">Infrastructure Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <figure className="relative aspect-video">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
          </figure>
          
          <div className="p-6 md:p-8 lg:p-12">
            <div className="prose prose-lg max-w-none text-gray-700">
              {blog.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl w-10 h-10 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-800">
                      {blog.author?.charAt(0) || 'G'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{blog.author || 'Garvita Team'}</p>
                    <p className="text-gray-500 text-sm">Infrastructure Specialist</p>
                  </div>
                </div>
                
                <div className="relative" ref={shareMenuRef}>
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute right-0 bottom-full mb-3 w-64 bg-white rounded-xl shadow-2xl p-4 z-20 animate-fadeIn">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <Share2 className="w-4 h-4 mr-2 text-blue-600" />
                        Share this article
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={shareViaNative}
                          className="flex items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-sm font-medium">Native</span>
                        </button>
                        
                        <button 
                          onClick={shareViaTwitter}
                          className="flex items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-sm font-medium">Twitter</span>
                        </button>
                        
                        <button 
                          onClick={shareViaWhatsApp}
                          className="flex items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-sm font-medium">WhatsApp</span>
                        </button>
                        
                        <button 
                          onClick={shareViaEmail}
                          className="flex items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-sm font-medium">Email</span>
                        </button>
                      </div>
                      
                      <div className="mt-3 flex">
                        <input
                          type="text"
                          value={currentUrl}
                          readOnly
                          className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-l-lg"
                        />
                        <button 
                          onClick={copyToClipboard}
                          className={`px-4 py-2 flex items-center text-xs font-medium rounded-r-lg ${
                            copied 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-800 text-white hover:bg-gray-900'
                          }`}
                        >
                          {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r  rounded-2xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to build the future with us?
            </h3>
            <p className=" max-w-xl mx-auto mb-8">
              Contact our team of experts to discuss your infrastructure project
            </p>
            <a 
              href="tel:+917837505862"
              className="inline-flex items-center px-8 py-3  font-bold rounded-full  transition-all transform hover:scale-105 shadow-lg"
            >
              Get in Touch
              <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SpecificBlog;
