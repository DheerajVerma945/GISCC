import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, CalendarDays, Image, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { logout } from '../store/authSlice';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', href: '/admin',         icon: LayoutDashboard },
  { label: 'Events',    href: '/admin/events',   icon: CalendarDays    },
  { label: 'Gallery',   href: '/admin/gallery',  icon: Image           },
];

const AdminLayout = ({ children }) => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { admin } = useSelector((s) => s.auth);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : 'w-60'}`}>
      {/* Brand */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <img src="/Logo.png" alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Garvita Admin</p>
            {admin?.email && <p className="text-[11px] text-slate-400 truncate">{admin.email}</p>}
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1" aria-label="Admin navigation">
        {navItems.map((item) => {
          const Icon    = item.icon;
          const active  = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/8'
              }`}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  Sidebar.propTypes = { mobile: PropTypes.bool };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#0a1628] fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-60 bg-[#0a1628] z-50 lg:hidden"
            >
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 sticky top-0 z-20">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">
              {navItems.find((n) => n.href === location.pathname)?.label || 'Admin Panel'}
            </p>
          </div>
          {open && (
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

AdminLayout.propTypes = { children: PropTypes.node.isRequired };

export default AdminLayout;
