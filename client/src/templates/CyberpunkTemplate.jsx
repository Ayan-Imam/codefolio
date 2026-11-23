import './CyberpunkTemplate.css'
import { isHttpUrl } from '../utils/formRules.js'
import { getProfileLinks } from '../utils/portfolioData.js'
import CertificateGallery from './CertificateGallery.jsx'
import PortfolioTimeline from './PortfolioTimeline.jsx'

// One project card. Defined here because only this template uses it.
function ProjectCard({ project }) {
  const links = [
    { label: 'GitHub', url: project.githubUrl },
    { label: 'Live site', url: project.liveUrl },
  ].filter((link) => isHttpUrl(link.url))

  return (
    <article className="cyber-card">
      {isHttpUrl(project.imageUrl) && (
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="cyber-card-image"
        />
      )}
      <h3 className="cyber-card-title">{project.title}</h3>
      {project.description && (
        <p className="cyber-card-description">{project.description}</p>
      )}
      {links.length > 0 && (
        <div className="cyber-card-links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="cyber-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

// A dark, high-contrast, neon layout.
// `data` is the portfolio: { username, templateId, profile, projects, skills }
function CyberpunkTemplate({ data, embedded = false }) {
  const PageContent = embedded ? 'div' : 'main'
  const { profile = {}, projects = [], skills = [], certificates = [] } = data
  const links = getProfileLinks(profile)

  return (
    <div className="cyber">
      <PageContent className="cyber-page">
        {/* ---------- Header ---------- */}
        <header className="cyber-header">
          {isHttpUrl(profile.photoUrl) && (
            <img
              src={profile.photoUrl}
              alt={profile.fullName ? `Portrait of ${profile.fullName}` : 'Profile photo'}
              className="mb-4 size-24 rounded-xl border border-cyan-400/60 object-cover"
            />
          )}
          <h1 className="cyber-name">{profile.fullName}</h1>
          {profile.headline && <p className="cyber-headline">{profile.headline}</p>}
          {profile.location && <p className="cyber-location">{profile.location}</p>}
        </header>

        {/* ---------- About ---------- */}
        {profile.bio && <p className="cyber-bio">{profile.bio}</p>}

        {/* ---------- Links ---------- */}
        {links.length > 0 && (
          <nav className="cyber-links" aria-label="Links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="cyber-link"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* ---------- Skills ---------- */}
        {skills.length > 0 && (
          <section>
            <h2 className="cyber-section-title">Skills</h2>
            {skills.map((skill, index) => (
              <div key={index} className="cyber-skill-group">
                <h3 className="cyber-skill-category">{skill.category}</h3>
                <ul className="cyber-chips">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="cyber-chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* ---------- Projects ---------- */}
        {projects.length > 0 && (
          <section>
            <h2 className="cyber-section-title">Projects</h2>
            <div className="cyber-projects">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </section>
        )}
        <PortfolioTimeline entries={data.timeline} variant="cyberpunk" />
        <CertificateGallery certificates={certificates} variant="cyberpunk" />
      </PageContent>
    </div>
  )
}

export default CyberpunkTemplate