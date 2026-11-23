import { Routes, Route } from 'react-router'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import StyleGuidePage from './pages/dashboard/StyleGuidePage.jsx'
import LandingPage from './pages/public/LandingPage.jsx'
import PublicPortfolioPage from './pages/public/PublicPortfolioPage.jsx'
import MessagePage from './pages/public/MessagePage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/styleguide" element={<StyleGuidePage />} />

      <Route path="/:username" element={<PublicPortfolioPage />} />

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