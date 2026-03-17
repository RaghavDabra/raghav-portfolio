import style from './index.module.css'

// Components
import Section from 'components/Section'
import Container, { Row } from 'components/Container'
import ContentBlock from 'components/ContentBlock'
import ImageTrigger from 'components/ImageTrigger'
import Square from 'components/Square'
import Heading from 'components/Heading'
import { List, ListItem } from 'components/List'

// Hooks
import { Trans, useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation('translation', { keyPrefix: 'about' })
  const intro: string[] = t('intro', { returnObjects: true })
  const clanTitle: string = t('clan_title')
  const clan: string[] = t('clan', { returnObjects: true })
  const methodTitle: string = t('method_title')
  const method: string[] = t('method', { returnObjects: true })

  return (
    <Section name="about" className={style.root}>
      <Container grid>
        <Row start={3} end={1}>
          <div className={style.section}>
            <ContentBlock key={intro[0]}>
              <div>
                <Trans
                  i18nKey={`about.intro.0`}
                  components={{
                    ImageMelbourne: <ImageTrigger name="melbourne" sizes={[2, 2]} />,
                    ImageBoA: <ImageTrigger name="boa" sizes={[2.5, 1.5]} />,
                    ImageUniMelb: <ImageTrigger name="unimelb" sizes={[2, 2]} />
                  }}
                />
              </div>
            </ContentBlock>
          </div>
        </Row>
      </Container>
      <Container grid outerRightOnMobile>
        <Row start={1} end={2}>
          <Heading key={intro[1]}>
            <Trans
              i18nKey="about.intro.1"
              components={{
                Square: <Square />,
                pre: <pre />
              }}
            />
          </Heading>
        </Row>
      </Container>
      <Container grid>
        <Row start={2} end={1}>
          <ContentBlock key={intro[2]}>
            {intro.slice(2).map((txt, i) => (
              <div key={i}>
                <Trans
                  i18nKey={`about.intro.${i + 2}`}
                  components={{
                    ImageMelbourne: <ImageTrigger name="melbourne" sizes={[2, 2]} />,
                    ImageBoA: <ImageTrigger name="boa" sizes={[2.5, 1.5]} />,
                    ImageUniMelb: <ImageTrigger name="unimelb" sizes={[2, 2]} />
                  }}
                />
              </div>
            ))}
          </ContentBlock>
        </Row>
      </Container>
      <Container grid outerRightOnMobile>
        <Row start={2} end={2}>
          <div className={style.section}>
            <Heading alignRight key={clanTitle[0]}>
              <>
                {clanTitle[0]}
                <br /> {clanTitle[1]}
              </>
            </Heading>
          </div>
        </Row>
      </Container>
      <Container grid>
        <Row start={2} end={2}>
          <div className={style.columns}>
            <ContentBlock key={clan[0]}>
              {clan.slice(0, 2).map((txt, i) => (
                <div key={i}>
                  <Trans
                    i18nKey={`about.clan.${i}`}
                    components={{
                      ImageBW: <ImageTrigger name="bw" sizes={[2.5, 2.5]} />,
                      ImageNO1: <ImageTrigger name="no1" />,
                      ImageNO2: <ImageTrigger name="no2" />,
                      ImageNO3: <ImageTrigger name="no3" sizes={[2, 2.5]} />
                    }}
                  />
                </div>
              ))}
            </ContentBlock>
            <ContentBlock key={clan[2]}>
              {clan.slice(2).map((txt, i) => (
                <div key={i}>
                  <Trans
                    i18nKey={`about.clan.${i + 2}`}
                    components={{
                      ImageBW: <ImageTrigger name="bw" sizes={[2.5, 2.5]} />,
                      ImageNO1: <ImageTrigger name="no1" />,
                      ImageNO2: <ImageTrigger name="no2" />,
                      ImageNO3: <ImageTrigger name="no3" sizes={[2, 2.5]} />
                    }}
                  />
                </div>
              ))}
            </ContentBlock>
          </div>
        </Row>
      </Container>
      <Container grid outerRightOnMobile>
        <Row start={1} end={3}>
          <div className={style.section}>
            <Heading key={methodTitle}>
              <Trans i18nKey="about.method_title" components={{ pre: <pre /> }} />
            </Heading>
          </div>
        </Row>
      </Container>
      <Container grid>
        <Row start={2} end={1}>
          <ContentBlock key={method[0]}>
            <div>
              <Trans i18nKey={`about.method.0`} />
            </div>
          </ContentBlock>
        </Row>
      </Container>
      <Container grid outerRightOnMobile>
        <Row start={1} end={3}>
          <div className={style.section}>
            <Heading key={method[1]}>
              <Trans i18nKey="about.method.1" />
            </Heading>
            <Heading alignRight key={method[2]}>
              <Trans i18nKey="about.method.2" />
            </Heading>
          </div>
        </Row>
      </Container>
      <Container grid>
        <Row start={1} end={1}>
          <div className={style.section}>
            <ContentBlock key={method[3]}>
              <div>
                <Trans i18nKey={`about.method.3`} />
              </div>
            </ContentBlock>
          </div>
        </Row>
      </Container>
      <Container grid>
        <Row start={1} end={3}>
          <ContentBlock>
            <div className={style.awardsSection}>
              <h3 className={style.awardsTitle}>Awards & Recognition</h3>
              <div className={style.awardsList}>
                <div className={style.awardItem}>
                  <div className={style.awardBadge}>1× Silver Award</div>
                  <p>For preventing potential global market disruption through critical production system optimization</p>
                  <span className={style.awardYear}>2023</span>
                </div>
                <div className={style.awardItem}>
                  <div className={style.awardBadge}>4× Bronze Awards</div>
                  <p>For production stability and CRQ excellence</p>
                  <span className={style.awardYear}>2023</span>
                </div>
                <div className={style.awardItem}>
                  <div className={style.awardBadge}>7× IBM Security Certifications</div>
                  <p>Including penetration testing, incident response, and cybersecurity fundamentals</p>
                  <span className={style.awardYear}>2022-2024</span>
                </div>
                <div className={style.awardItem}>
                  <div className={style.awardBadge}>Johns Hopkins University Certification</div>
                  <p>Data Science and Machine Learning specialization</p>
                  <span className={style.awardYear}>2024</span>
                </div>
              </div>
            </div>
          </ContentBlock>
        </Row>
      </Container>
    </Section>
  )
}
export default About
