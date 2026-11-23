import { Helmet } from 'react-helmet-async'

// Full class names are written out so Tailwind can find every one of them
const inkSwatches = [
  { name: 'ink-950', className: 'bg-ink-950' },
  { name: 'ink-900', className: 'bg-ink-900' },
  { name: 'ink-800', className: 'bg-ink-800' },
  { name: 'ink-700', className: 'bg-ink-700' },
  { name: 'ink-400', className: 'bg-ink-400' },
  { name: 'ink-300', className: 'bg-ink-300' },
  { name: 'ink-100', className: 'bg-ink-100' },
]

const brandSwatches = [
  { name: 'brand-300', className: 'bg-brand-300' },
  { name: 'brand-400', className: 'bg-brand-400' },
  { name: 'brand-500', className: 'bg-brand-500' },
  { name: 'brand-600', className: 'bg-brand-600' },
  { name: 'ember-400', className: 'bg-ember-400' },
]

const swatchGrid = 'grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-3'

function SwatchGroup({ title, swatches }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
      <div className={swatchGrid}>
        {swatches.map((swatch) => (
          <div key={swatch.name} className="flex flex-col gap-2">
            <div className={`h-16 rounded-xl border border-white/10 ${swatch.className}`} />
            <span className="text-xs text-ink-300">{swatch.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// A private page for checking the design system while we build it.
// Not part of the product.
function StyleGuidePage() {
  return (
    <div className="app-bg px-6 py-10">
      <Helmet>
        <title>Style guide - CodeFolio</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-300">
            Design foundation
          </p>
          <h1 className="font-display text-4xl font-bold text-white">
            Build a portfolio that feels real.
          </h1>
          <p className="max-w-xl text-ink-300">
            Body text uses Inter. Headings use Space Grotesk. Muted text uses ink-300 on a
            near-black background with a soft warm and blue glow.
          </p>
        </header>

        {/* A sample glass card: it should look see-through over the glow */}
        <section className="rounded-card border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="font-display text-xl font-semibold text-white">Glass card</h2>
          <p className="mt-2 text-ink-300">
            Thin light border, 5% white fill, rounded corners and a slight blur. Most of
            the dashboard will be built from cards like this one.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-medium text-white">
              Brand pill
            </span>
            <span className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-ink-200">
              Outline pill
            </span>
          </div>
        </section>

        <SwatchGroup title="Ink (backgrounds and text)" swatches={inkSwatches} />
        <SwatchGroup title="Brand and accent" swatches={brandSwatches} />
      </div>
    </div>
  )
}

export default StyleGuidePage