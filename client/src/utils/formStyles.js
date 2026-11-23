// Shared input styling, so every form field looks the same.
// Written as full strings so Tailwind can detect every class.
export const inputClass =
  'w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2 text-sm text-white transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30'

// Columns appear when there is room and wrap to one column when there is not
export const rowClass =
  'grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4'