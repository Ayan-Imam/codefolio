import MinimalistTemplate from '../../templates/MinimalistTemplate.jsx'
import CyberpunkTemplate from '../../templates/CyberpunkTemplate.jsx'
import EditorialTemplate from '../../templates/EditorialTemplate.jsx'

// Template id (as stored in the database) -> the component that draws it.
// The keys must match TEMPLATE_IDS in server/models/user.js.
const templateMap = {
  minimalist: MinimalistTemplate,
  cyberpunk: CyberpunkTemplate,
  editorial: EditorialTemplate,
}

// Picks the layout for a user and renders it with that user's data.
// `userData` is the portfolio: { username, templateId, profile, projects, skills }
function PortfolioRenderer({ userData, embedded = false }) {
  // hasOwn checks only the map's own keys. A plain templateMap[id] lookup would also
  // find inherited names like "constructor" and crash. Unknown ids use the default.
  const SelectedLayout = Object.hasOwn(templateMap, userData.templateId)
    ? templateMap[userData.templateId]
    : MinimalistTemplate

  return <SelectedLayout data={userData} embedded={embedded} />
}

export default PortfolioRenderer