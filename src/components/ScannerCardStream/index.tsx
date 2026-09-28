import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import * as THREE from 'three'
import cn from 'classnames'
import style from './index.module.css'

const ASCII_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?"

const generateCode = (width: number, height: number): string => {
  let text = ''
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
  }
  let out = ''
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + '\n'
  }
  return out
}

type Props = {
  cardImages?: string[]
  repeat?: number
  cardGap?: number
  initialSpeed?: number
  direction?: -1 | 1
  friction?: number
}

const defaultImages = [
  '/projects/ai-req/hero.jpeg',
  '/projects/finrecon/hero.jpeg',
  '/projects/connect-teams/hero.jpeg',
  '/projects/ai-agent/hero.jpeg',
  '/projects/claraluna/hero.jpeg',
]

export default function ScannerCardStream({
  cardImages = defaultImages,
  repeat = 6,
  cardGap = 60,
  initialSpeed = 150,
  direction = -1,
  friction = 0.95,
}: Props) {
  const [isScanning, setIsScanning] = useState(false)
  const isPausedRef = useRef(false)

  const cards = useMemo(
    () =>
      Array.from({ length: cardImages.length * repeat }, (_, i) => ({
        id: i,
        image: cardImages[i % cardImages.length],
        ascii: generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13)),
      })),
    [cardImages, repeat]
  )

  const cardLineRef = useRef<HTMLDivElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const originalAscii = useRef(new Map<number, string>())

  const cardStreamState = useRef({
    position: 0,
    velocity: initialSpeed,
    direction: direction,
    isDragging: false,
    lastMouseX: 0,
    lastTime: performance.now(),
    cardLineWidth: (400 + cardGap) * cards.length,
    friction: friction,
    minVelocity: 30,
  })

  const scannerStateRef = useRef({ isScanning: false })

  useEffect(() => {
    const cardLine = cardLineRef.current
    const particleCanvas = particleCanvasRef.current
    const scannerCanvas = scannerCanvasRef.current
    const root = rootRef.current
    if (!cardLine || !particleCanvas || !scannerCanvas || !root) return

    cards.forEach((card) => originalAscii.current.set(card.id, card.ascii))

    let animationFrameId: number
    const containerWidth = root.offsetWidth

    // Three.js particle setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(
      -containerWidth / 2,
      containerWidth / 2,
      125,
      -125,
      1,
      1000
    )
    camera.position.z = 100
    const renderer = new THREE.WebGLRenderer({
      canvas: particleCanvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(containerWidth, 250)
    renderer.setClearColor(0x000000, 0)

    const particleCount = 400
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    const alphas = new Float32Array(particleCount)

    const texCanvas = document.createElement('canvas')
    texCanvas.width = 100
    texCanvas.height = 100
    const texCtx = texCanvas.getContext('2d')!
    const half = 50
    const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half)
    gradient.addColorStop(0.025, '#fff')
    gradient.addColorStop(0.1, 'hsl(217, 61%, 33%)')
    gradient.addColorStop(0.25, 'hsl(217, 64%, 6%)')
    gradient.addColorStop(1, 'transparent')
    texCtx.fillStyle = gradient
    texCtx.arc(half, half, half, 0, Math.PI * 2)
    texCtx.fill()
    const texture = new THREE.CanvasTexture(texCanvas)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * containerWidth * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250
      velocities[i] = Math.random() * 60 + 30
      alphas[i] = (Math.random() * 8 + 2) / 10
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 15.0;
          gl_Position = projectionMatrix * mvPosition;
        }`,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Scanner particles (2D canvas)
    const ctx = scannerCanvas.getContext('2d')!
    scannerCanvas.width = containerWidth
    scannerCanvas.height = 300
    const baseMaxParticles = 800
    const scanTargetMaxParticles = 2500
    let currentMaxParticles = baseMaxParticles
    let scannerParticles: {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number
      life: number
      decay: number
    }[] = []
    const createScannerParticle = () => ({
      x: containerWidth / 2 + (Math.random() - 0.5) * 3,
      y: Math.random() * 300,
      vx: Math.random() * 0.8 + 0.2,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.6,
      life: 1.0,
      decay: Math.random() * 0.02 + 0.005,
    })
    for (let i = 0; i < baseMaxParticles; i++) {
      scannerParticles.push(createScannerParticle())
    }

    const runScrambleEffect = (element: HTMLElement, cardId: number) => {
      if (element.dataset.scrambling === 'true') return
      element.dataset.scrambling = 'true'
      const originalText = originalAscii.current.get(cardId) || ''
      let scrambleCount = 0
      const maxScrambles = 10
      const interval = setInterval(() => {
        element.textContent = generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13))
        scrambleCount++
        if (scrambleCount >= maxScrambles) {
          clearInterval(interval)
          element.textContent = originalText
          delete element.dataset.scrambling
        }
      }, 30)
    }

    const updateCardEffects = () => {
      const scannerX = containerWidth / 2
      const scannerWidth = 8
      const scannerLeft = scannerX - scannerWidth / 2
      const scannerRight = scannerX + scannerWidth / 2
      let anyCardIsScanning = false

      cardLine.querySelectorAll<HTMLElement>('[data-card-wrapper]').forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect()
        const rootRect = root.getBoundingClientRect()
        const relLeft = rect.left - rootRect.left
        const relRight = rect.right - rootRect.left
        const normalCard = wrapper.querySelector<HTMLElement>('[data-card-normal]')!
        const asciiCard = wrapper.querySelector<HTMLElement>('[data-card-ascii]')!
        const asciiContent = asciiCard?.querySelector<HTMLElement>('pre')

        if (relLeft < scannerRight && relRight > scannerLeft) {
          anyCardIsScanning = true
          if (asciiContent && wrapper.dataset.scanned !== 'true') {
            runScrambleEffect(asciiContent, index)
          }
          wrapper.dataset.scanned = 'true'
          const intersectLeft = Math.max(scannerLeft - relLeft, 0)
          const intersectRight = Math.min(scannerRight - relLeft, rect.width)
          normalCard?.style.setProperty('--clip-right', `${(intersectLeft / rect.width) * 100}%`)
          asciiCard?.style.setProperty('--clip-left', `${(intersectRight / rect.width) * 100}%`)
        } else {
          delete wrapper.dataset.scanned
          if (relRight < scannerLeft) {
            normalCard?.style.setProperty('--clip-right', '100%')
            asciiCard?.style.setProperty('--clip-left', '100%')
          } else {
            normalCard?.style.setProperty('--clip-right', '0%')
            asciiCard?.style.setProperty('--clip-left', '0%')
          }
        }
      })

      setIsScanning(anyCardIsScanning)
      scannerStateRef.current.isScanning = anyCardIsScanning
    }

    // Interaction handlers
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      cardStreamState.current.isDragging = true
      cardStreamState.current.lastMouseX = clientX
      cardStreamState.current.lastTime = performance.now()
    }

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!cardStreamState.current.isDragging) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const deltaX = clientX - cardStreamState.current.lastMouseX
      const currentTime = performance.now()
      const deltaTime = (currentTime - cardStreamState.current.lastTime) / 1000

      cardStreamState.current.position += deltaX
      if (deltaTime > 0) {
        cardStreamState.current.velocity = Math.min(Math.abs(deltaX / deltaTime), 800)
        cardStreamState.current.direction = deltaX > 0 ? 1 : -1
      }
      cardStreamState.current.lastMouseX = clientX
      cardStreamState.current.lastTime = currentTime
    }

    const handleMouseUp = () => {
      cardStreamState.current.isDragging = false
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      cardStreamState.current.position -= e.deltaY * 2
      cardStreamState.current.velocity = Math.min(Math.abs(e.deltaY * 3), 600)
      cardStreamState.current.direction = e.deltaY > 0 ? -1 : 1
    }

    cardLine.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    cardLine.addEventListener('touchstart', handleMouseDown, { passive: true })
    window.addEventListener('touchmove', handleMouseMove, { passive: true })
    window.addEventListener('touchend', handleMouseUp)
    cardLine.addEventListener('wheel', handleWheel, { passive: false })

    // Animation loop
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - cardStreamState.current.lastTime) / 1000
      cardStreamState.current.lastTime = currentTime

      if (!isPausedRef.current && !cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
          cardStreamState.current.velocity *= cardStreamState.current.friction
        }
        cardStreamState.current.position +=
          cardStreamState.current.velocity * cardStreamState.current.direction * deltaTime
      }

      const { position, cardLineWidth } = cardStreamState.current
      if (position < -cardLineWidth) cardStreamState.current.position = containerWidth
      else if (position > containerWidth) cardStreamState.current.position = -cardLineWidth

      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`
      updateCardEffects()

      // Update Three.js particles
      const time = currentTime * 0.001
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016
        if (positions[i * 3] > containerWidth / 2 + 100)
          positions[i * 3] = -containerWidth / 2 - 100
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05))
      }
      geometry.attributes.position.needsUpdate = true
      ;(geometry.attributes.alpha as THREE.BufferAttribute).needsUpdate = true
      renderer.render(scene, camera)

      // Update scanner 2D particles
      ctx.clearRect(0, 0, containerWidth, 300)
      const targetCount = scannerStateRef.current.isScanning
        ? scanTargetMaxParticles
        : baseMaxParticles
      currentMaxParticles += (targetCount - currentMaxParticles) * 0.05
      while (scannerParticles.length < currentMaxParticles)
        scannerParticles.push(createScannerParticle())
      while (scannerParticles.length > currentMaxParticles) scannerParticles.pop()

      scannerParticles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay
        if (p.life <= 0 || p.x > containerWidth) Object.assign(p, createScannerParticle())
        ctx.globalAlpha = p.alpha * p.life
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    cardStreamState.current.position = containerWidth
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      cardLine.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      cardLine.removeEventListener('touchstart', handleMouseDown)
      window.removeEventListener('touchmove', handleMouseMove)
      window.removeEventListener('touchend', handleMouseUp)
      cardLine.removeEventListener('wheel', handleWheel)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [cards, cardGap, friction])

  return (
    <div ref={rootRef} className={style.root}>
      <canvas ref={particleCanvasRef} className={style.particleCanvas} />
      <canvas ref={scannerCanvasRef} className={style.scannerCanvas} />

      <div
        className={cn(style.scannerLine, {
          [style.scannerLineVisible]: isScanning,
          [style.scannerLineHidden]: !isScanning,
        })}
      />

      <div className={style.trackArea}>
        <div ref={cardLineRef} className={style.cardLine} style={{ gap: `${cardGap}px` }}>
          {cards.map((card) => (
            <div key={card.id} className={style.cardWrapper} data-card-wrapper>
              <div className={style.cardNormal} data-card-normal>
                <img
                  src={card.image}
                  alt="Project"
                  className={style.cardImage}
                  loading="lazy"
                />
              </div>
              <div className={style.cardAscii} data-card-ascii>
                <pre className={style.asciiContent}>{card.ascii}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
