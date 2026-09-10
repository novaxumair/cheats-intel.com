import { useEffect, useMemo, useState } from 'react'
import { getGameImage, getProductHeroImage } from '../data/images'

type GameCoverProps = {
  slug: string
  name: string
  className?: string
  aspect?: 'video' | 'square' | 'hero'
  /** Fill parent (parent must set size / aspect) */
  fill?: boolean
  /** Product page: use Zadeyo interior and show full color */
  variant?: 'catalog' | 'product'
}

function candidatesFor(url: string): string[] {
  const out: string[] = []
  const push = (u: string) => {
    if (u && !out.includes(u)) out.push(u)
  }

  const proxyHosts =
    /^(https:\/\/)(assets(-prd|[0-9]*)?\.ignimgs\.com|cdn\.cloudflare\.steamstatic\.com|shared\.akamai\.steamstatic\.com|wh-satano\.ru|images\.igdb\.com)\//i

  if (proxyHosts.test(url)) {
    push(`/api/ign?u=${encodeURIComponent(url)}`)
    push(url)
    const bare = url.split('?')[0]
    if (bare !== url) {
      push(`/api/ign?u=${encodeURIComponent(bare)}`)
      push(bare)
    }
  } else {
    push(url)
  }

  return out
}

export function GameCover({
  slug,
  name,
  className = '',
  aspect = 'video',
  fill = false,
  variant = 'catalog',
}: GameCoverProps) {
  const sources = useMemo(
    () =>
      candidatesFor(
        variant === 'product' ? getProductHeroImage(slug) : getGameImage(slug),
      ),
    [slug, variant],
  )
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setIndex(0)
    setFailed(false)
  }, [slug])

  const src = sources[index]
  const ratio = fill
    ? 'h-full w-full'
    : aspect === 'square'
      ? 'aspect-square'
      : aspect === 'hero'
        ? 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]'
        : 'aspect-[16/10]'

  return (
    <div className={`relative overflow-hidden bg-[#121212] ${ratio} ${className}`}>
      {!failed && src ? (
        <img
          key={src}
          src={src}
          alt={`${name} cover`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          sizes={
            aspect === 'hero'
              ? '100vw'
              : fill
                ? '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
          onError={() => {
            if (index + 1 < sources.length) setIndex((i) => i + 1)
            else setFailed(true)
          }}
          className={`game-cover-img absolute inset-0 h-full w-full object-cover object-center${variant === 'product' ? ' game-cover-img--color' : ''}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#161616]">
          <span className="px-3 text-center text-sm font-semibold tracking-tight text-white/25">
            {name}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />
    </div>
  )
}
