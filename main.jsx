import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './src/context/AuthContext.jsx'
import AkiyomLanding from './AkiyomLanding.jsx'
import PrivacyPage from './PrivacyPage.jsx'
import AkiFinansPrivacyPage from './AkiFinansPrivacyPage.jsx'
import AkizenPrivacyPage from './AkizenPrivacyPage.jsx'
import ProjectsPage from './src/ProjectsPage.jsx'
import ProjectDetailPage from './src/ProjectDetailPage.jsx'
import AkiyomAiPage from './src/AkiyomAiPage.jsx'
import AuthPage from './src/pages/AuthPage.jsx'
import ProfilePage from './src/pages/ProfilePage.jsx'
import AdminPanelPage from './src/pages/AdminPanelPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AkiyomLanding />} />
          <Route path="/gizlilik" element={<PrivacyPage />} />
          <Route path="/gizlilik/aki-finans" element={<AkiFinansPrivacyPage />} />
          <Route path="/gizlilik/akizen" element={<AkizenPrivacyPage />} />
          <Route path="/projeler" element={<ProjectsPage />} />
          <Route path="/projeler/:slug" element={<ProjectDetailPage />} />
          <Route path="/akiyom-ai" element={<AkiyomAiPage />} />
          <Route path="/kayit-ol" element={<AuthPage mode="register" />} />
          <Route path="/giris" element={<AuthPage mode="login" />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/panel" element={<AdminPanelPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
