// The glass panel used all over the app.
// `as` lets a card be a different element, e.g. <Card as="section">.
function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={`rounded-card border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Card