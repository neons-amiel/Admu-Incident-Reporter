import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import './index.css'

import Landing from './landing.jsx'
import Report from './report.jsx'
import Contact from './contact.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/report' element={<Report />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
  