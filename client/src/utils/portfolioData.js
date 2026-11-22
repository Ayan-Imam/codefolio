import { isHttpUrl } from './formRules.js'

const socialLabels = [
  ['github', 'GitHub'],
  ['linkedin', 'LinkedIn'],
  ['twitter', 'Twitter / X'],
  ['website', 'Website'],
]

// Builds the list of valid profile links (resume + social links) for any template.
// Returns [{ label: 'GitHub', url: 'https://...' }, ...] with invalid or empty URLs removed.
export const getProfileLinks = (profile = {}) => {
  const social = profile.socialLinks || {}

  return [
    { label: 'Resume', url: profile.resumeUrl },
    ...socialLabels.map(([key, label]) => ({ label, url: social[key] })),
  ].filter((link) => isHttpUrl(link.url))
}