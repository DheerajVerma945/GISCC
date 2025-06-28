import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "./axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/admin/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="px-4 md:px-8 lg:px-16 py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Latest Insights
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Discover our expert perspectives on infrastructure innovation and sustainable development
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                  </div>
                  <div className="mt-6 h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">No posts available</h3>
            <p className="text-gray-600 mt-2 max-w-md mx-auto">
              We're working on new content. Check back soon for the latest insights.
            </p>
          </div>
        ) : (
          <div className="relative group">
            <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-50">
              {blogs.map((blog) => (
                <Link
                  to={`/blogs/${blog._id}`}
                  key={blog._id}
                  className="flex-shrink-0 w-full sm:w-80 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <article className="h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                          Infrastructure
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.description}
                      </p>
                      <div className="mt-auto flex items-center text-blue-600 group-hover:text-blue-700 transition-colors font-medium">
                        <span>Read Article</span>
                        <svg
                          className="w-4 h-4 ml-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
          </div>
        )}

        <div className="text-center mt-16">
          <Link 
            to="/blogs" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105"
          >
            View All Articles
            <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;