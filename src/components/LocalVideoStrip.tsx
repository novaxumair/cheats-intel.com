import { useEffect, useRef, useState } from 'react'

const REVIEWS_VIDEO = '/videos/reviews-neon.webm'
/** Skip the first 5 seconds on every play / loop */
const START_AT = 5

type LocalVideoStripProps = {
  className?: string
  src?: string
  startAt?: number
}

export function LocalVideoStrip({
  className = '',
  src = REVIEWS_VIDEO,
  startAt = START_AT,
}: LocalVideoStripProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    let cancelled = false
    video.controls = false
    video.muted = true
    video.disablePictureInPicture = true
    video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback')

    const reveal = () => {
      if (cancelled) return
      if (!video.paused && video.currentTime >= startAt - 0.05) {
        setReady(true)
      }
    }

    const seekAndPlay = () => {
      const startPlay = () => {
        void video.play().then(reveal).catch(() => {})
      }

      // If clip is shorter than startAt, play from 0
      const target = video.duration && video.duration > startAt ? startAt : 0

      if (Math.abs(video.currentTime - target) > 0.1) {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked)
          startPlay()
        }
        video.addEventListener('seeked', onSeeked)
        video.currentTime = target
      } else {
        startPlay()
      }
    }

    const onLoadedMeta = () => seekAndPlay()

    const onTimeUpdate = () => {
      if (video.duration > startAt && video.currentTime > 0 && video.currentTime < startAt) {
        video.currentTime = startAt
        return
      }
      reveal()
    }

    const onPlaying = () => reveal()

    const onEnded = () => {
      const target = video.duration > startAt ? startAt : 0
      video.currentTime = target
      void video.play().catch(() => {})
    }

    video.addEventListener('loadedmetadata', onLoadedMeta)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('ended', onEnded)

    if (video.readyState >= 1) onLoadedMeta()
    else video.load()

    return () => {
      cancelled = true
      video.removeEventListener('loadedmetadata', onLoadedMeta)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('ended', onEnded)
    }
  }, [src, startAt])

  return (
    <div
      className={`video-strip relative w-full overflow-hidden pointer-events-none select-none ${className}`.trim()}
    >
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <video
        ref={ref}
        className={`video-strip-local transition-opacity duration-500 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        src={src}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden
        tabIndex={-1}
      />
    </div>
  )
}
