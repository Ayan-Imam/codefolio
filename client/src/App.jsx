import { Routes, Route, Navigate } from 'react-router'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import PublicPortfolioPage from './pages/public/PublicPortfolioPage.jsx'
import MessagePage from './pages/public/MessagePage.jsx'

function App() {
  return (
    <Routes>
      {/* The home page just sends people to the builder for now */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* The builder */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Public portfolios, e.g. /neon_user */}
      <Route path="/:username" element={<PublicPortfolioPage />} />

      {/* Anything else, e.g. /a/b */}
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