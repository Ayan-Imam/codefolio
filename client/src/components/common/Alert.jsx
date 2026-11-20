// A small success/error message box.
// The full class strings are written out so Tailwind can find them.
const styles = {
  success: 'border-emerald-500 bg-emerald-950 text-emerald-300',
  error: 'border-red-500 bg-red-950 text-red-300',
}

function Alert({ type, children }) {
  return (
    <div
      role="alert"
      className={`rounded-md border px-4 py-3 text-sm ${styles[type]}`}
    >
      {children}
    </div>
  )
}

export default Alert