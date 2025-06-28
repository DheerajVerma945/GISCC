import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from './axios';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/admin/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Insights & Stories
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 mb-10">
            Discover the latest trends, innovations, and stories from the world of infrastructure development
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full py-4 px-6 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <svg 
                className="absolute right-6 top-4 h-6 w-6 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-full h-48 animate-pulse rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-20 bg-white  max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-6">No matching articles found</h3>
            <p className="text-gray-600 mt-4 max-w-md mx-auto">
              Try adjusting your search criteria
            </p>
            <button 
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-medium hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105 shadow-md"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && filteredBlogs.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <Link 
                  to={`/blogs/${blog._id}`} 
                  key={blog._id}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-full flex flex-col border border-gray-100">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.readTime || 5} min read</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.description}
                      </p>
                      <div className="mt-auto flex items-center pt-4 border-t border-gray-100">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl w-10 h-10 flex items-center justify-center">
                          <span className="font-bold text-blue-800 text-sm">
                            {blog.author?.charAt(0) || 'G'}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{blog.author || 'Garvita Team'}</p>
                          <p className="text-sm text-gray-500">Infrastructure Specialist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <div className="flex space-x-2">
                  <button 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentPage === 1 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-blue-50 shadow-sm'
                    }`}
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-blue-50 shadow-sm'
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentPage === totalPages 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-blue-50 shadow-sm'
                    }`}
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;