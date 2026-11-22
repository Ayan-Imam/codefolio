import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import MinimalistTemplate from './templates/MinimalistTemplate.jsx'
import { sampleUser } from './templates/sampleData.js'

// TEMPORARY test switch: open /?preview=minimalist to see a template with sample data.
// Task 3.6 replaces this with real routing.
function App() {
  const preview = new URLSearchParams(window.location.search).get('preview')

  if (preview === 'minimalist') return <MinimalistTemplate data={sampleUser} />

  return <DashboardPage />
}

export default App
