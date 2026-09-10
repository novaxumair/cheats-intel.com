/** Thin full-bleed YouTube strip — crisp edges, no soft fades */

function stripEmbedUrl(id: string) {
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
    enablejsapi: '0',
    origin: typeof window !== 'undefined' ? window.location.origin : '',
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}

type VideoStripProps = {
  id?: string
  className?: string
}

export function VideoStrip({ id = '9vntypeV5QU', className = '' }: VideoStripProps) {
  return (
    <div
      className={`video-strip relative w-full overflow-hidden pointer-events-none select-none ${className}`.trim()}
    >
      <iframe
        title=""
        src={stripEmbedUrl(id)}
        allow="autoplay; encrypted-media"
        className="video-strip-iframe"
        tabIndex={-1}
      />
    </div>
  )
}
