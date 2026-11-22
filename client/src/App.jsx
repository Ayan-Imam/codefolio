import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import MinimalistTemplate from './templates/MinimalistTemplate.jsx'
import CyberpunkTemplate from './templates/CyberpunkTemplate.jsx'
import { sampleUser } from './templates/sampleData.js'

// Which component belongs to which name (a first taste of the templateMap in Task 3.5)
const previews = {
  minimalist: MinimalistTemplate,
  cyberpunk: CyberpunkTemplate,
}

// TEMPORARY test switch: open /?preview=minimalist or /?preview=cyberpunk
// to see a template with sample data. Task 3.6 replaces this with real routing.
function App() {
  const preview = new URLSearchParams(window.location.search).get('preview')
  const PreviewTemplate = previews[preview]

  if (PreviewTemplate) return <PreviewTemplate data={sampleUser} />

  return <DashboardPage />
}

export default App;