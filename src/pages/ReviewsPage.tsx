import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { LocalVideoStrip } from '../components/LocalVideoStrip'
import { REVIEWS } from '../data/reviews'
import { ZADEYO_URL } from '../data/links'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? 'fill-white text-white' : 'text-white/25'}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export function ReviewsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0e0e0e] text-white">
      <div className="border-b border-white/10 bg-[#0e0e0e]/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x pt-12 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              Community feedback
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Reviews
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
              What players say about Gaming Briefs guides — patch honesty, feature coverage,
              and research before you get access.
            </p>
          </div>
        </section>

        <section
          aria-hidden
          className="relative mt-10 border-y border-white/15 bg-[#0a0a0a] sm:mt-12"
        >
          <LocalVideoStrip
            src="/videos/reviews-neon.webm"
            startAt={5}
            className="video-strip--reviews"
          />
        </section>

        <section className="page-x py-14 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="page-card flex h-full min-h-[220px] flex-col rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/45">
                      {review.game}
                    </span>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
                    “{review.body}”
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                      {review.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{review.author}</p>
                      <p className="text-xs text-white/45">{review.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-band page-x border-t border-white/10 py-16">
          <div className="page-card mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-2xl p-6 sm:gap-8 sm:rounded-3xl sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                Next step
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Browse guides or get access
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Compare titles on Articles, then continue on Zadeyo when you are ready.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Link
                to="/articles"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                View articles
              </Link>
              <a
                href={ZADEYO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white"
              >
                Get
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}
