import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CalendarDays, Image, BookOpen, ArrowRight } from 'lucide-react';

const cards = [
  {
    label:    'Manage Events',
    desc:     'Create, edit and delete events.',
    href:     '/admin/events',
    icon:     CalendarDays,
    color:    'bg-blue-50',
    iconClr:  'text-blue-600',
    border:   'border-blue-100',
  },
  {
    label:    'Manage Gallery',
    desc:     'Upload and organise gallery images.',
    href:     '/admin/gallery',
    icon:     Image,
    color:    'bg-purple-50',
    iconClr:  'text-purple-600',
    border:   'border-purple-100',
  },
  {
    label:    'View Blogs',
    desc:     'See all published blog articles.',
    href:     '/blogs',
    icon:     BookOpen,
    color:    'bg-green-50',
    iconClr:  'text-green-600',
    border:   'border-green-100',
  },
];

const AdminDashboard = () => {
  const { admin } = useSelector((s) => s.auth);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-6 md:p-8 text-white"
      >
        <h1 className="text-2xl font-bold mb-1">
          Welcome back{admin?.email ? `, ${admin.email.split('@')[0]}` : ''}! 👋
        </h1>
        <p className="text-blue-100 text-sm">Manage your content from the panel below.</p>
      </motion.div>

      {/* Quick-action cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={card.href}
                className={`group block bg-white rounded-2xl border ${card.border} p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${card.iconClr}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{card.label}</h3>
                <p className="text-gray-500 text-sm mb-3">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold">
                  Go <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
