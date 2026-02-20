import { motion } from 'framer-motion';
import { ArrowRight, Building2, Truck, Leaf, GlassWater, Construction, Quote, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Blogs from './Blogs';
import useSEO from './useSEO';

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const services = [
  { title: 'Urban Development',       description: 'Designing sustainable urban spaces that balance growth with environmental responsibility.', icon: Building2,     color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100' },
  { title: 'Transport Infrastructure', description: 'Building efficient transportation networks that connect communities and drive economic growth.', icon: Truck,          color: 'text-cyan-600',   bg: 'bg-cyan-50',   border: 'border-cyan-100' },
  { title: 'Sustainable Construction', description: 'Implementing green building practices to minimise environmental impact at every stage.', icon: Leaf,           color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100' },
  { title: 'Water Management',         description: 'Developing resilient water infrastructure for sustainable resource management.', icon: GlassWater,    color: 'text-sky-600',    bg: 'bg-sky-50',    border: 'border-sky-100' },
  { title: 'Structural Engineering',   description: 'Creating innovative structural solutions that stand the test of time.', icon: Construction,  color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  { title: 'Project Consulting',       description: 'Providing expert guidance throughout the full project lifecycle.', icon: Phone,         color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
];

const stats = [
  { value: '250+', label: 'Projects Completed' },
  { value: '40+',  label: 'Industry Awards' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '500+', label: 'Expert Team Members' },
];

const testimonials = [
  { name: 'Rajesh Kumar',  company: 'Metro Development Corp',       text: 'Garvita Infrastructure delivered beyond our expectations. Their innovative approach to sustainable design helped us achieve LEED Platinum certification while staying on budget.' },
  { name: 'Priya Sharma',  company: 'National Highway Authority',   text: 'Working with Garvita was a seamless experience. Their expertise in transport infrastructure and commitment to timelines was truly impressive.' },
  { name: 'Amit Singh',    company: 'Smart City Solutions',         text: "The team's dedication to quality and sustainability is unmatched. Our urban development project was completed with exceptional precision and care." },
];

const HomePage = () => {
  useSEO({
    title: 'Home',
    description: 'Garvita Infrastructure delivers world-class engineering — urban development, transport, water management and sustainable construction since 2020.',
  });

  return (
    <div className="antialiased text-gray-800">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-navy-900 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0d1f3c]/85 to-[#1d4ed8]/40" aria-hidden="true" />

        {/* Decorative ring */}
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full border border-blue-600/10 pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-16 -right-16 w-[400px] h-[400px] rounded-full border border-blue-500/10 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Innovating since 2020
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Engineering
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Excellence
              </span>
              for Tomorrow
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-10">
              Shaping sustainable communities through innovative infrastructure solutions that stand the test of time.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/blogs"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-blue-900/40 hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                Explore Projects <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3.5 px-8 rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Our Services
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="w-px h-6 bg-white/30"
          />
        </motion.div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <p className="text-4xl md:text-5xl font-poppins font-extrabold text-blue-600 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Services ─────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">What We Do</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">Our Core Services</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto">
              Delivering comprehensive infrastructure solutions with precision, innovation and a commitment to sustainability.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`bg-white p-8 rounded-2xl border ${service.border} shadow-sm hover:shadow-xl transition-shadow duration-300 group`}
                >
                  <div className={`${service.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Projects ────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-14"
          >
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">Our Work</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-poppins font-bold text-gray-900">Featured Projects</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-8"
          >
            {[
              {
                img:    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
                alt:    'Riverfront Redevelopment Project',
                badge:  'Completed 2023',
                title:  'Riverfront Redevelopment Project',
                desc:   'Transforming urban waterfronts into vibrant community spaces with sustainable design principles.',
              },
              {
                img:    'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
                alt:    'High-Speed Rail Corridor',
                badge:  'In Progress',
                title:  'High-Speed Rail Corridor',
                desc:   'Engineering a state-of-the-art transportation network connecting major economic centres.',
              },
            ].map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                whileHover="hover"
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-gray-900"
              >
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={project.img}
                    alt={project.alt}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-blue-600 text-white text-xs font-semibold py-1.5 px-4 rounded-full">
                    {project.badge}
                  </span>
                </div>
                <div className="p-7 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 60%), radial-gradient(circle at 80% 50%, #06b6d4 0%, transparent 60%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-poppins font-bold text-white mb-3">
              What Our Clients Say
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 max-w-2xl mx-auto">
              Trusted by government agencies, municipalities and private developers across India.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((item, i) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                custom={i}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-7 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="bg-blue-600 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.name}</h4>
                    <p className="text-blue-300 text-xs">{item.company}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-5">&ldquo;{item.text}&rdquo;</p>
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Blog Previews ────────────────────────────────────── */}
      <Blogs />

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
              Ready to Start Your Next Project?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-100 max-w-xl mx-auto mb-10 text-lg">
              Partner with us to bring your vision to life with innovative engineering and sustainable practices.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a
                href="tel:+917837505862"
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Request a Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
