import './MinimalistTemplate.css'
import { isHttpUrl } from '../utils/formRules.js'
import { getProfileLinks } from '../utils/portfolioData.js'
import CertificateGallery from './CertificateGallery.jsx'

// A clean, light, single-column layout.
// `data` is the portfolio: { username, templateId, profile, projects, skills }
function MinimalistTemplate({ data, embedded = false  }) {
  const PageContent = embedded ? 'div' : 'main'
  const { profile = {}, projects = [], skills = [], certificates = [] } = data
  const links = getProfileLinks(profile)

  return (
    <div className="minimal">
      <PageContent className="minimal-page">
        {/* ---------- Header ---------- */}
        <header>
          {isHttpUrl(profile.photoUrl) && (
            <img
              src={profile.photoUrl}
              alt={profile.fullName ? `Portrait of ${profile.fullName}` : 'Profile photo'}
              className="mb-4 size-24 rounded-full border border-slate-200 object-cover"
            />
          )}
          <h1 className="minimal-name">{profile.fullName}</h1>
          {profile.headline && <p className="minimal-headline">{profile.headline}</p>}
          {profile.location && <p className="minimal-location">{profile.location}</p>}
        </header>

        {/* ---------- About ---------- */}
        {profile.bio && <p className="minimal-bio">{profile.bio}</p>}

        {/* ---------- Links ---------- */}
        {links.length > 0 && (
          <nav className="minimal-links" aria-label="Links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="minimal-link"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* ---------- Skills ---------- */}
        {skills.length > 0 && (
          <section>
            <h2 className="minimal-section-title">Skills</h2>
            <dl>
              {skills.map((skill, index) => (
                <div key={index} className="minimal-skill-row">
                  <dt className="minimal-skill-category">{skill.category}</dt>
                  <dd className="minimal-skill-items">{skill.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* ---------- Projects ---------- */}
        {projects.length > 0 && (
          <section>
            <h2 className="minimal-section-title">Projects</h2>
            {projects.map((project, index) => (
              <article key={index} className="minimal-project">
                {isHttpUrl(project.imageUrl) && (
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    className="minimal-project-image"
                  />
                )}
                <h3 className="minimal-project-title">{project.title}</h3>
                {project.description && (
                  <p className="minimal-project-description">{project.description}</p>
                )}
                {(isHttpUrl(project.githubUrl) || isHttpUrl(project.liveUrl)) && (
                  <div className="minimal-project-links">
                    {isHttpUrl(project.githubUrl) && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="minimal-link"
                      >
                        GitHub
                      </a>
                    )}
                    {isHttpUrl(project.liveUrl) && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="minimal-link"
                      >
                        Live site
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </section>
        )}
        <CertificateGallery certificates={certificates} variant="minimalist" />
      </PageContent>
    </div>
  )
}

export default MinimalistTemplate