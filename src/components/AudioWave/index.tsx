import style from './index.module.css'

import cn from 'classnames'
import useBackgroundAudio from 'hooks/useBackgroundAudio'

function AudioWave() {
  const { isPlaying, toggle } = useBackgroundAudio()

  const classes = cn(style.root, {
    [style.isPlaying]: isPlaying
  })

  return (
    <button
      className={classes}
      onClick={toggle}
      type="button"
      aria-label={isPlaying ? 'Turn sound off' : 'Turn sound on'}
      aria-pressed={isPlaying}
    >
      <span className={style.wave} aria-hidden="true">
        <span className={style.bar} />
        <span className={style.bar} />
        <span className={style.bar} />
        <span className={style.bar} />
        <span className={style.bar} />
      </span>
      <span className={style.label}>{isPlaying ? 'Sound: On' : 'Sound: Off'}</span>
    </button>
  )
}

export default AudioWave
