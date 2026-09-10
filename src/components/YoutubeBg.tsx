import { useMemo } from 'react'

/** Two cinematic sources — one is chosen at random each load */
const YT_IDS = ['1pbL6a2RP1M', '1-cPgr5qpf8'] as const

function embedUrl(id: string) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    showinfo: '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    iv_load_policy: '3',
    disablekb: '1',
    fs: '0',
    cc_load_policy: '0',
    loop: '1',
    playlist: id,
    // Hide end-screen / suggested UI as much as the embed allows
    enablejsapi: '0',
    origin: typeof window !== 'undefined' ? window.location.origin : '',
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}

type YoutubeBgProps = {
  /** Force a specific id; otherwise pick randomly once */
  id?: string
}

export function YoutubeBg({ id }: YoutubeBgProps) {
  const videoId = useMemo(() => {
    if (id) return id
    return YT_IDS[Math.floor(Math.random() * YT_IDS.length)]
  }, [id])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <iframe
        title=""
        aria-hidden
        src={embedUrl(videoId)}
        allow="autoplay; encrypted-media; picture-in-picture"
        className="youtube-bg"
        tabIndex={-1}
      />
      {/* Light veil only — chrome is cropped via .youtube-bg scale */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />
    </div>
  )
}
