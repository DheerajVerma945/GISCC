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
    <section className="px-4 md:px-8 lg:px-16 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Latest Insights
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No posts available</p>
          </div>
        ) : (
          <div className="relative group">
            <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {blogs.map((blog) => (
                <Link
                  to={`/blogs/${blog._id}`}
                  key={blog._id}
                  className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <article className="h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden rounded-t-xl">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {blog.description.length > 20
                          ? blog.description.slice(0, 20) + "..."
                          : blog.description}
                      </p>
                      <div className="mt-auto flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                        <span className="font-medium">Read More</span>
                        <svg
                          className="w-4 h-4 ml-2"
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
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
