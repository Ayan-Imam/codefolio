import { useFormContext } from 'react-hook-form'
import FormField from '../common/FormField.jsx'
import Button from '../common/Button.jsx'
import SectionCard from './SectionCard.jsx'
import SkillsSection from './SkillsSection.jsx'
import ProjectsSection from './ProjectsSection.jsx'
import { inputClass, rowClass } from '../../utils/formStyles.js'
import { URL_RULE } from '../../utils/formRules.js'

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
    <form  id="portfolio-form" onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      {/* ---------- Basic info ---------- */}
      <SectionCard
        id="profile"
        title="Basic info"
        description="Your name, headline and a short bio. This is the first thing visitors see."
      >
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

          <FormField label="Contact email" hint="Optional" error={profileErrors.email}>
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
      </SectionCard>

      {/* ---------- Links ---------- */}
      <SectionCard
        id="links"
        title="Links"
        description="Where visitors can find you and your resume."
      >
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
      </SectionCard>

      {/* ---------- Repeating sections ---------- */}
      <SkillsSection />
      <ProjectsSection />

      <Button type="submit" disabled={isSubmitting} className="py-3 text-base">
        {isSubmitting ? 'Saving...' : 'Save portfolio'}
      </Button>
    </form>
  )
}

export default DashboardForm