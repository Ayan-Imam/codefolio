import { Link } from 'react-router'
import { useFormContext } from 'react-hook-form'
import Button from '../common/Button.jsx'

// The sticky top bar. `savedUsername` is set after a successful save.
function AppHeader({  savedUsername, onSignOut } ) {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-500 font-display text-sm font-bold text-white shadow-lg shadow-brand-500/30">
            C
          </span>
          <span className="font-display text-lg font-semibold text-white">CodeFolio</span>
        </Link>

        <div className="flex items-center gap-4">
          {savedUsername && (
            <Link
              to={`/${savedUsername}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-brand-300 hover:underline"
            >
              View portfolio →
            </Link>
          )}

          {/* form="portfolio-form" submits the form even though this button sits outside it */}
          <Button type="submit" form="portfolio-form" size="sm" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save portfolio'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onSignOut}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}

export default AppHeader