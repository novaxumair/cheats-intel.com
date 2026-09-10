import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSearch } from '../components/HeroSearch'
import { ZADEYO_URL } from '../data/links'

export function NotFoundPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0e0e0e] text-white">
      <div className="border-b border-white/10 bg-[#0e0e0e]/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x py-16 sm:py-28">
          <div className="page-card mx-auto max-w-3xl rounded-2xl px-5 py-12 text-center sm:rounded-3xl sm:px-12 sm:py-16">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              Error 404
            </p>
            <h1
              className="mt-4 text-6xl font-normal tracking-tight text-white sm:text-7xl"
              style={{ fontFamily: "'Silkscreen', cursive" }}
            >
              404
            </h1>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Page not found
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
              That route does not exist. Search the catalog or head back home.
            </p>

            <div className="relative z-50 mx-auto mt-8 flex max-w-xl justify-center text-left">
              <HeroSearch placeholder="Search guides…" className="w-full" />
            </div>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                Back home
              </Link>
              <Link
                to="/articles"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                All articles
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
