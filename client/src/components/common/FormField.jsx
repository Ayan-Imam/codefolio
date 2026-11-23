// A label + input + error message, reused by every form in the dashboard.
// `children` is the input itself, and `error` comes from React Hook Form.
function FormField({ label, hint, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-100">{label}</span>
      {children}
      {error ? (
        <span className="text-xs text-red-400">{error.message}</span>
      ) : (
        hint && <span className="text-xs text-ink-400">{hint}</span>
      )}
    </label>
  )
}

export default FormField