import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Toaster } from 'react-hot-toast'
import Home from './Home.jsx'
import Header from './Header.jsx'
import SpecificBlog from './SpecificBlog.jsx'
import Footer from './Footer.jsx'
import AllBlogs from './AllBlogs.jsx'
import Events from './pages/Events.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Gallery from './pages/Gallery.jsx'
import Login from './pages/Login.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminEvents from './admin/AdminEvents.jsx'
import AdminGallery from './admin/AdminGallery.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const PublicLayout = ({ children }) => (
  <div className="font-sans">
    <Header />
    {children}
    <Footer />
  </div>
)

PublicLayout.propTypes = { children: PropTypes.node.isRequired }

const App = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/blogs" element={<PublicLayout><AllBlogs /></PublicLayout>} />
        <Route path="/blogs/:id" element={<PublicLayout><SpecificBlog /></PublicLayout>} />
        <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
        <Route path="/events/:id" element={<PublicLayout><EventDetail /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/events" element={
          <ProtectedRoute>
            <AdminLayout><AdminEvents /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/gallery" element={
          <ProtectedRoute>
            <AdminLayout><AdminGallery /></AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App

