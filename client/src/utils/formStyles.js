// Shared input styling, so every form field looks the same.
// Written as full strings so Tailwind can detect every class.
export const inputClass =
  'w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none'

// Columns appear when there is room and wrap to one column when there is not
export const rowClass =
  'grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4'