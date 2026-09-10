import { Link } from 'react-router-dom'
import { ArrowRight, Crosshair, Eye, Shield, Sparkles } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { VideoBg } from '../components/VideoBg'
import { LocalVideoStrip } from '../components/LocalVideoStrip'
import { SiteFooter } from '../components/SiteFooter'
import { GameCover } from '../components/GameCover'
import { HeroSearch } from '../components/HeroSearch'
import { GAMES, guidePath } from '../data/games'
import { ZADEYO_URL } from '../data/links'

const FEATURED = GAMES.filter((g) => g.popular).slice(0, 6)

const FEATURES = [
  { icon: Crosshair, label: 'Aimbot', desc: 'Smooth, sticky, and FOV options compared title-by-title.' },
  { icon: Eye, label: 'ESP / Wallhack', desc: 'Player, loot, and world overlays — what ships vs. vaporware.' },
  { icon: Shield, label: 'HWID Spoofer', desc: 'Reset paths and stream-proof notes when a ban hits.' },
  { icon: Sparkles, label: 'Patch status', desc: 'Updated after patches so you are not buying yesterday’s build.' },
] as const

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      <section id="home" className="relative flex min-h-screen flex-col overflow-x-clip">
        <VideoBg />

        <div className="relative z-20 flex min-h-screen flex-col">
          <Navbar onVideo />

          <main className="page-x mt-auto pb-8 sm:pb-12 lg:pb-16">
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="relative z-30 max-w-xl">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                  Game guides · updates · tips · cheats
                </p>
                <h1 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                  Gaming Briefs
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                  Get the latest game updates, detailed guides, trending news, and expert
                  tips — all in one place.
                </p>

                <div className="relative z-50 mt-7">
                  <HeroSearch />
                </div>
              </div>

              <div className="relative z-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:w-[34rem] lg:shrink-0">
                <div className="glass flex h-full min-h-[168px] flex-col justify-between rounded-2xl p-5 sm:min-h-[200px] sm:p-6">
                  <p
                    className="text-3xl font-normal tracking-tight text-white sm:text-4xl"
                    style={{ fontFamily: "'Silkscreen', cursive" }}
                  >
                    {GAMES.length}+
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 sm:mt-4">
                    Title-by-title cheat guides with feature lists, patch status, and player
                    picks — researched before you get access.
                  </p>
                </div>

                <div className="glass flex h-full min-h-[168px] flex-col rounded-2xl p-5 sm:min-h-[200px] sm:p-6">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">
                      V
                    </div>
                    <span className="text-sm font-semibold text-white">
                      Valorant
                    </span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-white/80">
                    “Finally a place that shows what ships, what broke after the patch, and
                    what ranked players are actually running.”
                  </p>
                  <div className="mt-4 flex items-center gap-3 sm:mt-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
                      AR
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Alex Rivera
                      </p>
                      <p className="text-xs text-white/60">
                        Immortal player
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>

      <div className="hero-to-body" aria-hidden />

      <div className="page-body relative z-10">
        <section className="page-band page-x border-t border-white/10 py-14">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="page-card flex h-full min-h-[168px] flex-col rounded-2xl p-5"
              >
                <div className="icon-well mb-4">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-semibold text-white">{label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-hidden
          className="relative border-y border-white/15 bg-[#0a0a0a]"
        >
          <LocalVideoStrip src="/videos/home-wave.webm" startAt={5} />
        </section>

        <section id="picks" className="page-x py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Featured articles
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Top picks
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                  Deep-dive guides for every title in the catalog — see what ships, what
                  changed, and what players are using before you get access.
                </p>
              </div>
              <Link
                to="/articles"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                View all {GAMES.length} guides
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED.map((game) => (
                <Link
                  key={game.slug}
                  to={guidePath(game.slug)}
                  className="page-card group flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <GameCover slug={game.slug} name={game.name} />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {game.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                      {game.name} cheats — aimbot, ESP, wallhack, and spoofer coverage with
                      live patch status and feature breakdowns.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                      Open guide
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.75}
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="page-band page-x border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
            <div className="page-card flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  About Gaming Briefs
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Research first. Get when you are ready.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  Gaming Briefs is your ultimate gaming article hub for game guides,
                  updates, patch notes, and cheat feature breakdowns. Compare aimbot, ESP,
                  wallhack, and spoofer options by title.
                </p>
              </div>
              <Link
                to="/articles"
                className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white hover:text-white/80"
              >
                Browse all guides
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>

            <div
              id="access"
              className="page-card flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Access
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Ready to get access?
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  Continue on Zadeyo for supported games — aimbot, ESP, wallhack, and
                  spoofer builds with clear product status.
                </p>
              </div>
              <a
                href={ZADEYO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-gradient mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-fit"
              >
                Get
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
