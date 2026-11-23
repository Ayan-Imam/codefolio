import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import Button from '../common/Button.jsx'
import FormField from '../common/FormField.jsx'
import SectionCard from './SectionCard.jsx'
import { inputClass, rowClass } from '../../utils/formStyles.js'

const emptyEntry = {
  type: 'education',
  title: '',
  organization: '',
  startMonth: '',
  endMonth: '',
  description: '',
}

function TimelineRow({ index, onRemove }) {
  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = useFormContext()

  const path = `timeline.${index}`
  const type = useWatch({ control, name: `${path}.type` })
  const isEducation = type === 'education'
  const rowErrors = errors.timeline?.[index] ?? {}

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <FormField label="Entry type">
        <select className={inputClass} {...register(`${path}.type`)}>
          <option value="education">Education</option>
          <option value="experience">Experience</option>
        </select>
      </FormField>

      <div className={rowClass}>
        <FormField label={isEducation ? 'Degree *' : 'Role *'} error={rowErrors.title}>
          <input
            className={inputClass}
            placeholder={isEducation ? 'B.Tech in Computer Science' : 'Frontend Developer Intern'}
            maxLength={120}
            {...register(`${path}.title`, { required: 'Enter a degree or role' })}
          />
        </FormField>

        <FormField
          label={isEducation ? 'Institution *' : 'Company *'}
          error={rowErrors.organization}
        >
          <input
            className={inputClass}
            maxLength={120}
            {...register(`${path}.organization`, {
              required: 'Enter an institution or company',
            })}
          />
        </FormField>
      </div>

      <div className={rowClass}>
        <FormField label="Start month *" error={rowErrors.startMonth}>
          <input
            type="month"
            className={inputClass}
            {...register(`${path}.startMonth`, {
              required: 'Choose a start month',
              deps: [`${path}.endMonth`],
            })}
          />
        </FormField>

        <FormField
          label="End month"
          hint="Leave blank if this is ongoing."
          error={rowErrors.endMonth}
        >
          <input
            type="month"
            className={inputClass}
            {...register(`${path}.endMonth`, {
              validate: (value) =>
                !value ||
                value >= getValues(`${path}.startMonth`) ||
                'Choose an end month on or after the start month',
            })}
          />
        </FormField>
      </div>

      <FormField label="Description" error={rowErrors.description}>
        <textarea
          rows={3}
          maxLength={1000}
          className={inputClass}
          {...register(`${path}.description`)}
        />
      </FormField>

      <Button variant="danger" size="sm" className="self-start" onClick={onRemove}>
        Remove entry
      </Button>
    </div>
  )
}

function TimelineSection() {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'timeline' })

  return (
    <SectionCard
      id="timeline"
      title="Education & experience"
      description="Add your education, internships, and work experience."
      action={
        <Button variant="secondary" size="sm" onClick={() => append({ ...emptyEntry })}>
          + Add entry
        </Button>
      }
    >
      {fields.map((field, index) => (
        <TimelineRow key={field.id} index={index} onRemove={() => remove(index)} />
      ))}
    </SectionCard>
  )
}

export default TimelineSection