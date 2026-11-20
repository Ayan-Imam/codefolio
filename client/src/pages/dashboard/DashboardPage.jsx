import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import DashboardForm from '../../components/dashboard/DashboardForm.jsx'
import PortfolioPreview from '../../components/dashboard/PortfolioPreview.jsx'
import Alert from '../../components/common/Alert.jsx'
import { createUser } from '../../services/userService.js'
import { toApiPayload } from '../../utils/formatUserData.js'

// Starting values for the form (same nesting as the User model on the server;
// skills use `itemsText` here and are converted to `items` by toApiPayload)
const defaultValues = {
  username: '',
  profile: {
    fullName: '',
    headline: '',
    bio: '',
    location: '',
    email: '',
    resumeUrl: '',
    socialLinks: { github: '', linkedin: '', twitter: '', website: '' },
  },
  projects: [],
  skills: [],
}

function DashboardPage() {
  const methods = useForm({ defaultValues })

  // null = nothing to show, otherwise { type: 'success' | 'error', message }
  const [status, setStatus] = useState(null)

  // async + await: the form stays in "submitting" mode until the request finishes
  const handleSave = async (data) => {
    setStatus(null)

    try {
      const user = await createUser(toApiPayload(data))
      setStatus({
        type: 'success',
        message: `Saved! Portfolio created for "${user.username}".`,
      })
    } catch (error) {
      // error.message comes from the server's { message } reply (see api.js)
      setStatus({ type: 'error', message: error.message })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Portfolio Builder</h1>

        {/* The provider wraps BOTH columns so the preview can read the form */}
        <FormProvider {...methods}>
          {/* flex-wrap: side by side when there is room, stacked when there is not */}
          <div className="flex flex-wrap items-start gap-8">
            <div className="grow basis-[28rem]">
              <DashboardForm onSubmit={handleSave} />

              {status && (
                <div className="mt-6">
                  <Alert type={status.type}>{status.message}</Alert>
                </div>
              )}
            </div>

            <aside className="sticky top-6 max-h-[calc(100vh-3rem)] grow basis-[22rem] overflow-y-auto">
              <PortfolioPreview />
            </aside>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default DashboardPage