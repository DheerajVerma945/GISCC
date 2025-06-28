import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Header from './Header.jsx'
import SpecificBlog from './SpecificBlog.jsx'
import Footer from './Footer.jsx'
import AllBlogs from './AllBlogs.jsx'

const App = () => {
  return (

      <div className="nunito-body scroll-smooth">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<SpecificBlog />} />
          <Route path="/blogs" element={<AllBlogs />} />

        </Routes>
        <Footer/>
      </div>
  )
}

export default App
