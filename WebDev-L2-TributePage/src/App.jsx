import people from './data/people'
import PersonSection from './components/PersonSection'

function App() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white py-20 md:py-32 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Legends Who Shaped Our World
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-[Inter]">
            Honoring four extraordinary individuals whose vision, intellect, and
            humanity have left an indelible mark on science, faith, technology,
            and industry.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {people.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-[Inter]"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background:
                      `linear-gradient(135deg, ${p.gradient.includes('blue') ? '#3b82f6' : p.gradient.includes('emerald') ? '#059669' : p.gradient.includes('amber') ? '#d97706' : '#dc2626'}, ${p.gradient.includes('indigo') ? '#4338ca' : p.gradient.includes('teal') ? '#0d9488' : p.gradient.includes('orange') ? '#ea580c' : '#be123c'})`,
                  }}
                />
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Person Sections */}
      {people.map((person) => (
        <article key={person.id} id={person.id}>
          <PersonSection person={person} />
        </article>
      ))}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 text-center font-[Inter]">
        <p className="text-sm">
          Tribute Page &middot; Built with React &amp; Tailwind CSS
        </p>
        <p className="text-xs mt-1">
          Images sourced from Wikimedia Commons &amp; Unsplash
        </p>
      </footer>
    </div>
  )
}

export default App
