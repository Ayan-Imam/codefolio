import { useFieldArray, useFormContext } from 'react-hook-form'
import FormField from '../common/FormField.jsx'
import Button from '../common/Button.jsx'
import SectionCard from './SectionCard.jsx'
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
    <SectionCard
      id="skills"
      title="Skills"
      description="Group your skills into categories, like Frontend or Tools."
      action={
        <Button
          variant="secondary"
          size="sm"
          onClick={() => append({ category: '', itemsText: '' })}
        >
          + Add category
        </Button>
      }
    >
      {fields.length === 0 && (
        <p className="text-sm text-ink-400">
          No skill categories yet. Click "Add category" to start.
        </p>
      )}

      {fields.map((field, index) => {
        const rowErrors = errors.skills?.[index] || {}

        return (
          <div
            key={field.id}
            className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
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

            <Button
              variant="danger"
              size="sm"
              className="self-start"
              onClick={() => remove(index)}
            >
              Remove category
            </Button>
          </div>
        )
      })}
    </SectionCard>
  )
}

export default SkillsSection