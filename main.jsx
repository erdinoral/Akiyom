import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AkiyomLanding from './AkiyomLanding.jsx'
import PrivacyPage from './PrivacyPage.jsx'
import AkiFinansPrivacyPage from './AkiFinansPrivacyPage.jsx'
import AkizenPrivacyPage from './AkizenPrivacyPage.jsx'
import ProjectsPage from './src/ProjectsPage.jsx'
import ProjectDetailPage from './src/ProjectDetailPage.jsx'
import AkiyomAiPage from './src/AkiyomAiPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AkiyomLanding />} />
        <Route path="/gizlilik" element={<PrivacyPage />} />
        <Route path="/gizlilik/aki-finans" element={<AkiFinansPrivacyPage />} />
        <Route path="/gizlilik/akizen" element={<AkizenPrivacyPage />} />
        <Route path="/projeler" element={<ProjectsPage />} />
        <Route path="/projeler/:slug" element={<ProjectDetailPage />} />
        <Route path="/akiyom-ai" element={<AkiyomAiPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
