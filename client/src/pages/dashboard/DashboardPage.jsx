import { useForm, FormProvider } from 'react-hook-form'
import DashboardForm from '../../components/dashboard/DashboardForm.jsx'
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

  // For now we only log the data. Task 2.6 replaces this with the API call.
  const handleSave = (data) => {
    console.log('Payload ready to send:', toApiPayload(data))
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Portfolio Builder</h1>

        <FormProvider {...methods}>
          <DashboardForm onSubmit={handleSave} />
        </FormProvider>
      </div>
    </div>
  )
}

export default DashboardPage