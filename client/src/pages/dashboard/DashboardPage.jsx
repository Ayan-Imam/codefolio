import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import AppHeader from '../../components/dashboard/AppHeader.jsx'
import StatsStrip from '../../components/dashboard/StatsStrip.jsx'
import DashboardForm from '../../components/dashboard/DashboardForm.jsx'
import PortfolioPreview from '../../components/dashboard/PortfolioPreview.jsx'
import Alert from '../../components/common/Alert.jsx'
import Button from '../../components/common/Button.jsx'
import {
  createUser,
  getMyPortfolio,
  listMyPortfolios,
  updateMyPortfolio,
} from '../../services/userService.js'
import { uploadImage } from '../../services/uploadService.js'
import { inputClass } from '../../utils/formStyles.js'
import { toApiPayload } from '../../utils/formatUserData.js'

const defaultValues = {
  username: '',
  profile: {
    fullName: '',
    photoUrl: '',
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

const sections = [
  { id: 'profile', label: 'Basic info' },
  { id: 'links', label: 'Links' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

function toFormValues(portfolio) {
  const profile = portfolio.profile ?? {}

  return {
    username: portfolio.username,
    profile: {
      ...defaultValues.profile,
      ...profile,
      socialLinks: {
        ...defaultValues.profile.socialLinks,
        ...profile.socialLinks,
      },
    },
    projects: portfolio.projects ?? [],
    skills: (portfolio.skills ?? []).map((skill) => ({
      category: skill.category,
      itemsText: (skill.items ?? []).join(', '),
    })),
  }
}

function DashboardPage({ token, onSignOut }) {
  const methods = useForm({ defaultValues })
  const {
    reset,
    formState: { isDirty, isSubmitting },
  } = methods

  const [status, setStatus] = useState(null)
  const [portfolios, setPortfolios] = useState(null)
  const [listError, setListError] = useState('')
  const [editingUsername, setEditingUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    listMyPortfolios(token, controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) setPortfolios(items)
      })
      .catch((error) => {
        if (controller.signal.aborted) return

        setListError(
          error.status === 401
            ? 'Your session expired. Sign out and sign in again.'
            : error.message
        )
        setPortfolios([])
      })

    return () => controller.abort()
  }, [token])

  const isBusy = portfolios === null || isLoading || isSubmitting || isUploading

  async function handlePortfolioChange(event) {
    const username = event.target.value

    if (isDirty && !window.confirm('Discard your unsaved changes?')) return

    setStatus(null)

    if (!username) {
      reset(defaultValues)
      setEditingUsername('')
      return
    }

    setIsLoading(true)

    try {
      const portfolio = await getMyPortfolio(username, token)
      reset(toFormValues(portfolio))
      setEditingUsername(portfolio.username)
    } catch (error) {
      if (error.status === 401) {
        onSignOut()
        return
      }

      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleImageUpload(file) {
    setIsUploading(true)

    try {
      return await uploadImage(file, token)
    } catch (error) {
      if (error.status === 401) onSignOut()
      throw error
    } finally {
      setIsUploading(false)
    }
  }

  async function handleSave(data) {
    if (portfolios === null || isLoading || isUploading) return

    setStatus(null)
    const payload = toApiPayload(data)

    try {
      const portfolio = editingUsername
        ? await updateMyPortfolio(editingUsername, payload, token)
        : await createUser(payload, token)

      const summary = {
        username: portfolio.username,
        profile: { fullName: portfolio.profile.fullName },
      }

      setPortfolios((items) => [
        summary,
        ...items.filter((item) => item.username !== portfolio.username),
      ])

      reset(toFormValues(portfolio))
      setEditingUsername(portfolio.username)
      setStatus({
        type: 'success',
        message: editingUsername ? 'Portfolio updated!' : 'Portfolio created!',
        username: portfolio.username,
      })
    } catch (error) {
      if (error.status === 401) {
        onSignOut()
        return
      }

      setStatus({ type: 'error', message: error.message })
    }
  }

  return (
    <div className="app-bg">
      <Helmet>
        <title>Portfolio Builder - CodeFolio</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <FormProvider {...methods}>
        <AppHeader
          savedUsername={editingUsername || null}
          onSignOut={onSignOut}
          saveDisabled={isBusy}
        />

        <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8">
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

          <div className="flex max-w-sm flex-col gap-2">
            <label htmlFor="saved-portfolio" className="text-sm font-medium text-white">
              Saved portfolios
            </label>
            <select
              id="saved-portfolio"
              className={inputClass}
              value={editingUsername}
              onChange={handlePortfolioChange}
              disabled={isBusy}
            >
              <option value="">New portfolio</option>
              {portfolios?.map(({ username, profile }) => (
                <option key={username} value={username}>
                  {profile?.fullName ? `${profile.fullName} (${username})` : username}
                </option>
              ))}
            </select>

            {(portfolios === null || isLoading) && (
              <p role="status" className="text-sm text-ink-300">
                {isLoading ? 'Loading portfolio…' : 'Loading saved portfolios…'}
              </p>
            )}
            {listError && <Alert type="error">{listError}</Alert>}
          </div>

          <StatsStrip />

          <div className="flex flex-wrap items-start gap-8">
            <div className="grow basis-[30rem]">
              {isUploading && (
                <p role="status" className="mb-3 text-sm text-ink-300">
                  Uploading image…
                </p>
              )}

              <div inert={isBusy}>
                <DashboardForm
                  onSubmit={handleSave}
                  editing={Boolean(editingUsername)}
                  onImageUpload={handleImageUpload}
                />
              </div>
            </div>

            <aside className="sticky top-24 max-h-[calc(100vh_-_7.5rem)] grow basis-[24rem] overflow-y-auto">
              <PortfolioPreview />
            </aside>
          </div>
        </main>

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