import styles from './logo.module.scss'
import { useEffect, useRef } from 'react';

// how close the cursor has to be before letters react (px)
const RADIUS = 120
// how far a letter moves at most (px)
const MAX_SHIFT = 8
// how much a letter tilts at most (deg)
const MAX_ROTATE = 15

// sticky variant: letters get nudged a bit every frame the cursor is near, and stay where they end up
// how far a letter gets pushed per frame (px) and how much it tilts per frame (deg)
const STICKY_PUSH = 3
const STICKY_ROTATE = 1.5
// how far a letter can wander from its original spot (px), and how far it can tilt (deg)
const STICKY_MAX_DRIFT = 15
const STICKY_MAX_ROTATE = 12

const clamp = (value, max) => Math.max(-max, Math.min(max, value))

// the variant can be picked with ?logo=sticky or ?logo=spring in the url, and is remembered while browsing
function getVariant(fallback) {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('logo')
    if (fromUrl) sessionStorage.setItem('logo', fromUrl)
    return fromUrl || sessionStorage.getItem('logo') || fallback
  } catch {
    return fallback
  }
}

// --i is a letter's position in its word, --n its position in the whole text (both start at 1),
// --count is how many letters the whole text has
function Letters({ text }) {
  const count = text.replace(/ /g, '').length
  let n = 0
  return text.split(' ').map((word, i) => (
    <span key={i} className={styles.word}>
      {[...word].map((letter, j) => (
        <span
          key={j}
          className={[styles.letter, styles[letter.toLowerCase()]].filter(Boolean).join(' ')}
          style={{ '--i': j + 1, '--n': ++n, '--count': count }}
        >
          <span className={styles.shy}>{letter}</span>
        </span>
      ))}
    </span>
  ))
}

export default function Logo({ variant: defaultVariant = 'spring' }) {
  const logoRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reducedMotion || !finePointer) return

    const logo = logoRef.current
    // the outer .letter span holds the resting pose (like the fall), the inner .shy span moves away from the cursor
    const sticky = getVariant(defaultVariant) === 'sticky'
    // sticky moves every letter, spring only moves "Foot Forward"
    const selector = sticky ? `.${styles.letter}` : `.${styles.ff} .${styles.letter}`
    const letters = [...logo.querySelectorAll(selector)]
    const shys = letters.map(el => el.firstChild)
    // where each sticky letter has been pushed to so far
    const positions = letters.map(() => ({ x: 0, y: 0, r: 0 }))
    let pointer = null
    let frame = null

    // where each letter rests right now, including its pose but not its movement away from the cursor
    const restingCentres = () => letters.map(el => {
      const rect = el.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    })

    const updateSticky = () => {
      if (!pointer) return
      restingCentres().forEach((centre, i) => {
        const el = shys[i]
        const pos = positions[i]
        const dx = centre.x + pos.x - pointer.x
        const dy = centre.y + pos.y - pointer.y
        const dist = Math.hypot(dx, dy) || 1
        if (dist > RADIUS) return
        const strength = (1 - dist / RADIUS) ** 2
        pos.x += dx / dist * strength * STICKY_PUSH
        pos.y += dy / dist * strength * STICKY_PUSH
        pos.r = clamp(pos.r + Math.sign(dx) * strength * STICKY_ROTATE, STICKY_MAX_ROTATE)
        // keep it within a circle around where it started
        const drift = Math.hypot(pos.x, pos.y)
        if (drift > STICKY_MAX_DRIFT) {
          pos.x *= STICKY_MAX_DRIFT / drift
          pos.y *= STICKY_MAX_DRIFT / drift
        }
        el.style.setProperty('--x', `${pos.x}px`)
        el.style.setProperty('--y', `${pos.y}px`)
        el.style.setProperty('--r', `${pos.r}deg`)
      })
    }

    const updateSpring = () => {
      const offsets = restingCentres().map(centre => {
        if (!pointer) return [0, 0, 0]
        const dx = centre.x - pointer.x
        const dy = centre.y - pointer.y
        const dist = Math.hypot(dx, dy) || 1
        if (dist > RADIUS) return [0, 0, 0]
        const strength = (1 - dist / RADIUS) ** 2
        return [
          dx / dist * strength * MAX_SHIFT,
          dy / dist * strength * MAX_SHIFT,
          Math.sign(dx) * strength * MAX_ROTATE,
        ]
      })
      shys.forEach((el, i) => {
        const [x, y, r] = offsets[i]
        el.style.setProperty('--x', `${x}px`)
        el.style.setProperty('--y', `${y}px`)
        el.style.setProperty('--r', `${r}deg`)
      })
    }

    const update = () => {
      frame = null
      sticky ? updateSticky() : updateSpring()
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onMove = e => {
      pointer = { x: e.clientX, y: e.clientY }
      schedule()
    }
    const onLeave = () => {
      pointer = null
      schedule()
    }

    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [defaultVariant])

  return (
    <div className={styles.logo} ref={logoRef}>
      <h1>
        <div className={styles.ibm}><Letters text="Ingrid Berger Myhre" /></div>
        <div className={styles.ff}><Letters text="Foot Forward" /></div>
      </h1>
    </div>
  )
}
