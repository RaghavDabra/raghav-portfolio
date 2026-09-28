import style from './index.module.css'

// Components
import Section from 'components/Section'
import Container, { Row } from 'components/Container'
import ImageTrigger from 'components/ImageTrigger'
import Square from 'components/Square'
import Heading from 'components/Heading'
import GlassCard from 'components/GlassCard'

// Hooks
import { Trans, useTranslation } from 'react-i18next'

const AI_SKILLS = ['LangChain', 'LangGraph', 'Multi-Agent Systems', 'RAG Pipelines', 'Prompt Engineering', 'Generative AI', 'Claude API']
const FULLSTACK_SKILLS = ['React', 'TypeScript', 'Node.js', 'Spring Boot', 'FastAPI', 'Flask', 'Python', 'Java', 'SQL', 'REST APIs']
const CLOUD_SKILLS = ['AWS', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins', 'CI/CD', 'Splunk', 'AppDynamics']
const ARCH_SKILLS = ['Microservices', 'Distributed Systems', 'System Design', 'Agile / Scrum', 'SDLC', 'Change Governance']

function About() {
  const { t } = useTranslation('translation', { keyPrefix: 'about' })
  const intro: string[] = t('intro', { returnObjects: true })
  const clanTitle: string = t('clan_title')
  const methodTitle: string = t('method_title')
  const method: string[] = t('method', { returnObjects: true })

  return (
    <Section name="about" className={style.root}>

      {/* ─── Bio Intro Card ─── */}
      <Container grid>
        <Row start={2} end={2}>
          <GlassCard className={style.bioCard}>
            <span className={style.cardBadge}>About Me</span>
            <p className={style.bioText}>
              <Trans
                i18nKey="about.intro.0"
                components={{
                  ImageMelbourne: <ImageTrigger name="melbourne" sizes={[2, 2]} />,
                  ImageBoA: <ImageTrigger name="boa" sizes={[2.5, 1.5]} />,
                  ImageUniMelb: <ImageTrigger name="unimelb" sizes={[2, 2]} />
                }}
              />
            </p>
          </GlassCard>
        </Row>
      </Container>

      {/* ─── Experience Card ─── */}
      <Container grid>
        <Row start={1} end={3}>
          <GlassCard className={style.highlightCard}>
            <span className={style.cardBadge}>Experience</span>

            <div className={style.expEntry}>
              <h4 className={style.expCompany}>Bank of America</h4>
              <p className={style.expRole}>Software Engineer &middot; 1.5 Years</p>
              <p className={style.bioText}>
                Owned mission-critical financial production systems, orchestrating batch pipelines across distributed databases with zero SLA breaches. Built Python automation reducing cycle time by ~40% and led change governance across 4 global teams.
              </p>
            </div>

            <div className={style.expEntry}>
              <h4 className={style.expCompany}>Debuilt Property</h4>
              <p className={style.expRole}>Software Engineer, AI Engineering &middot; Present</p>
              <p className={style.bioText}>
                Designing and building a production multi-agent AI platform using LangChain and LangGraph, automating Due Diligence reporting, compliance checks, and creating agents used by 250+ employees.
              </p>
            </div>

            <div className={style.expEntry}>
              <h4 className={style.expCompany}>Thales</h4>
              <p className={style.expRole}>Software Engineer Intern &middot; Biometrics</p>
              <p className={style.bioText}>
                Built and enhanced Java-based biometric authentication components across identity-verification platforms. Performed application security testing using Burp Suite, uncovering vulnerabilities in authentication flows. Implemented targeted fixes validated through functional and regression testing.
              </p>
            </div>
          </GlassCard>
        </Row>
      </Container>

      {/* ─── Detailed Bio Cards ─── */}
      <Container grid>
        <Row start={1} end={3}>
          <div className={style.bioGrid}>
            <GlassCard className={style.bioDetailCard}>
              <span className={style.cardBadge}>Education</span>
              <p className={style.bioText}>
                <Trans
                  i18nKey="about.intro.2"
                  components={{
                    ImageUniMelb: <ImageTrigger name="unimelb" sizes={[2, 2]} />
                  }}
                />
              </p>
            </GlassCard>
            <GlassCard className={style.bioDetailCard}>
              <span className={style.cardBadge}>AI &amp; Innovation</span>
              <p className={style.bioText}>
                <Trans
                  i18nKey="about.intro.3"
                  components={{
                    ImageBoA: <ImageTrigger name="boa" sizes={[2.5, 1.5]} />
                  }}
                />
              </p>
            </GlassCard>
          </div>
        </Row>
      </Container>

      {/* ─── ACHIEVEMENTS RECOGNITION Heading ─── */}
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

      {/* ─── 4-Card Bento Achievement Grid ─── */}
      <Container grid>
        <Row start={1} end={3}>
          <div className={style.bentoGrid}>
            <GlassCard className={style.bentoCard}>
              <span className={style.cardBadge}>Bank of America &middot; EMBS</span>
              <div className={style.cardMetric}>~40%</div>
              <p className={style.cardMetricLabel}>Faster processing</p>
              <p className={style.cardContent}>
                Owned critical 4BD/6BD monthly financial production cycles for Enterprise Mortgage-Backed Securities. Built Python automation reducing cycle time by ~40%. Orchestrated 5+ concurrent batch pipelines across 4 distributed database systems with zero SLA breaches over 18 months.
              </p>
            </GlassCard>
            <GlassCard className={style.bentoCard}>
              <span className={style.cardBadge}>Reliability &amp; Operations</span>
              <div className={style.cardMetric}>20+</div>
              <p className={style.cardMetricLabel}>Zero-incident deployments</p>
              <p className={style.cardContent}>
                Led CRQ governance across 4 cross-functional global teams, managing production deployments with zero market-impact incidents. Contributed Java Spring enhancements; monitored via Splunk and AppDynamics. Resolved 12+ incident types with structured RCA and runbook documentation.
              </p>
            </GlassCard>
            <GlassCard className={style.bentoCard}>
              <span className={style.cardBadge}>Honors</span>
              <div className={style.cardMetric}>5x</div>
              <p className={style.cardMetricLabel}>Bank of America Awards</p>
              <p className={style.cardContent}>
                1x Silver Award for preventing potential global market disruption through critical production system optimization. 4x Bronze Awards for production stability and CRQ governance excellence across an 18-month tenure.
              </p>
            </GlassCard>
            <GlassCard className={style.bentoCard}>
              <span className={style.cardBadge}>Credentials</span>
              <div className={style.cardMetric}>7x</div>
              <p className={style.cardMetricLabel}>IBM Cybersecurity Certified</p>
              <p className={style.cardContent}>
                7x IBM Cybersecurity certifications including penetration testing, incident response, and compliance frameworks. Johns Hopkins University certification in Data Science and Machine Learning.
              </p>
            </GlassCard>
          </div>
        </Row>
      </Container>

      {/* ─── TECHNICAL & EXPERTISE Heading ─── */}
      <Container grid outerRightOnMobile>
        <Row start={1} end={3}>
          <div className={style.section}>
            <Heading key={methodTitle}>
              <Trans i18nKey="about.method_title" components={{ pre: <pre /> }} />
            </Heading>
          </div>
        </Row>
      </Container>

      {/* ─── Method Intro Card ─── */}
      <Container grid>
        <Row start={2} end={2}>
          <GlassCard className={style.methodCard}>
            <span className={style.cardBadge}>Philosophy</span>
            <p className={style.bioText}>
              <Trans i18nKey="about.method.0" />
            </p>
          </GlassCard>
        </Row>
      </Container>

      {/* ─── Categorized Tech Stack Cards ─── */}
      <Container grid>
        <Row start={1} end={3}>
          <div className={style.techGrid}>
            <GlassCard className={style.techCard}>
              <span className={style.cardBadge}>AI &amp; Agentic Systems</span>
              <div className={style.techPills}>
                {AI_SKILLS.map(s => (
                  <span key={s} className={style.techPill}>{s}</span>
                ))}
              </div>
            </GlassCard>
            <GlassCard className={style.techCard}>
              <span className={style.cardBadge}>Full-Stack Engineering</span>
              <div className={style.techPills}>
                {FULLSTACK_SKILLS.map(s => (
                  <span key={s} className={style.techPill}>{s}</span>
                ))}
              </div>
            </GlassCard>
            <GlassCard className={style.techCard}>
              <span className={style.cardBadge}>Cloud &amp; DevOps</span>
              <div className={style.techPills}>
                {CLOUD_SKILLS.map(s => (
                  <span key={s} className={style.techPill}>{s}</span>
                ))}
              </div>
            </GlassCard>
            <GlassCard className={style.techCard}>
              <span className={style.cardBadge}>Architecture &amp; Practices</span>
              <div className={style.techPills}>
                {ARCH_SKILLS.map(s => (
                  <span key={s} className={style.techPill}>{s}</span>
                ))}
              </div>
            </GlassCard>
          </div>
        </Row>
      </Container>

      {/* ─── Final Statement Card ─── */}
      <Container grid>
        <Row start={1} end={2}>
          <GlassCard className={style.finalCard}>
            <p className={style.finalStatement}>
              <Trans i18nKey="about.method.3" />
            </p>
          </GlassCard>
        </Row>
      </Container>
    </Section>
  )
}
export default About
