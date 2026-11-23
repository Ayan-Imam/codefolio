import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Alert from '../common/Alert.jsx'
import FormField from '../common/FormField.jsx'
import { URL_RULE } from '../../utils/formRules.js'
import { inputClass } from '../../utils/formStyles.js'

function ImageUploadField({ name, label, error, onUpload }) {
  const { register, setValue } = useFormContext()
  const [uploadError, setUploadError] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  async function handleFileChange(event) {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.value = ''

    if (!file) return

    setUploadError('')
    setIsUploading(true)

    try {
      const { url } = await onUpload(file)
      setValue(name, url, { shouldDirty: true, shouldValidate: true })
    } catch (requestError) {
      setUploadError(requestError.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <FormField label={`${label} URL`} error={error}>
        <input
          className={inputClass}
          placeholder="https://..."
          {...register(name, { pattern: URL_RULE })}
        />
      </FormField>

      <label className="flex flex-col gap-2 text-sm text-ink-200">
        Upload {label.toLowerCase()}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className={inputClass}
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>

      <p className="text-xs text-ink-300">JPEG, PNG, or WebP up to 5 MB.</p>
      {isUploading && <p role="status">Uploading image…</p>}
      {uploadError && <Alert type="error">{uploadError}</Alert>}
    </div>
  )
}

export default ImageUploadField