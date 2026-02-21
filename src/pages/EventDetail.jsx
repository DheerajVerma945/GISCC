import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, ArrowLeft, Phone } from 'lucide-react';
import { axiosInstance } from '../axios';
import useSEO from '../useSEO';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent]   = useState(null);
  const [loading, setLoading] = useState(true);

  useSEO({
    title:       event?.title,
    description: event?.description?.substring(0, 155),
    image:       event?.imageUrl,
  });

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/admin/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Loading event…</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Event not found</h2>
        <Link to="/events" className="text-blue-600 hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-[#0a1628] text-white relative overflow-hidden">
        {event.imageUrl && (
          <div
            className="absolute inset-0 opacity-15 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.imageUrl})` }}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 to-[#0a1628]" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-36 pb-20 md:pt-44 md:pb-24">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Events
          </Link>

          <div className="flex flex-wrap gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs backdrop-blur-sm">
              <CalendarDays className="w-3.5 h-3.5" />
              {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {event.venue && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5" />
                {event.venue}
              </span>
            )}
            {event.isActive && (
              <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-400 px-3.5 py-1.5 rounded-full text-xs backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active
              </span>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-poppins font-extrabold leading-tight"
          >
            {event.title}
          </motion.h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-10 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {event.imageUrl && (
            <figure className="aspect-video">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
          )}

          <div className="p-6 md:p-10 lg:p-12">
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-[15px] md:text-base">
              {event.description?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-5">{paragraph}</p>
              ))}
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
          <h3 className="text-2xl font-poppins font-bold text-white mb-2">Interested in this event?</h3>
          <p className="text-blue-100 text-sm max-w-sm mx-auto mb-7">
            Get in touch with our team to learn more or register your interest.
          </p>
          <a
            href="tel:+917837505862"
            className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
