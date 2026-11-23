import { useFormContext, useWatch } from 'react-hook-form'
import Card from '../common/Card.jsx'
import { getProfileProgress } from '../../utils/profileProgress.js'

function StatCard({ label, value, detail, children }) {
  return (
    <Card className="flex flex-col gap-3">
      <p className="text-sm text-ink-300">{label}</p>
      <p className="font-display text-4xl font-bold text-white">{value}</p>
      {children}
      <p className="text-xs text-ink-400">{detail}</p>
    </Card>
  )
}

// Three summary cards that update as you type
function StatsStrip() {
  const { control } = useFormContext()
  const values = useWatch({ control })
  const progress = getProfileProgress(values)

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4">
      <StatCard
        label="Profile completeness"
        value={`${progress.percent}%`}
        detail={progress.nextStep ? `Next: ${progress.nextStep}` : 'All set. Ready to save!'}
      >
        <div
          role="progressbar"
          aria-label="Profile completeness"
          aria-valuenow={progress.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 overflow-hidden rounded-full bg-white/10"
        >
          <div
            className="h-full rounded-full bg-brand-500 transition-all"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </StatCard>

      <StatCard
        label="Skills"
        value={progress.skillCount}
        detail={`${progress.skillCategoryCount} ${
          progress.skillCategoryCount === 1 ? 'category' : 'categories'
        }`}
      />

      <StatCard
        label="Projects"
        value={progress.projectCount}
        detail={progress.projectCount === 0 ? 'Add a title to show one' : 'Shown on your portfolio'}
      />
    </div>
  )
}

export default StatsStrip