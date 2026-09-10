import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Shield } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { GameCover } from '../components/GameCover'
import {
  GAMES,
  GUIDE_FEATURES,
  getGame,
  guidePath,
  parseGuideSlug,
  type Game,
} from '../data/games'
import { getZadeyoUrl } from '../data/links'
import { NotFoundPage } from './NotFoundPage'

function ProductPurchaseCard({ game }: { game: Game }) {
  return (
    <div className="page-card overflow-hidden rounded-2xl sm:rounded-3xl">
      <GameCover slug={game.slug} name={game.name} aspect="square" className="rounded-none" />
      <div className="p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="icon-well shrink-0 text-sm font-bold">{game.name.slice(0, 1)}</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{game.name}</p>
            <p className="text-xs text-white/45">Guide · feature notes · patch status</p>
          </div>
        </div>

        <a
          href={getZadeyoUrl(game.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-gradient mt-5 block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity sm:mt-6"
        >
          Get
        </a>
      </div>
    </div>
  )
}

export function GameProductPage() {
  const { guideSlug = '' } = useParams()
  const slug = parseGuideSlug(guideSlug)
  const game = getGame(slug)

  useEffect(() => {
    if (!game) return
    document.title = `${game.name} Cheats — Gaming Briefs | Aimbot, ESP & Wallhack Guide`
    const desc = document.querySelector('meta[name="description"]')
    const content = `${game.name} Cheats on Gaming Briefs — aimbot, ESP, wallhack, and spoofer feature lists, patch status, and buyer notes.`
    if (desc) desc.setAttribute('content', content)
    else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = content
      document.head.appendChild(m)
    }
  }, [game])

  if (!guideSlug.endsWith('-cheats')) {
    const maybe = getGame(guideSlug)
    if (maybe) return <Navigate to={guidePath(maybe.slug)} replace />
    return <NotFoundPage />
  }

  if (!game) return <NotFoundPage />

  const related = GAMES.filter((g) => g.slug !== game.slug && g.popular).slice(0, 4)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0e0e0e] text-white">
      <div className="border-b border-white/10 bg-[#0e0e0e]/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x py-8 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40">
              <Link to="/" className="shrink-0 hover:text-white/70">
                Home
              </Link>
              <span className="shrink-0">/</span>
              <Link to="/articles" className="shrink-0 hover:text-white/70">
                Articles
              </Link>
              <span className="shrink-0">/</span>
              <span className="min-w-0 text-white/70">{game.name} Cheats</span>
            </nav>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 sm:mt-8">
              <GameCover slug={game.slug} name={game.name} aspect="hero" variant="product" />
            </div>

            <div className="mt-5 sm:mt-6">
              <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
                <Shield className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                Patch notes tracked
              </span>

              <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
                {game.name} Cheats
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:mt-4 sm:text-base">
                Compare aimbot, ESP, wallhack, and spoofer options for {game.name}. See what
                ships, what changed after the latest patch, and what players are using before
                you buy.
              </p>
            </div>

            <div className="mt-6 lg:hidden">
              <ProductPurchaseCard game={game} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  {GUIDE_FEATURES.map((f) => (
                    <div key={f.name} className="page-card rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                          <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-white">{f.name}</h3>
                          <p className="mt-1 text-xs leading-relaxed text-white/50">{f.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/55 sm:mt-10">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    What a strong {game.name} guide should include
                  </h2>
                  <p>
                    A useful {game.name} cheat page lists live features — not marketing fluff.
                    Look for aimbot FOV options, ESP overlays, recoil helpers, stream-proof
                    notes, and notes after the latest game update.
                  </p>
                  <p>
                    Gaming Briefs centralizes title-by-title research so you are not guessing
                    from Telegram sellers or storefronts that hide limitations.
                  </p>
                </div>
              </div>

              <aside className="hidden lg:col-span-5 lg:block lg:sticky lg:top-8">
                <ProductPurchaseCard game={game} />
              </aside>
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="page-band page-x border-t border-white/10 py-12 sm:py-14">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                Related guides
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {related.map((g) => (
                  <Link
                    key={g.slug}
                    to={guidePath(g.slug)}
                    className="page-card group overflow-hidden rounded-2xl"
                  >
                    <GameCover slug={g.slug} name={g.name} />
                    <div className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white sm:text-sm">
                          {g.name}
                        </p>
                        <p className="text-[10px] text-white/40 sm:text-xs">View cheats</p>
                      </div>
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 text-white/30 group-hover:text-white/70 sm:h-4 sm:w-4"
                        strokeWidth={1.75}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <SiteFooter />
      </main>
    </div>
  )
}
