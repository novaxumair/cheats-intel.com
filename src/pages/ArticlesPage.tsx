import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { GameCover } from '../components/GameCover'
import { VideoBg } from '../components/VideoBg'
import { HeroSearch } from '../components/HeroSearch'
import { GAMES, guidePath } from '../data/games'

const GRID =
  'mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6'

export function ArticlesPage() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(() => params.get('q') ?? '')

  useEffect(() => {
    const fromUrl = params.get('q') ?? ''
    setQ(fromUrl)
  }, [params])

  function onSearchChange(next: string) {
    setQ(next)
    if (next.trim()) setParams({ q: next }, { replace: true })
    else setParams({}, { replace: true })
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return GAMES
    return GAMES.filter(
      (g) => g.name.toLowerCase().includes(term) || g.slug.includes(term),
    )
  }, [q])

  const popular = filtered.filter((g) => g.popular)
  const rest = filtered.filter((g) => !g.popular)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0e0e0e] text-white">
      <section className="relative flex min-h-[70vh] flex-col overflow-x-clip sm:min-h-[75vh]">
        <VideoBg />
        <div className="relative z-20 flex min-h-[70vh] flex-col sm:min-h-[75vh]">
          <Navbar onVideo />
          <div className="page-x mt-auto pb-10 sm:pb-14">
            <div className="relative z-30 mx-auto max-w-6xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Cheat guides · feature breakdowns · patch notes · player picks
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Articles
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                Deep-dive guides for every title in the catalog — see what ships, what
                changed, and what players are using. {GAMES.length} games covered.
              </p>
              <div className="relative z-50 mt-7">
                <HeroSearch
                  value={q}
                  onChange={onSearchChange}
                  submitTo="filter"
                  placeholder="Search by game name…"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hero-to-body" aria-hidden />

      <main className="page-body relative z-10">
        {popular.length > 0 ? (
          <section className="page-band page-x border-t border-white/10 py-12">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-xl font-semibold tracking-tight text-white">Popular</h2>
              <div className={GRID}>
                {popular.map((game) => (
                  <GameCard key={game.slug} slug={game.slug} name={game.name} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="page-x py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                {q.trim() ? 'Search results' : 'All guides'}
              </h2>
              <p className="text-sm text-white/40">
                {filtered.length} result{filtered.length === 1 ? '' : 's'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="page-card mt-8 rounded-2xl px-6 py-10 text-center">
                <p className="text-sm text-white/55">No games match “{q}”.</p>
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="mt-4 text-sm font-medium text-white hover:text-white/80"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className={GRID}>
                {(popular.length ? rest : filtered).map((game) => (
                  <GameCard key={game.slug} slug={game.slug} name={game.name} />
                ))}
              </div>
            )}
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}

function GameCard({ slug, name }: { slug: string; name: string }) {
  return (
    <Link
      to={guidePath(slug)}
      className="page-card group relative block aspect-square w-full overflow-hidden rounded-xl"
    >
      <GameCover slug={slug} name={name} fill className="absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end gap-1 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pb-2 pt-8 sm:px-2.5 sm:pb-2.5 sm:pt-10">
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[11px] font-semibold leading-tight text-white sm:line-clamp-1 sm:text-sm">
            {name}
          </h3>
          <p className="mt-0.5 hidden truncate text-[10px] text-white/50 sm:block">
            Aimbot · ESP · Spoofer
          </p>
        </div>
        <ArrowRight
          className="mb-0.5 hidden h-3.5 w-3.5 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white/80 sm:block"
          strokeWidth={1.75}
        />
      </div>
    </Link>
  )
}
