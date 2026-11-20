import { useFormContext } from 'react-hook-form'
import FormField from '../common/FormField.jsx'
import { inputClass } from '../../utils/formStyles.js'

const URL_RULE = {
  value: /^https?:\/\/\S+$/i,
  message: 'Must start with http:// or https://',
}

// Columns appear when there is room and wrap to one column when there is not
const rowClass = 'grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4'

function DashboardForm({ onSubmit }) {
  // The form is created in DashboardPage and shared through FormProvider
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const profileErrors = errors.profile || {}
  const socialErrors = profileErrors.socialLinks || {}

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
      {/* ---------- Basic info ---------- */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-emerald-400">Basic info</h2>

        <div className={rowClass}>
          <FormField
            label="Username *"
            hint="Becomes your portfolio URL"
            error={errors.username}
          >
            <input
              className={inputClass}
              placeholder="jane_dev"
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'At least 3 characters' },
                maxLength: { value: 30, message: 'At most 30 characters' },
                pattern: {
                  value: /^[a-z0-9_-]+$/i,
                  message: 'Only letters, numbers, underscores and hyphens',
                },
              })}
            />
          </FormField>

          <FormField label="Full name *" error={profileErrors.fullName}>
            <input
              className={inputClass}
              placeholder="Jane Dev"
              {...register('profile.fullName', {
                required: 'Full name is required',
                maxLength: { value: 80, message: 'At most 80 characters' },
              })}
            />
          </FormField>
        </div>

        <FormField label="Headline" error={profileErrors.headline}>
          <input
            className={inputClass}
            placeholder="Full Stack Developer"
            {...register('profile.headline', {
              maxLength: { value: 120, message: 'At most 120 characters' },
            })}
          />
        </FormField>

        <FormField label="Bio" error={profileErrors.bio}>
          <textarea
            rows={4}
            className={inputClass}
            placeholder="Tell visitors a little about yourself"
            {...register('profile.bio', {
              maxLength: { value: 1000, message: 'At most 1000 characters' },
            })}
          />
        </FormField>

        <div className={rowClass}>
          <FormField label="Location" error={profileErrors.location}>
            <input
              className={inputClass}
              placeholder="Kolkata, India"
              {...register('profile.location', {
                maxLength: { value: 80, message: 'At most 80 characters' },
              })}
            />
          </FormField>

          <FormField
            label="Contact email"
            hint="Optional"
            error={profileErrors.email}
          >
            <input
              type="email"
              className={inputClass}
              placeholder="jane@example.com"
              {...register('profile.email', {
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
          </FormField>
        </div>
      </section>

      {/* ---------- Links ---------- */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-emerald-400">Links</h2>

        <FormField label="Resume URL" error={profileErrors.resumeUrl}>
          <input
            className={inputClass}
            placeholder="https://..."
            {...register('profile.resumeUrl', { pattern: URL_RULE })}
          />
        </FormField>

        <div className={rowClass}>
          <FormField label="GitHub" error={socialErrors.github}>
            <input
              className={inputClass}
              placeholder="https://github.com/..."
              {...register('profile.socialLinks.github', { pattern: URL_RULE })}
            />
          </FormField>

          <FormField label="LinkedIn" error={socialErrors.linkedin}>
            <input
              className={inputClass}
              placeholder="https://linkedin.com/in/..."
              {...register('profile.socialLinks.linkedin', { pattern: URL_RULE })}
            />
          </FormField>

          <FormField label="Twitter / X" error={socialErrors.twitter}>
            <input
              className={inputClass}
              placeholder="https://x.com/..."
              {...register('profile.socialLinks.twitter', { pattern: URL_RULE })}
            />
          </FormField>

          <FormField label="Website" error={socialErrors.website}>
            <input
              className={inputClass}
              placeholder="https://..."
              {...register('profile.socialLinks.website', { pattern: URL_RULE })}
            />
          </FormField>
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save portfolio'}
      </button>
    </form>
  )
}

export default DashboardForm