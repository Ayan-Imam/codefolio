import { useFieldArray, useFormContext } from 'react-hook-form'
import FormField from '../common/FormField.jsx'
import Button from '../common/Button.jsx'
import SectionCard from './SectionCard.jsx'
import { inputClass, rowClass } from '../../utils/formStyles.js'
import { URL_RULE } from '../../utils/formRules.js'
import ImageUploadField from './ImageUploadField.jsx'

const emptyProject = {
  title: '',
  description: '',
  imageUrl: '',
  githubUrl: '',
  liveUrl: '',
}

function ProjectsSection({ onImageUpload }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({ control, name: 'projects' })

  return (
    <SectionCard
      id="projects"
      title="Projects"
      description="Show your best work. Each project can link to its code and a live demo."
      action={
        <Button variant="secondary" size="sm" onClick={() => append(emptyProject)}>
          + Add project
        </Button>
      }
    >
      {fields.length === 0 && (
        <p className="text-sm text-ink-400">
          No projects yet. Click "Add project" to start.
        </p>
      )}

      {fields.map((field, index) => {
        const rowErrors = errors.projects?.[index] || {}

        return (
          <div
            key={field.id}
            className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <h3 className="font-display text-sm font-semibold text-ink-200">
              Project {index + 1}
            </h3>

            <FormField label="Title *" error={rowErrors.title}>
              <input
                className={inputClass}
                placeholder="CodeFolio"
                {...register(`projects.${index}.title`, {
                  required: 'Project title is required',
                  maxLength: { value: 100, message: 'At most 100 characters' },
                })}
              />
            </FormField>

            <FormField label="Description" error={rowErrors.description}>
              <textarea
                rows={3}
                className={inputClass}
                placeholder="What does it do? What did you build it with?"
                {...register(`projects.${index}.description`, {
                  maxLength: { value: 1000, message: 'At most 1000 characters' },
                })}
              />
            </FormField>

            <ImageUploadField
              name={`projects.${index}.imageUrl`}
              label="Screenshot"
              error={rowErrors.imageUrl}
              onUpload={onImageUpload}
            />

            <div className={rowClass}>
              <FormField label="GitHub repo" error={rowErrors.githubUrl}>
                <input
                  className={inputClass}
                  placeholder="https://github.com/..."
                  {...register(`projects.${index}.githubUrl`, { pattern: URL_RULE })}
                />
              </FormField>

              <FormField label="Live link" error={rowErrors.liveUrl}>
                <input
                  className={inputClass}
                  placeholder="https://..."
                  {...register(`projects.${index}.liveUrl`, { pattern: URL_RULE })}
                />
              </FormField>
            </div>

            <Button
              variant="danger"
              size="sm"
              className="self-start"
              onClick={() => remove(index)}
            >
              Remove project
            </Button>
          </div>
        )
      })}
    </SectionCard>
  )
}

export default ProjectsSection