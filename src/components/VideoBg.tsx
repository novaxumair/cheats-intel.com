import { useEffect, useRef, useState } from 'react'

const HERO_VIDEO = '/videos/black-angel.webm'
/** Skip the first 5 seconds on every play / loop */
const START_AT = 5

export function VideoBg() {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    let cancelled = false
    video.controls = false
    video.muted = true
    video.defaultMuted = true
    video.disablePictureInPicture = true
    video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback')

    const reveal = () => {
      if (cancelled) return
      if (!video.paused && video.currentTime >= START_AT - 0.05) {
        setReady(true)
      }
    }

    const seekAndPlay = () => {
      const startPlay = () => {
        void video.play().then(reveal).catch(() => {})
      }

      if (Math.abs(video.currentTime - START_AT) > 0.1) {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked)
          startPlay()
        }
        video.addEventListener('seeked', onSeeked)
        video.currentTime = START_AT
      } else {
        startPlay()
      }
    }

    const onLoadedMeta = () => {
      seekAndPlay()
    }

    const onTimeUpdate = () => {
      // Keep loop away from the first 5s (looks like a still/poster)
      if (video.currentTime > 0 && video.currentTime < START_AT) {
        video.currentTime = START_AT
        return
      }
      reveal()
    }

    const onPlaying = () => reveal()

    const onEnded = () => {
      video.currentTime = START_AT
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
  }, [])

  return (
    <div className="hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Solid backdrop so frame-0 never flashes as a still image */}
      <div className="absolute inset-0 bg-[#0e0e0e]" />
      <video
        ref={ref}
        className={`hero-video-bg transition-opacity duration-500 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        src={HERO_VIDEO}
        muted
        defaultMuted
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
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent" />
    </div>
  )
}
