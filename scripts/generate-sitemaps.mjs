/**
 * Generate separate product and image sitemaps for Gaming Briefs (nexum).
 * Run: node scripts/generate-sitemaps.mjs
 * Env: SITE_URL (default https://gamingbriefs.com)
 */
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')

const SITE = (process.env.SITE_URL || 'https://gamingbriefs.com').replace(/\/$/, '')
const LAST_MOD = new Date().toISOString().slice(0, 10)

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/articles', priority: '0.9', changefreq: 'daily' },
  { path: '/reviews', priority: '0.8', changefreq: 'weekly' },
]

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function siteUrl(path) {
  if (!path || path === '/') return `${SITE}/`
  return `${SITE}${path.startsWith('/') ? path : `/${path}`}`
}

function loadGames() {
  const src = readFileSync(join(dataDir, 'games.ts'), 'utf8')
  return [...src.matchAll(/\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map((m) => ({
    slug: m[1],
    name: m[2],
  }))
}

function loadIgnImages() {
  const src = readFileSync(join(dataDir, 'images.ts'), 'utf8')
  const map = {}
  for (const m of src.matchAll(/"([^"]+)":\s*"(https?:[^"]+)"/g)) {
    if (m[1] !== 'valorant' || !map.valorant) map[m[1]] = m[2]
  }
  return map
}

function loadInteriors() {
  const src = readFileSync(join(dataDir, 'product-interiors.ts'), 'utf8')
  const map = {}
  for (const m of src.matchAll(
    /"([^"]+)":\s*\{\s*url:\s*"([^"]+)",\s*kind:\s*"(cheat|stock)"/g,
  )) {
    map[m[1]] = { url: m[2], kind: m[3] }
  }
  return map
}

function guidePath(slug) {
  return `/${slug}-cheats`
}

function urlEntry({ loc, priority, changefreq, lastmod = LAST_MOD }) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

function buildProductsSitemap(games) {
  const urls = [
    ...STATIC_PAGES.map((p) =>
      urlEntry({
        loc: siteUrl(p.path),
        priority: p.priority,
        changefreq: p.changefreq,
      }),
    ),
    ...games.map((g) =>
      urlEntry({
        loc: siteUrl(guidePath(g.slug)),
        priority: '0.75',
        changefreq: 'weekly',
      }),
    ),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}

function imageBlock(loc, title, caption) {
  let block = `    <image:image>
      <image:loc>${escapeXml(loc)}</image:loc>
      <image:title>${escapeXml(title)}</image:title>`
  if (caption) {
    block += `\n      <image:caption>${escapeXml(caption)}</image:caption>`
  }
  block += '\n    </image:image>'
  return block
}

function buildImagesSitemap(games, covers, interiors) {
  const fallbackCover = covers.valorant || Object.values(covers)[0]
  const urls = []

  for (const game of games) {
    const pageUrl = siteUrl(guidePath(game.slug))
    const cover = covers[game.slug] || fallbackCover
    const interior = interiors[game.slug]
    const hero = interior?.url || cover

    const images = []
    images.push(
      imageBlock(
        hero,
        `${game.name} cheat guide hero screenshot`,
        interior?.kind === 'cheat'
          ? `${game.name} in-game cheat overlay preview`
          : `${game.name} gameplay screenshot`,
      ),
    )

    if (cover !== hero) {
      images.push(
        imageBlock(
          cover,
          `${game.name} cover art`,
          `${game.name} catalog cover image`,
        ),
      )
    }

    urls.push(`  <url>
    <loc>${escapeXml(pageUrl)}</loc>
${images.join('\n')}
  </url>`)
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`
}

function buildSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(siteUrl('/sitemap-products.xml'))}</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${escapeXml(siteUrl('/sitemap-images.xml'))}</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>
</sitemapindex>
`
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl('/sitemap.xml')}
Sitemap: ${siteUrl('/sitemap-products.xml')}
Sitemap: ${siteUrl('/sitemap-images.xml')}
`
}

function main() {
  const games = loadGames()
  const covers = loadIgnImages()
  const interiors = loadInteriors()

  writeFileSync(join(publicDir, 'sitemap-products.xml'), buildProductsSitemap(games))
  writeFileSync(join(publicDir, 'sitemap-images.xml'), buildImagesSitemap(games, covers, interiors))
  writeFileSync(join(publicDir, 'sitemap.xml'), buildSitemapIndex())
  writeFileSync(join(publicDir, 'robots.txt'), buildRobotsTxt())

  console.log(`Sitemaps written for ${SITE}`)
  console.log(`  products: ${STATIC_PAGES.length + games.length} URLs`)
  console.log(`  images:   ${games.length} product pages`)
}

main()
