import { Link } from 'react-router-dom'
import { LogoMark } from './LogoMark'

export function SiteFooter() {
  return (
    <footer className="page-x border-t border-white/10 bg-[#0a0a0a] py-12">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark className="text-white" />
            <span className="font-semibold text-white">Gaming Briefs</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Your ultimate gaming article hub — game guides, updates, tips, and cheat
            comparisons.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
            Navigation
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:text-white">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-white">
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Guides</p>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>
              <Link to="/articles" className="hover:text-white">
                Cheat guides
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-white">
                Player reviews
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Socials</p>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>
              <a
                href="https://x.com/gamingbriefs"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                X / Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-white/35">
        © {new Date().getFullYear()} Gaming Briefs. All rights reserved.
      </p>
    </footer>
  )
}
