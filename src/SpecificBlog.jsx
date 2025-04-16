import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "./axios";
import { CalendarDays, ArrowLeft } from "lucide-react";

const SpecificBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/admin/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-8 py-24">
      <Link
        to="/"
        className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </Link>

      <header className="mb-12">
        <div className="text-sm text-gray-500 flex items-center gap-2 mb-6">
          <CalendarDays className="w-4 h-4" />
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {blog.title}
        </h1>
        <figure className="relative aspect-video rounded-2xl overflow-hidden shadow-xl mb-12">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30"></div>
        </figure>
      </header>

      <section className="prose prose-lg md:prose-xl max-w-none text-gray-700">
        {blog.description.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-6 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>
    </article>
  );
};

export default SpecificBlog;
