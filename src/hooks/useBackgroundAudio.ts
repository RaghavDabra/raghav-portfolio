// Types
import type { RootState } from 'store'

// Utils
import { Howl } from 'howler'

// Hooks
import { useEffect, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useBackgroundAudio() {
  const audio = useRef<Howl | null>(null)
  const app = useSelector((state: RootState) => state.app)
  const audioState = useSelector((state: RootState) => state.audio)
  const dispatch = useDispatch()
  const [isPlaying, setPlaying] = useState(false)

  const toggle = useCallback(() => {
    if (audioState.mute) {
      dispatch.audio.unmute()
    } else {
      dispatch.audio.mute()
    }
  }, [audioState.mute, dispatch.audio])

  useEffect(() => {
    audio.current = new Howl({
      src: ['/audio/background.mp3'],
      loop: true,
      volume: 0
    })
  }, [])

  useEffect(() => {
    if (!app.ready || !audio.current) return

    const a = audio.current

    if (audioState.mute) {
      if (!a.playing()) {
        setPlaying(false)
        return
      }

      a.fade(1, 0, 800)
      a.once('fade', () => {
        a.stop()
        setPlaying(false)
      })
      return
    }

    if (!a.playing()) {
      setPlaying(true)
      a.play()
      a.fade(0, 1, 1200)
    }
  }, [app.ready, audioState.mute])

  return {
    toggle,
    isPlaying
  }
}

export default useBackgroundAudio
