import { useState, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import style from './index.module.css'

function MusicPlayer() {
  const dispatch = useDispatch()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const overHandler = useCallback(() => {
    dispatch.pointer.setType('hover')
  }, [dispatch.pointer])

  const outHandler = useCallback(() => {
    dispatch.pointer.setType('default')
  }, [dispatch.pointer])

  return (
    <div className={`${style.root} ${isExpanded ? style.expanded : ''}`}>
      <div className={style.glassOverlay} />
      <div className={style.glassSpecular} />

      <audio ref={audioRef} src="/audio/anatu-bleach.mp3" loop onEnded={() => setIsPlaying(false)} />

      <div className={style.content}>
        <button
          className={style.miniToggle}
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={overHandler}
          onMouseLeave={outHandler}
          aria-label="Toggle player"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </button>

        <div className={style.player}>
          <div className={style.albumArt}>
            <div className={`${style.disc} ${isPlaying ? style.spinning : ''}`}>
              <div className={style.discCenter} />
            </div>
          </div>

          <div className={style.trackInfo}>
            <span className={style.trackTitle}>Anatu</span>
            <span className={style.trackArtist}>Bleach</span>
          </div>

          <div className={style.controls}>
            <button
              className={style.playBtn}
              onClick={togglePlay}
              onMouseEnter={overHandler}
              onMouseLeave={outHandler}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
