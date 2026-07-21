import { useState } from 'react'

function PersonSection({ person }) {
  const [imgError, setImgError] = useState(false)

  return (
    <section className={`${person.bg} py-16 px-4 md:py-24`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
          <div className="w-full md:w-72 shrink-0">
            {person.image && !imgError ? (
              <img
                src={person.image}
                alt={person.name}
                className="w-full aspect-[3/4] object-cover rounded-2xl shadow-lg"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className={`w-full aspect-[3/4] rounded-2xl shadow-lg bg-gradient-to-br ${person.gradient} flex items-center justify-center`}
              >
                <span
                  className="text-white font-bold"
                  style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
                >
                  {person.initials}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-2 font-[Inter]">
              {person.lifespan}
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {person.name}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 font-[Inter]">
              {person.tagline}
            </p>
            <div className="space-y-4">
              {person.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-gray-700 leading-relaxed font-[Inter]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold text-gray-900 mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Key Milestones
          </h3>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2" />
            <div className="space-y-8">
              {person.timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-start gap-4 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full -translate-x-1/2 mt-1.5 z-10 ring-4 ring-white" />
                  <div
                    className={`ml-10 md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                    }`}
                  >
                    <span
                      className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full mb-2"
                      style={{
                        background:
                          'linear-gradient(135deg, #3b82f6, #7c3aed)',
                      }}
                    >
                      {item.year}
                    </span>
                    <p className="text-gray-700 font-[Inter]">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -top-4 -left-4 text-6xl text-blue-200 select-none font-serif">
            &ldquo;
          </div>
          <blockquote className="bg-white/80 backdrop-blur rounded-2xl p-8 md:p-10 shadow-md border-l-4 border-blue-500">
            <p
              className="text-xl md:text-2xl text-gray-800 leading-relaxed italic mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {person.quote.text}
            </p>
            <footer className="text-sm text-gray-500 font-[Inter]">
              {person.quote.source}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default PersonSection
