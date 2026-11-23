// A fake browser window around its children: three dots and an address bar.
// `url` is the text shown in the address bar.
function BrowserFrame({ url, children }) {
  return (
    <div className="overflow-hidden rounded-card border border-white/10 bg-ink-900/70 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-red-400/70" />
          <span className="size-3 rounded-full bg-amber-300/70" />
          <span className="size-3 rounded-full bg-emerald-400/70" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-ink-950/70 px-3 py-1 text-xs text-ink-300">
          {url}
        </span>
      </div>

      <div className="p-5">{children}</div>
    </div>
  )
}

export default BrowserFrame