const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatMonth(value) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value ?? '')) return ''
  return monthFormatter.format(new Date(`${value}-01T00:00:00Z`))
}

function PortfolioTimeline({ entries = [], variant = 'minimalist' }) {
  const visibleEntries = entries
    .filter((entry) => entry?.title?.trim())
    .sort((a, b) => (b.startMonth ?? '').localeCompare(a.startMonth ?? ''))

  if (!visibleEntries.length) return null

  const isCyberpunk = variant === 'cyberpunk'
  const lineClass = isCyberpunk ? 'border-cyan-400/50' : 'border-slate-300'
  const dotClass = isCyberpunk ? 'bg-cyan-300' : 'bg-slate-600'

  return (
    <section aria-label="Education and experience" className="mt-8">
      <h2 className={isCyberpunk ? 'cyber-section-title' : 'minimal-section-title'}>
        Education &amp; experience
      </h2>

      <ol className={`mt-4 ml-2 border-l pl-5 ${lineClass}`}>
        {visibleEntries.map((entry, index) => {
          const start = formatMonth(entry.startMonth)
          const end = entry.endMonth ? formatMonth(entry.endMonth) : 'Present'

          return (
            <li
              key={entry._id ?? index}
              className="relative pb-6 last:pb-0 [overflow-wrap:anywhere]"
            >
              <span
                aria-hidden="true"
                className={`absolute top-2 -left-[1.55rem] size-2 rounded-full ${dotClass}`}
              />

              <p className="text-sm">
                {entry.type === 'experience' ? 'Experience' : 'Education'}
                {start && ` · ${start} – ${end}`}
              </p>
              <h3 className="mt-1 font-semibold">{entry.title}</h3>
              {entry.organization && <p>{entry.organization}</p>}
              {entry.description && (
                <p className="mt-2 whitespace-pre-line text-sm">{entry.description}</p>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default PortfolioTimeline