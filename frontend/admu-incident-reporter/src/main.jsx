import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

import Login from './login.jsx'
import Landing from './landing.jsx'
import Report from './report.jsx'
import Contact from './contact.jsx'
import Admin from './admin.jsx'


function Root() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts(prev => [...prev, post]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Landing posts={posts} />} />
        <Route path='/report' element={<Report addPost={addPost} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/adminsettings' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
