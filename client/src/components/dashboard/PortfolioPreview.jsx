import { useFormContext, useWatch } from 'react-hook-form'
import { toApiPayload } from '../../utils/formatUserData.js'
import { URL_RULE } from '../../utils/formRules.js'

// Only allow http(s) links, so half-typed or unsafe values are never rendered as links
const isHttpUrl = (url) => URL_RULE.value.test(url || '')

const socialLabels = [
  ['github', 'GitHub'],
  ['linkedin', 'LinkedIn'],
  ['twitter', 'Twitter / X'],
  ['website', 'Website'],
]

// Renders nothing unless the URL is valid
function PreviewLink({ href, children }) {
  if (!isHttpUrl(href)) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-emerald-400 hover:underline"
    >
      {children}
    </a>
  )
}

function PortfolioPreview() {
  const { control } = useFormContext()

  // Re-renders only this component whenever any form value changes
  const values = useWatch({ control })

  // Same conversion the Save button uses (skills become real `items` arrays)
  const { username, profile = {}, projects = [], skills = [] } = toApiPayload(values)
  const social = profile.socialLinks || {}

  const visibleSkills = skills.filter((skill) => skill.category || skill.items.length)
  const visibleProjects = projects.filter((project) => project.title)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Live preview
      </p>

      <div className="flex flex-col gap-6 rounded-xl border border-slate-700 bg-slate-800 p-6">
        {/* ---------- Header ---------- */}
        <header className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-white">
            {profile.fullName || <span className="text-slate-500">Your name</span>}
          </h2>
          {profile.headline && <p className="text-emerald-400">{profile.headline}</p>}
          {profile.location && (
            <p className="text-sm text-slate-400">{profile.location}</p>
          )}
          <p className="text-xs text-slate-500">/{username || 'username'}</p>
        </header>

        {/* ---------- About ---------- */}
        {profile.bio && (
          <p className="whitespace-pre-line text-sm text-slate-300">{profile.bio}</p>
        )}

        {/* ---------- Links ---------- */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <PreviewLink href={profile.resumeUrl}>Resume</PreviewLink>
          {socialLabels.map(([key, label]) => (
            <PreviewLink key={key} href={social[key]}>
              {label}
            </PreviewLink>
          ))}
        </div>

        {/* ---------- Skills ---------- */}
        {visibleSkills.length > 0 && (
          <section className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Skills
            </h3>
            {visibleSkills.map((skill, index) => (
              <div key={index} className="flex flex-col gap-2">
                <p className="text-sm font-medium text-white">{skill.category}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ---------- Projects ---------- */}
        {visibleProjects.length > 0 && (
          <section className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Projects
            </h3>
            {visibleProjects.map((project, index) => (
              <article
                key={index}
                className="flex flex-col gap-2 rounded-lg border border-slate-700 bg-slate-900 p-4"
              >
                {isHttpUrl(project.imageUrl) && (
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    className="h-32 w-full rounded-md object-cover"
                  />
                )}
                <h4 className="font-semibold text-white">{project.title}</h4>
                {project.description && (
                  <p className="text-sm text-slate-300">{project.description}</p>
                )}
                <div className="flex gap-4">
                  <PreviewLink href={project.githubUrl}>GitHub</PreviewLink>
                  <PreviewLink href={project.liveUrl}>Live</PreviewLink>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default PortfolioPreview