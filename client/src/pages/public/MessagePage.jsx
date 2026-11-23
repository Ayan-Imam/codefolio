import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import Card from '../../components/common/Card.jsx'

function MessagePage({ title, message, noIndex = false, loading = false }) {
  return (
    <main className="app-bg grid place-items-center px-6 py-12">
      <Helmet>
        <title>{`${title} - CodeFolio`}</title>
        {noIndex && <meta name="robots" content="noindex" />}
      </Helmet>

      <Card className="w-full max-w-md text-center">
        <div role={loading ? 'status' : undefined}>
          <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
          {message && (
            <p className="mt-3 text-sm leading-6 text-ink-200 [overflow-wrap:anywhere]">
              {message}
            </p>
          )}
        </div>

        {!loading && (
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg border border-white/15 bg-white/5
              px-4 py-2 text-sm font-medium text-white transition-colors
              hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4
              focus-visible:outline-brand-300"
          >
            Back to home
          </Link>
        )}
      </Card>
    </main>
  )
}

export default MessagePage