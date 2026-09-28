import style from './index.module.css'

// Components
import Section from 'components/Section'
import Container, { Row } from 'components/Container'
import Heading from 'components/Heading'
import GlassCard from 'components/GlassCard'

// Hooks
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'

// Icons
import { ExternalArrow } from 'components/Icons'

function Contact() {
  const dispatch = useDispatch()
  const { t } = useTranslation('translation', { keyPrefix: 'contact' })
  const resumeUrl = t('resume_url') as string

  const { ref, inView } = useInView()

  const overHandler = useCallback(() => {
    dispatch.pointer.setType('hover')
  }, [dispatch.pointer])

  const outHandler = useCallback(() => {
    dispatch.pointer.setType('default')
  }, [dispatch.pointer])

  return (
    <Section name="contact" className={style.root}>
      {/* Email heading */}
      <Container grid>
        <Row start={1} end={3}>
          <div className={style.emailSection} ref={ref}>
            <Heading className={inView ? style.isEmailVisible : ''}>
              <div>
                <div className={style.emailContainer}>
                  <a
                    className={style.email}
                    href="mailto:raghavdabra@gmail.com"
                    onMouseEnter={overHandler}
                    onMouseLeave={outHandler}
                  >
                    raghavdabra@gmail.com
                  </a>
                </div>
              </div>
            </Heading>
          </div>
        </Row>
      </Container>

      {/* Contact cards grid */}
      <Container grid>
        <Row start={1} end={3}>
          <div className={style.contactGrid}>
            <GlassCard className={style.contactCard}>
              <span className={style.cardBadge}>Get In Touch</span>
              <p className={style.contactText}>
                Interested in working together or just want to say hi? Drop me an email and I'll get back to you.
              </p>
              <a
                href="mailto:raghavdabra@gmail.com"
                className={style.contactLink}
                onMouseEnter={overHandler}
                onMouseLeave={outHandler}
              >
                Send Email <ExternalArrow />
              </a>
            </GlassCard>

            <GlassCard className={style.contactCard}>
              <span className={style.cardBadge}>Connect</span>
              <ul className={style.socialList}>
                <li>
                  <a
                    href="https://www.linkedin.com/in/raghavdabra/"
                    onMouseEnter={overHandler}
                    onMouseLeave={outHandler}
                    target="_blank"
                  >
                    LinkedIn <ExternalArrow />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RaghavDabra"
                    onMouseEnter={overHandler}
                    onMouseLeave={outHandler}
                    target="_blank"
                  >
                    GitHub <ExternalArrow />
                  </a>
                </li>
                <li>
                  <a
                    href="https://leetcode.com/u/raghavdabra/"
                    onMouseEnter={overHandler}
                    onMouseLeave={outHandler}
                    target="_blank"
                  >
                    LeetCode <ExternalArrow />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/RaghavDabra4"
                    onMouseEnter={overHandler}
                    onMouseLeave={outHandler}
                    target="_blank"
                  >
                    Twitter <ExternalArrow />
                  </a>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className={style.contactCard}>
              <span className={style.cardBadge}>Resume</span>
              <p className={style.contactText}>
                Download my full resume with detailed experience, projects, and certifications.
              </p>
              <a
                href={resumeUrl}
                className={style.resumeButton}
                onMouseEnter={overHandler}
                onMouseLeave={outHandler}
                download
              >
                Download Resume <ExternalArrow />
              </a>
            </GlassCard>
          </div>
        </Row>
      </Container>
    </Section>
  )
}
export default Contact
