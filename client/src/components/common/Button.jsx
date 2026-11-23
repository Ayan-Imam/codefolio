// Full class strings, so Tailwind can find every one of them
const variants = {
  primary: 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:bg-brand-400',
  secondary: 'border border-white/15 bg-white/5 text-ink-100 hover:bg-white/10',
  ghost: 'text-ink-300 hover:bg-white/5 hover:text-white',
  danger: 'text-red-300 hover:bg-red-500/10',
}

const sizes = {
  md: 'px-4 py-2 text-sm',
  sm: 'px-3 py-1.5 text-xs',
}

// type defaults to "button", so a button inside a form never submits it by accident.
// Pass type="submit" on the one that should.
function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 disabled:cursor-not-allowed disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

export default Button