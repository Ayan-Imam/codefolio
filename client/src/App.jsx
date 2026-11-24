import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import AuthPage from './pages/auth/AuthPage.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import StyleGuidePage from './pages/dashboard/StyleGuidePage.jsx'
import LandingPage from './pages/public/LandingPage.jsx'
import PublicPortfolioPage from './pages/public/PublicPortfolioPage.jsx'
import MessagePage from './pages/public/MessagePage.jsx'

function App() {
  const [token, setToken] = useState(null)
  const signOut = () => setToken(null)

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={
          token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthPage key="login" mode="login" onLogin={setToken} />
          )
        }
      />

      <Route
        path="/register"
        element={
          token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthPage key="register" mode="register" />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          token ? (
            <DashboardPage token={token} onSignOut={signOut} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/dashboard/styleguide"
        element={
          token ? <StyleGuidePage /> : <Navigate to="/login" replace />
        }
      />

      <Route path="/:username" element={<PublicPortfolioPage />} />
      <Route path="/user/:username" element={<PublicPortfolioPage />} />
      <Route
        path="*"
        element={
          <MessagePage
            title="Page not found"
            message="The page you are looking for does not exist."
            noIndex
          />
        }
      />
    </Routes>
  )
}

export default App