import { useFieldArray, useFormContext } from 'react-hook-form'
import FormField from '../common/FormField.jsx'
import { inputClass, rowClass } from '../../utils/formStyles.js'
import { URL_RULE } from '../../utils/formRules.js'

const emptyProject = {
  title: '',
  description: '',
  imageUrl: '',
  githubUrl: '',
  liveUrl: '',
}

function ProjectsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({ control, name: 'projects' })

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-emerald-400">Projects</h2>
        <button
          type="button"
          onClick={() => append(emptyProject)}
          className="rounded-md border border-emerald-400 px-3 py-1 text-sm text-emerald-400 hover:bg-emerald-400 hover:text-slate-900"
        >
          + Add project
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-slate-400">
          No projects yet. Click "Add project" to start.
        </p>
      )}

      {fields.map((field, index) => {
        const rowErrors = errors.projects?.[index] || {}

        return (
          <div
            key={field.id}
            className="flex flex-col gap-4 rounded-lg border border-slate-700 p-4"
          >
            <h3 className="text-sm font-semibold text-slate-300">
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

            <FormField
              label="Screenshot URL"
              hint="Image upload comes later; for now paste a link"
              error={rowErrors.imageUrl}
            >
              <input
                className={inputClass}
                placeholder="https://..."
                {...register(`projects.${index}.imageUrl`, { pattern: URL_RULE })}
              />
            </FormField>

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

            <button
              type="button"
              onClick={() => remove(index)}
              className="self-start text-sm text-red-400 hover:text-red-300"
            >
              Remove project
            </button>
          </div>
        )
      })}
    </section>
  )
}

export default ProjectsSection