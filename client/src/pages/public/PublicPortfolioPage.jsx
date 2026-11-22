import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PortfolioRenderer from '../../components/common/PortfolioRenderer.jsx'
import MessagePage from './MessagePage.jsx'
import { getUserByUsername } from '../../services/userService.js'

function PublicPortfolioPage() {
  // The :username part of the URL, e.g. "neon_user" for /neon_user
  const { username } = useParams()

  // The result remembers which username it belongs to
  const [result, setResult] = useState({ username: null, user: null, error: null })

  useEffect(() => {
    // If the username changes (or the page closes) before a response arrives,
    // the cleanup below flips this flag so the stale response is ignored
    let ignore = false

    getUserByUsername(username)
      .then((user) => {
        if (!ignore) setResult({ username, user, error: null })
      })
      .catch((error) => {
        if (!ignore) setResult({ username, user: null, error })
      })

    return () => {
      ignore = true
    }
  }, [username])

  // No result for the current username yet
  if (result.username !== username) {
    return <MessagePage title="Loading portfolio..." />
  }

  if (result.error) {
    return result.error.status === 404 ? (
      <MessagePage title="Portfolio not found" message={result.error.message} />
    ) : (
      <MessagePage
        title="Something went wrong"
        message="We could not load this portfolio. Please try again later."
      />
    )
  }

  return <PortfolioRenderer userData={result.user} />
}

export default PublicPortfolioPage