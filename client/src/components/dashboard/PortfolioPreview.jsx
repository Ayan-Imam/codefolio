
import { useFormContext, useWatch } from 'react-hook-form'
import PortfolioRenderer from '../common/PortfolioRenderer.jsx'
import BrowserFrame from './BrowserFrame.jsx'
import { toApiPayload } from '../../utils/formatUserData.js'

function PortfolioPreview() {
  const { control } = useFormContext()
  const values = useWatch({ control })
  const portfolio = toApiPayload(values)

  const previewData = {
    ...portfolio,
    profile: {
      ...portfolio.profile,
      fullName: portfolio.profile?.fullName || 'Your name',
    },
    projects: (portfolio.projects ?? []).filter((project) => project?.title),
    skills: (portfolio.skills ?? []).filter(
      (skill) => skill.category || skill.items.length > 0
    ),
    certificates: (portfolio.certificates ?? []).filter(
      (certificate) => certificate?.title
    ),
  }

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-300">
        Live preview
      </p>

      <BrowserFrame url={`${window.location.host}/${portfolio.username || 'username'}`}>
        <div className="min-w-0 overflow-hidden rounded-lg">
          <PortfolioRenderer userData={previewData} embedded />
        </div>
      </BrowserFrame>
    </div>
  )
}

export default PortfolioPreview