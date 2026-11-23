import { useFieldArray, useFormContext } from 'react-hook-form'
import FormField from '../common/FormField.jsx'
import ImageUploadField from './ImageUploadField.jsx'
import SectionCard from './SectionCard.jsx'
import { inputClass } from '../../utils/formStyles.js'

function CertificatesSection({ onImageUpload }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certificates',
  })

  return (
    <SectionCard id="certificates" title="Certificates">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => {
          const name = `certificates.${index}`
          const rowErrors = errors.certificates?.[index] ?? {}

          return (
            <div key={field.id} className="flex flex-col gap-3 rounded-xl border border-white/10 p-4">
              <FormField label="Certificate title *" error={rowErrors.title}>
                <input
                  className={inputClass}
                  {...register(`${name}.title`, {
                    required: 'Certificate title is required',
                  })}
                />
              </FormField>

              <FormField label="Issuer *" error={rowErrors.issuer}>
                <input
                  className={inputClass}
                  {...register(`${name}.issuer`, {
                    required: 'Issuer is required',
                  })}
                />
              </FormField>

              <FormField label="Issue month">
                <input type="month" className={inputClass} {...register(`${name}.issuedMonth`)} />
              </FormField>

              <ImageUploadField
                name={`${name}.imageUrl`}
                label="Certificate image"
                error={rowErrors.imageUrl}
                onUpload={onImageUpload}
              />

              <button
                type="button"
                className="self-start text-sm text-red-300"
                onClick={() => remove(index)}
              >
                Remove certificate
              </button>
            </div>
          )
        })}

        <button
          type="button"
          className="self-start rounded-lg border border-white/15 px-3 py-2 text-sm"
          onClick={() => append({ title: '', issuer: '', issuedMonth: '', imageUrl: '' })}
        >
          + Add certificate
        </button>
      </div>
    </SectionCard>
  )
}

export default CertificatesSection