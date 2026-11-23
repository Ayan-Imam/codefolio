import { useFormContext, useWatch } from 'react-hook-form'
import BrowserFrame from './BrowserFrame.jsx'
import { toApiPayload } from '../../utils/formatUserData.js'
import { isHttpUrl } from '../../utils/formRules.js'
import { getProfileLinks } from '../../utils/portfolioData.js'

// Renders nothing unless the URL is a valid http(s) link
function PreviewLink({ href, children }) {
  if (!isHttpUrl(href)) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-brand-300 hover:underline"
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
  const links = getProfileLinks(profile)

  const visibleSkills = skills.filter((skill) => skill.category || skill.items.length)
  const visibleProjects = projects.filter((project) => project.title)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
        Live preview
      </p>

      <BrowserFrame url={`${window.location.host}/${username || 'username'}`}>
        <div className="flex flex-col gap-6">
          {/* ---------- Header ---------- */}
          <header className="flex flex-col gap-1">
            <h2 className="font-display text-2xl font-bold text-white">
              {profile.fullName || <span className="text-ink-400">Your name</span>}
            </h2>
            {profile.headline && <p className="text-brand-300">{profile.headline}</p>}
            {profile.location && <p className="text-sm text-ink-400">{profile.location}</p>}
          </header>

          {/* ---------- About ---------- */}
          {profile.bio && (
            <p className="whitespace-pre-line text-sm text-ink-200">{profile.bio}</p>
          )}

          {/* ---------- Links ---------- */}
          {links.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {links.map((link) => (
                <PreviewLink key={link.label} href={link.url}>
                  {link.label}
                </PreviewLink>
              ))}
            </div>
          )}

          {/* ---------- Skills ---------- */}
          {visibleSkills.length > 0 && (
            <section className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Skills
              </h3>
              {visibleSkills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-white">{skill.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-100"
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
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Projects
              </h3>
              {visibleProjects.map((project, index) => (
                <article
                  key={index}
                  className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  {isHttpUrl(project.imageUrl) && (
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} screenshot`}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  )}
                  <h4 className="font-semibold text-white">{project.title}</h4>
                  {project.description && (
                    <p className="text-sm text-ink-300">{project.description}</p>
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
      </BrowserFrame>
    </div>
  )
}

export default PortfolioPreview