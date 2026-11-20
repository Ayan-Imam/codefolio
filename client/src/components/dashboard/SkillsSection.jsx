import { useFieldArray, useFormContext } from 'react-hook-form'
import FormField from '../common/FormField.jsx'
import { inputClass, rowClass } from '../../utils/formStyles.js'
import { parseSkillItems } from '../../utils/formatUserData.js'

function SkillsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({ control, name: 'skills' })

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-emerald-400">Skills</h2>
        <button
          type="button"
          onClick={() => append({ category: '', itemsText: '' })}
          className="rounded-md border border-emerald-400 px-3 py-1 text-sm text-emerald-400 hover:bg-emerald-400 hover:text-slate-900"
        >
          + Add category
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-slate-400">
          No skill categories yet. Click "Add category" to start.
        </p>
      )}

      {fields.map((field, index) => {
        const rowErrors = errors.skills?.[index] || {}

        return (
          <div
            key={field.id}
            className="flex flex-col gap-4 rounded-lg border border-slate-700 p-4"
          >
            <div className={rowClass}>
              <FormField label="Category *" error={rowErrors.category}>
                <input
                  className={inputClass}
                  placeholder="Frontend"
                  {...register(`skills.${index}.category`, {
                    required: 'Category name is required',
                    maxLength: { value: 50, message: 'At most 50 characters' },
                  })}
                />
              </FormField>

              <FormField
                label="Skills"
                hint="Separate with commas"
                error={rowErrors.itemsText}
              >
                <input
                  className={inputClass}
                  placeholder="React, Tailwind CSS"
                  {...register(`skills.${index}.itemsText`, {
                    validate: (value) =>
                      parseSkillItems(value).every((item) => item.length <= 50) ||
                      'Each skill must be 50 characters or fewer',
                  })}
                />
              </FormField>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="self-start text-sm text-red-400 hover:text-red-300"
            >
              Remove category
            </button>
          </div>
        )
      })}
    </section>
  )
}

export default SkillsSection