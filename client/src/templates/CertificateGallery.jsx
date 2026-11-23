import { isHttpUrl } from '../utils/formRules.js'

const styles = {
  minimalist: {
    heading: 'minimal-section-title',
    card: 'border-slate-200 bg-slate-50 text-slate-900',
    details: 'text-slate-600',
  },
  cyberpunk: {
    heading: 'cyber-section-title',
    card: 'border-cyan-400/30 bg-slate-900 text-white',
    details: 'text-cyan-200',
  },
}

const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

function CertificateGallery({ certificates = [], variant = 'minimalist' }) {
  if (!certificates.length) return null

  const { heading, card, details } = styles[variant]

  return (
    <section className="mt-8" aria-labelledby="certificates-heading">
      <h2 id="certificates-heading" className={heading}>
        Certificates
      </h2>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {certificates.map(({ _id, title, issuer, issuedMonth, imageUrl }, index) => {
          const hasIssueMonth = /^\d{4}-(?:0[1-9]|1[0-2])$/.test(issuedMonth ?? '')

          return (
            <li key={_id ?? index} className={`min-w-0 rounded-xl border p-4 ${card}`}>
              {isHttpUrl(imageUrl) && (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-3 block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <img
                    src={imageUrl}
                    alt={`Open full-size certificate for ${title}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-lg border border-current/15 object-contain"
                  />
                </a>
              )}

              <h3 className="font-semibold [overflow-wrap:anywhere]">{title}</h3>
              <p className={`mt-1 text-sm [overflow-wrap:anywhere] ${details}`}>{issuer}</p>

              {hasIssueMonth && (
                <time dateTime={issuedMonth} className={`mt-1 block text-sm ${details}`}>
                  {monthFormatter.format(new Date(`${issuedMonth}-01T00:00:00Z`))}
                </time>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CertificateGallery