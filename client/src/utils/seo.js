// Search results show roughly the first 155 to 160 characters of a description
const MAX_DESCRIPTION_LENGTH = 160

// Collapses spaces and line breaks, then shortens the text to `max` characters
export const truncate = (text, max = MAX_DESCRIPTION_LENGTH) => {
  const clean = (text || '').replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean
}

// Builds the page title and meta description for one portfolio.
// `user` is the portfolio data: { username, profile: { fullName, headline, bio }, ... }
export const getPortfolioSeo = (user) => {
  const { fullName, headline, bio } = user.profile || {}
  const name = fullName || user.username

  // The bio is optional, so fall back to something useful instead of an empty description
  let description
  if (bio) {
    description = truncate(bio)
  } else if (headline) {
    description = `${name} - ${headline}. Portfolio built with CodeFolio.`
  } else {
    description = `${name}'s developer portfolio, built with CodeFolio.`
  }

  return { title: `${name} - CodeFolio`, description }
}