// A small success/error message box.
// The full class strings are written out so Tailwind can find them.
const styles = {
  success: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  error: 'border-red-400/40 bg-red-500/10 text-red-200',
}

function Alert({ type, children }) {
  return (
    <div
      role="alert"
      className={`rounded-lg border px-4 py-3 text-sm ${styles[type]}`}
    >
      {children}
    </div>
  )
}

export default Alert