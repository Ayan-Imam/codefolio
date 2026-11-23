import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import Card from '../../components/common/Card.jsx'
import { sampleUser } from '../../templates/sampleData.js'

const features = [
  {
    title: 'Show your work',
    description: 'Add projects, skills, and links to your source code and live demos.',
  },
  {
    title: 'Preview as you type',
    description: 'See your profile and projects take shape in the builder.',
  },
  {
    title: 'Share one link',
    description: 'Publish your portfolio at a URL based on your username.',
  },
]

const templates = [
  {
    name: 'Minimalist',
    description: 'A light, clean layout with understated typography.',
    previewClass: 'border-slate-200 bg-white text-slate-900',
    accentClass: 'text-slate-600',
  },
  {
    name: 'Cyberpunk',
    description: 'A dark layout with neon accents and bold headings.',
    previewClass: 'border-cyan-400/30 bg-slate-950 text-white',
    accentClass: 'text-cyan-300',
  },
]

const builderLinkClass =
  'inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 ' +
  'text-sm font-semibold text-white shadow-lg shadow-brand-500/25 ' +
  'transition-colors hover:bg-brand-600 focus-visible:outline-2 ' +
  'focus-visible:outline-offset-4 focus-visible:outline-brand-300'

function LandingPage() {
  const { profile, projects } = sampleUser

  return (
    <div className="app-bg">
      <Helmet>
        <title>CodeFolio | Build your developer portfolio</title>
        <meta
          name="description"
          content="Build a developer portfolio, preview it as you type, and publish it with your own CodeFolio link."
        />
      </Helmet>

      <header className="border-b border-white/10">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4"
        >
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-lg bg-brand-500 text-sm font-bold text-white"
            >
              C
            </span>
            CodeFolio
          </Link>

          <Link to="/dashboard" className="text-sm text-ink-200 hover:text-white">
            Open builder →
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="mx-auto max-w-3xl py-20 text-center sm:py-28">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Build a portfolio that shows what you can do.
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-ink-200 sm:text-lg">
            Put your projects, skills, and profile in one place. See your portfolio
            take shape as you build it, then share it with one link.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <Link to="/dashboard" className={builderLinkClass}>
              Build your portfolio →
            </Link>
            <a href="#templates" className="text-sm text-brand-300 hover:underline">
              Explore templates
            </a>
          </div>
        </section>

        <section aria-labelledby="features-heading" className="pb-20">
          <h2 id="features-heading" className="mb-6 font-display text-3xl font-bold text-white">
            From profile to published portfolio
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map(({ title, description }) => (
              <Card as="article" key={title}>
                <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-200">{description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="templates" aria-labelledby="templates-heading" className="scroll-mt-6 pb-20">
          <h2 id="templates-heading" className="mb-6 font-display text-3xl font-bold text-white">
            Portfolio templates
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {templates.map(({ name, description, previewClass, accentClass }) => (
              <Card as="article" key={name}>
                <h3 className="font-display text-xl font-semibold text-white">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-200">{description}</p>

                <div aria-hidden="true" className={`mt-5 rounded-xl border p-5 ${previewClass}`}>
                  <p className={`text-sm font-medium ${accentClass}`}>{profile.headline}</p>
                  <p className="mt-1 font-display text-2xl font-bold">{profile.fullName}</p>
                  <div className="my-4 border-t border-current opacity-20" />
                  <p className={`text-xs font-medium ${accentClass}`}>Selected project</p>
                  <p className="mt-1 text-sm font-semibold">{projects[1].title}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="start-heading" className="pb-16">
          <Card className="text-center">
            <h2 id="start-heading" className="font-display text-3xl font-bold text-white">
              Ready to share your work?
            </h2>
            <Link to="/dashboard" className={`mt-5 ${builderLinkClass}`}>
              Open the builder →
            </Link>
          </Card>
        </section>
      </main>
    </div>
  )
}

export default LandingPage