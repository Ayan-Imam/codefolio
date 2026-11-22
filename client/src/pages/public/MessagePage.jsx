// A simple full-screen message, used for loading, "not found" and error states
function MessagePage({ title, message }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-900 px-6 text-center">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {message && <p className="text-slate-400">{message}</p>}
    </div>
  )
}

export default MessagePage