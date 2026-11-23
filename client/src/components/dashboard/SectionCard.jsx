import Card from '../common/Card.jsx'

// A titled card for one part of the form.
// `id` is for jump links from the sidebar (next task), `action` is an optional
// button shown on the right of the header.
function SectionCard({ id, title, description, action, children }) {
  return (
    <Card as="section" id={id} className="flex scroll-mt-24 flex-col gap-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
          {description && <p className="mt-1 text-sm text-ink-300">{description}</p>}
        </div>
        {action}
      </header>

      {children}
    </Card>
  )
}

export default SectionCard