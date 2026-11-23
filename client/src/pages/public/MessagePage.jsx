import { Helmet } from 'react-helmet-async'

// A simple full-screen message, used for loading, "not found" and error states.
// noIndex: pass it for error pages so search engines don't list them.
function MessagePage({ title, message, noIndex = false }) {
  return (
    <>
      <Helmet>
        <title>{`${title} - CodeFolio`}</title>
        {noIndex && <meta name="robots" content="noindex" />}
      </Helmet>

      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-900 px-6 text-center">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {message && <p className="text-slate-400">{message}</p>}
      </div>
    </>
  )
}

export default MessagePage