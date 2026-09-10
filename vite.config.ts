import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** Dev/preview proxy so IGN CDN images always load on localhost */
function ignImageProxy(): Plugin {
  const handler = async (req: { url?: string }, res: {
    statusCode: number
    setHeader: (k: string, v: string) => void
    end: (b?: Buffer | string) => void
  }, next: () => void) => {
    if (!req.url?.startsWith('/api/ign')) return next()
    try {
      const u = new URL(req.url, 'http://localhost')
      const target = u.searchParams.get('u')
      if (
        !target ||
        !/^https:\/\/(assets(-prd|[0-9]*)?\.ignimgs\.com|cdn\.cloudflare\.steamstatic\.com|shared\.akamai\.steamstatic\.com|wh-satano\.ru|images\.igdb\.com)\//i.test(
          target,
        )
      ) {
        res.statusCode = 400
        res.end('bad url')
        return
      }
      const upstream = await fetch(target, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
          Referer: target.includes('ignimgs')
            ? 'https://www.ign.com/'
            : target.includes('igdb.com')
              ? 'https://www.igdb.com/'
              : target.includes('wh-satano.ru')
                ? 'https://zadeyo.com/'
                : 'https://store.steampowered.com/',
        },
      })
      if (!upstream.ok) {
        res.statusCode = upstream.status
        res.end('upstream error')
        return
      }
      const buf = Buffer.from(await upstream.arrayBuffer())
      const type = upstream.headers.get('content-type') || 'image/jpeg'
      res.statusCode = 200
      res.setHeader('Content-Type', type)
      res.setHeader('Cache-Control', 'public, max-age=86400')
      res.end(buf)
    } catch {
      res.statusCode = 502
      res.end('proxy error')
    }
  }

  return {
    name: 'ign-image-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        void handler(req, res, next)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        void handler(req, res, next)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), ignImageProxy()],
  server: {
    port: 5174,
    strictPort: true,
  },
})
