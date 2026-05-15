// Style
import style from './index.module.css'

// Utils
import cn from 'classnames'

// Components
import Container, { Row } from 'components/Container'

// Hooks
import useTransitionStage from 'hooks/useTransitionStage'

type Props = {
  text: string
}

const TextIntro = ({ text }: Props) => {
  const ts = useTransitionStage()

  const classes = cn(style.root, ts && style[ts])
  const paragraphs = text
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <Container grid withoutMenu>
      <Row start={2} end={2}>
        <div className={classes}>
          <div className={style.inner}>
            {paragraphs.map((p, index) => (
              <p key={index} className={style.paragraph}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default TextIntro
