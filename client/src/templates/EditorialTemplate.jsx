import { getProfileLinks } from '../utils/portfolioData.js'
import { isHttpUrl } from '../utils/formRules.js'
import PortfolioTimeline from './PortfolioTimeline.jsx'
import CertificateGallery from './CertificateGallery.jsx'

const linkClass =
    'text-sm font-medium text-[#783b2b] underline decoration-[#b98672] ' +
    'underline-offset-4 hover:decoration-current'

function EditorialTemplate({ data, embedded = false }) {
    const {
        username,
        profile = {},
        projects = [],
        skills = [],
        timeline = [],
        certificates = [],
    } = data

    const PageContent = embedded ? 'div' : 'main'
    const name = profile.fullName || username || 'Your name'
    const profileLinks = getProfileLinks(profile)

    return (
        <div className="@container bg-[#f7f3e9] text-[#29271f] [color-scheme:light]">
            <PageContent
                className="mx-auto max-w-5xl px-5 py-8 font-sans [overflow-wrap:anywhere]
          @xl:px-12 @xl:py-14 [&_h2]:font-serif [&_h2]:text-3xl"
            >
                <header className="border-y-2 border-[#494637] py-7">
                    <div className="flex flex-wrap items-center justify-between gap-5">
                        <div className="min-w-0 flex-1 basis-56">
                            <h1 className="font-serif text-4xl leading-tight tracking-tight @xl:text-6xl">
                                {name}
                                
                                {data.isPro === true && (
                                    <span className="ml-2 inline-block align-middle rounded-full bg-indigo-700 px-2 py-0.5 font-sans text-xs font-semibold text-white">
                                        Pro
                                    </span>
                                )}

                            </h1>
                            {profile.headline && (
                                <p className="mt-3 text-lg text-[#783b2b]">{profile.headline}</p>
                            )}
                            {profile.location && (
                                <p className="mt-1 text-sm text-[#615e51]">{profile.location}</p>
                            )}
                        </div>

                        {isHttpUrl(profile.photoUrl) && (
                            <img
                                src={profile.photoUrl}
                                alt={`Portrait of ${name}`}
                                className="h-32 w-24 rounded-sm object-cover @xl:h-44 @xl:w-36"
                            />
                        )}
                    </div>

                    {profile.bio && (
                        <p className="mt-6 max-w-2xl whitespace-pre-line leading-7">{profile.bio}</p>
                    )}

                    {profileLinks.length > 0 && (
                        <nav aria-label="Profile links" className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                            {profileLinks.map(({ label, url }) => (
                                <a key={label} href={url} target="_blank" rel="noreferrer" className={linkClass}>
                                    {label}
                                </a>
                            ))}
                        </nav>
                    )}
                </header>

                {projects.length > 0 && (
                    <section className="mt-9">
                        <h2>Selected projects</h2>

                        {projects.map((project, index) => (
                            <article
                                key={project._id ?? index}
                                className="mt-4 flex flex-wrap items-start gap-5 border-t border-[#c6bfac] pt-5"
                            >
                                {isHttpUrl(project.imageUrl) && (
                                    <img
                                        src={project.imageUrl}
                                        alt={`${project.title} screenshot`}
                                        loading="lazy"
                                        className="w-full rounded-sm object-contain @xl:w-2/5"
                                    />
                                )}

                                <div className="min-w-0 flex-1 basis-48">
                                    <h3 className="font-serif text-2xl">{project.title}</h3>
                                    {project.description && (
                                        <p className="mt-2 whitespace-pre-line leading-7">{project.description}</p>
                                    )}
                                    <div className="mt-3 flex flex-wrap gap-4">
                                        {isHttpUrl(project.githubUrl) && (
                                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className={linkClass}>
                                                Source code
                                            </a>
                                        )}
                                        {isHttpUrl(project.liveUrl) && (
                                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className={linkClass}>
                                                Live project
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                )}

                {skills.length > 0 && (
                    <section className="mt-9 border-t border-[#c6bfac] pt-5">
                        <h2>Skills</h2>
                        <dl className="mt-4 grid gap-4 @xl:grid-cols-2">
                            {skills.map((skill, index) => (
                                <div key={skill._id ?? index}>
                                    <dt className="font-semibold">{skill.category}</dt>
                                    <dd className="mt-1 text-[#615e51]">{(skill.items ?? []).join(', ')}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                <PortfolioTimeline entries={timeline} />
                <CertificateGallery certificates={certificates} />
            </PageContent>
        </div>
    )
}

export default EditorialTemplate