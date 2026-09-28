// Style
import style from './index.module.css'

// Components
import Section from 'components/Section'
import Container, { Row } from 'components/Container'
import GlassCard from 'components/GlassCard'

// Hooks
import { useTranslation } from 'react-i18next'

function Portfolio() {
  const { t } = useTranslation('translation', { keyPrefix: 'portfolio' })
  const intro: string[] = t('intro', { returnObjects: true })

  return (
    <Section name="portfolio" className={style.root}>
      <Container grid>
        <Row start={1} end={3}>
          <GlassCard className={style.heroPill}>
            <span className={style.heroLabel}>I build</span>
            <h2 className={style.heroTitle}>
              production-grade systems <span className={style.heroAccent}>powered by AI.</span>
            </h2>
          </GlassCard>
        </Row>
      </Container>

      <Container grid>
        <Row start={2} end={2}>
          <div className={style.introCards}>
            <GlassCard className={style.introCard}>
              <span className={style.cardBadge}>What I Do</span>
              <p className={style.introText}>{intro[2]}</p>
            </GlassCard>
            <GlassCard className={style.introCard}>
              <span className={style.cardBadge}>My Focus</span>
              <p className={style.introText}>{intro[3]}</p>
            </GlassCard>
          </div>
        </Row>
      </Container>

      <Container grid>
        <Row start={2} end={2}>
          <div className={style.ctaRow}>
            <a href="#about" className={style.ctaPrimary}>Explore Work</a>
            <a href="/Raghav_Dabra_Resume.docx" className={style.ctaSecondary} download>Download Resume</a>
            <a href="mailto:raghavdabra@gmail.com" className={style.ctaGhost}>Get In Touch</a>
          </div>
        </Row>
      </Container>

      <div className={style.cardContainer} id="card-container" />

      <video id="aiReqReel" autoPlay muted loop playsInline className={style.video}>
        <source src="/projects/ai-req/reel.mp4" type="video/mp4" />
      </video>
      <video id="finreconReel" autoPlay muted loop playsInline className={style.video}>
        <source src="/projects/finrecon/reel.mp4" type="video/mp4" />
      </video>
      <video id="connectTeamsReel" autoPlay muted loop playsInline className={style.video}>
        <source src="/projects/connect-teams/reel.mp4" type="video/mp4" />
      </video>
      <video id="aiAgentReel" autoPlay muted loop playsInline className={style.video}>
        <source src="/projects/ai-agent/reel.mp4" type="video/mp4" />
      </video>
    </Section>
  )
}
export default Portfolio
