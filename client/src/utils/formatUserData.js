// Turns "React, Node.js , " into ['React', 'Node.js']
export const parseSkillItems = (text = '') =>
  text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

// Converts the form's shape into the shape the API expects.
// Only skills differ: the form has `itemsText`, the API wants an `items` array.
export const toApiPayload = (data) => ({
  ...data,
  skills: (data.skills || []).map((skill) => ({
    category: skill.category,
    items: parseSkillItems(skill.itemsText),
  })),
})