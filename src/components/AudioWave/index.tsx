import style from './index.module.css'

import cn from 'classnames'
import useBackgroundAudio from 'hooks/useBackgroundAudio'

function AudioWave() {
  const { isPlaying, toggle } = useBackgroundAudio()

  const classes = cn(style.root, {
    [style.isPlaying]: isPlaying
  })

  return (
    <button className={classes} onClick={toggle} type="button" aria-label="Toggle sound">
      <span className={style.wave} aria-hidden="true">
        <span className={style.bar} />
        <span className={style.bar} />
        <span className={style.bar} />
        <span className={style.bar} />
        <span className={style.bar} />
      </span>
    </button>
  )
}

export default AudioWave
