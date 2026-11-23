import { useState } from 'react'
import { Link } from 'react-router'
import { useForm, FormProvider } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import AppHeader from '../../components/dashboard/AppHeader.jsx'
import StatsStrip from '../../components/dashboard/StatsStrip.jsx'
import DashboardForm from '../../components/dashboard/DashboardForm.jsx'
import PortfolioPreview from '../../components/dashboard/PortfolioPreview.jsx'
import Alert from '../../components/common/Alert.jsx'
import Button from '../../components/common/Button.jsx'
import { createUser } from '../../services/userService.js'
import { toApiPayload } from '../../utils/formatUserData.js'

// Starting values for the form (same nesting as the User model on the server;
// skills use `itemsText` here and are converted to `items` by toApiPayload)
const defaultValues = {
  username: '',
  profile: {
    fullName: '',
    headline: '',
    bio: '',
    location: '',
    email: '',
    resumeUrl: '',
    socialLinks: { github: '', linkedin: '', twitter: '', website: '' },
  },
  projects: [],
  skills: [],
}

// Jump links under the page heading (ids match the SectionCards in the form)
const sections = [
  { id: 'profile', label: 'Basic info' },
  { id: 'links', label: 'Links' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

function DashboardPage() {
  const methods = useForm({ defaultValues })

  // null = nothing to show, otherwise
  // { type: 'success' | 'error', message, username? }  (username only on success)
  const [status, setStatus] = useState(null)

  // async + await: the form stays in "submitting" mode until the request finishes
  const handleSave = async (data) => {
    setStatus(null)

    try {
      const user = await createUser(toApiPayload(data))
      setStatus({
        type: 'success',
        message: `Saved! Portfolio created for "${user.username}".`,
        username: user.username,
      })
    } catch (error) {
      // error.message comes from the server's { message } reply (see api.js)
      setStatus({ type: 'error', message: error.message })
    }
  }

  const savedUsername = status?.type === 'success' ? status.username : null

  return (
    <div className="app-bg">
      <Helmet>
        <title>Portfolio Builder - CodeFolio</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* The provider wraps everything so the header, stats and preview can read the form */}
      <FormProvider {...methods}>
        <AppHeader savedUsername={savedUsername} />

        <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8">
          {/* ---------- Welcome ---------- */}
          <section className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-brand-300">
                Portfolio builder
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-white">
                Build a portfolio that feels real.
              </h1>
              <p className="mt-2 max-w-2xl text-ink-300">
                Fill in your details on the left and watch your portfolio take shape on the
                right.
              </p>
            </div>

            <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-ink-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </section>

          {/* ---------- Stat cards ---------- */}
          <StatsStrip />

          {/* ---------- Form + live preview ---------- */}
          {/* flex-wrap: side by side when there is room, stacked when there is not */}
          <div className="flex flex-wrap items-start gap-8">
            <div className="grow basis-[30rem]">
              <DashboardForm onSubmit={handleSave} />
            </div>

            <aside className="sticky top-24 max-h-[calc(100vh_-_7.5rem)] grow basis-[24rem] overflow-y-auto">
              <PortfolioPreview />
            </aside>
          </div>
        </main>

        {/* ---------- Save notification (toast) ---------- */}
        {status && (
          <div className="fixed inset-x-6 bottom-6 z-30 ml-auto flex max-w-sm flex-col gap-3 rounded-card border border-white/10 bg-ink-900/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <Alert type={status.type}>{status.message}</Alert>

            <div className="flex items-center justify-between gap-3">
              {status.username ? (
                <Link
                  to={`/${status.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand-300 hover:underline"
                >
                  View your portfolio →
                </Link>
              ) : (
                <span />
              )}

              <Button variant="ghost" size="sm" onClick={() => setStatus(null)}>
                Dismiss
              </Button>
            </div>
          </div>
        )}
      </FormProvider>
    </div>
  )
}

export default DashboardPage