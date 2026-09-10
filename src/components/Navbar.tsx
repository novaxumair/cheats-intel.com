import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { LogoMark } from './LogoMark'
import { ZADEYO_URL } from '../data/links'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Articles', to: '/articles' },
  { label: 'Reviews', to: '/reviews' },
] as const

type NavbarProps = {
  onVideo?: boolean
}

export function Navbar({ onVideo: _onVideo = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const brandClass = 'text-white'

  return (
    <>
      <nav className="page-x relative z-20 flex items-center justify-between gap-3 py-4 sm:py-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <LogoMark className={`${brandClass} shrink-0`} />
          <span className={`truncate text-base font-semibold sm:text-lg ${brandClass}`}>
            Gaming Briefs
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={ZADEYO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-gradient flex items-center self-stretch rounded-full px-5 text-sm font-medium text-white transition-opacity"
          >
            Get
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg md:hidden"
        >
          <Menu
            className={`absolute h-5 w-5 transition-all duration-300 ${brandClass} ${
              menuOpen ? 'rotate-90 scale-0 opacity-0' : 'opacity-100'
            }`}
          />
          <X
            className={`absolute h-5 w-5 transition-all duration-300 ${brandClass} ${
              menuOpen ? 'opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed right-0 top-0 z-40 flex h-full w-72 flex-col bg-black/90 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-2 px-6 pt-24">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                transitionDelay: menuOpen ? `${(index + 1) * 60}ms` : '0ms',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          <a
            href={ZADEYO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="cta-gradient block w-full rounded-full px-6 py-3 text-center text-sm font-medium text-white"
          >
            Get
          </a>
        </div>
      </div>
    </>
  )
}
