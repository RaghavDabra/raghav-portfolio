// Style
import style from './index.module.css'

// Utils
import cn from 'classnames'

// Hooks
import useTransitionStage from 'hooks/useTransitionStage'
import { useInView } from 'react-intersection-observer'

// Components
import Container, { Row } from 'components/Container'

type NumberType = {
  value: string | number
  label: string
}

type Props = {
  title: string
  text: string
  numbers?: NumberType[]
  technologies?: string[]
}

const techs: { [keys: string]: string } = {
  flow: '/images/flow.jpg',
  glsl: '/images/glsl.jpg',
  lambda: '/images/lambda.jpg',
  next: '/images/next.jpg',
  pixi: '/images/pixi.jpg',
  postcss: '/images/postcss.jpg',
  sass: '/images/sass.jpg',
  react: '/images/react.jpg',
  redux: '/images/redux.jpg',
  rx: '/images/rx.jpg',
  three: '/images/three.jpg',
  vite: '/images/vite.jpg',
  webpack: '/images/webpack.jpg'
}

const TextTwoColumns = ({ title, text, numbers, technologies }: Props) => {
  const ts = useTransitionStage()
  const { ref, inView } = useInView({ triggerOnce: true })

  const classes = cn(style.root, ts && style[ts], {
    [style.visible]: inView
  })
  const htmlText = text.replace(/\n{2,}/g, '<br /><br />').replace(/\n/g, '<br />')

  return (
    <div className={classes}>
      <Container grid withoutMenu>
        <Row start={1} end={1}>
          <div className={style.wrapper}>
            <h3 className={style.title} ref={ref}>
              {title}
            </h3>
          </div>
        </Row>
        <Row start={2} end={2}>
          <>
            <div className={style.text} dangerouslySetInnerHTML={{ __html: htmlText }} />
            {numbers && (
              <div className={style.numbersContainer}>
                {numbers.map(({ value, label }, index) => (
                  <div key={index} className={style.item}>
                    <div className={style.wrapper}>
                      <span className={style.number}>{value}</span>
                    </div>
                    <div className={style.wrapper}>
                      <p className={style.label}>{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {technologies && (
              <div className={style.techContainer}>
                {technologies.map((technology, index) => {
                  const src = techs[technology.toLowerCase()]

                  return (
                    <div key={index} className={style.tech}>
                      {src ? (
                        <figure className={style.figure}>
                          <img src={src} alt={technology} title={technology} />
                          <figcaption>
                            <p className={style.label}>{technology}</p>
                          </figcaption>
                        </figure>
                      ) : (
                        <div className={style.techFallback}>
                          <p className={style.label}>{technology}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        </Row>
      </Container>
    </div>
  )
}

export default TextTwoColumns
