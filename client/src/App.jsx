import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import PortfolioRenderer from './components/common/PortfolioRenderer.jsx'
import { sampleUser } from './templates/sampleData.js'

// TEMPORARY test switch: /?preview=<templateId> renders the sample data through the
// renderer with that template id. Task 3.6 replaces this with real routing.
function App() {
  const preview = new URLSearchParams(window.location.search).get('preview')

  if (preview) {
    return <PortfolioRenderer userData={{ ...sampleUser, templateId: preview }} />
  }

  return <DashboardPage />
}

export default App