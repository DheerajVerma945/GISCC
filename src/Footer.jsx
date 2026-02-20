import { Link } from 'react-router-dom';
import { Linkedin, Mail, MapPin, Phone, Twitter, ArrowRight } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#0a1628] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div id="about" className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src="./Logo.png" alt="Garvita Infrastructure Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-base font-bold leading-tight">Garvita<br/>Infrastructure</h2>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Engineering sustainable futures through innovative infrastructure solutions since 2020.
            </p>
            <div className="flex gap-2">
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-colors border border-white/10">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-colors border border-white/10">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:atulsalaria82@gmail.com" aria-label="Email" className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-colors border border-white/10">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Services</h3>
            <ul className="space-y-2.5">
              {['Urban Development', 'Transport Infrastructure', 'Sustainable Construction', 'Water Management', 'Structural Engineering', 'Project Consulting'].map(service => (
                <li key={service}>
                  <a href="/#services" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home',          href: '/',         isRoute: true  },
                { label: 'Our Services',  href: '/#services', isRoute: false },
                { label: 'Latest Blogs',  href: '/blogs',    isRoute: true  },
                { label: 'About Us',      href: '#about',    isRoute: false },
                { label: 'Contact Us',    href: '#contact',  isRoute: false },
              ].map(link => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Contact Us</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm">Matti, Pathankot (Punjab)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+917837505862" className="text-sm hover:text-white transition-colors">+91 78375 05862</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:atulsalaria82@gmail.com" className="text-sm hover:text-white transition-colors break-all">atulsalaria82@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-500 text-xs">
          <p>© {year} Garvita Infrastructure. All rights reserved.</p>
          <p>Innovating since 2020 · Building Sustainable Futures</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

