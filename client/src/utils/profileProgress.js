import { parseSkillItems } from './formatUserData.js'
import { getProfileLinks } from './portfolioData.js'

// Turns the live form values into the numbers shown on the stat cards.
// `values` has the form's shape: skills use `itemsText`, not `items`.
export const getProfileProgress = (values = {}) => {
  const profile = values.profile || {}
  const skills = (values.skills || []).filter(Boolean)
  const projects = (values.projects || []).filter((project) => project && project.title)

  const checks = [
    { label: 'choose a username', done: Boolean(values.username) },
    { label: 'add your full name', done: Boolean(profile.fullName) },
    { label: 'write a headline', done: Boolean(profile.headline) },
    { label: 'write a short bio', done: Boolean(profile.bio) },
    { label: 'add a link', done: getProfileLinks(profile).length > 0 },
    {
      label: 'add a skill category',
      done: skills.some(
        (skill) => skill.category && parseSkillItems(skill.itemsText).length > 0
      ),
    },
    { label: 'add a project', done: projects.length > 0 },
  ]

  const done = checks.filter((check) => check.done).length
  const nextCheck = checks.find((check) => !check.done)

  return {
    percent: Math.round((done / checks.length) * 100),
    nextStep: nextCheck ? nextCheck.label : null,
    skillCategoryCount: skills.filter((skill) => skill.category).length,
    skillCount: skills.reduce(
      (total, skill) => total + parseSkillItems(skill.itemsText).length,
      0
    ),
    projectCount: projects.length,
  }
}