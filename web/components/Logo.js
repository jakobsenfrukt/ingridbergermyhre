import styles from './logo.module.scss'
import { useEffect, useRef } from 'react';

// push and rotate letters with cursor
// cursor distance to trigger movement (em)
const RADIUS = 4.2
// push and tilt letters (push: em / rotate: deg)
const PUSH = .1
const ROTATE = 1.5
const MAX_PUSH = .3
const MAX_ROTATE = 12

const clamp = (value, max) => Math.max(-max, Math.min(max, value))

// --i: letter position in word
// --n: letter position in string
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

export default function Logo() {
  const logoRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reducedMotion || !finePointer) return

    const logo = logoRef.current
    // the outer .letter span holds initial position, the inner .shy span moves away from the cursor
    const letters = [...logo.querySelectorAll(`.${styles.letter}`)]
    const shys = letters.map(el => el.firstChild)
    // where each letter has been pushed to so far
    const positions = letters.map(() => ({ x: 0, y: 0, r: 0 }))
    let pointer = null
    let frame = null

    // current letter positions, minus push/rotate
    const restingCentres = () => letters.map(el => {
      const rect = el.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    })

    const update = () => {
      frame = null
      if (!pointer) return
      // px -> em: divide by font size
      const em = parseFloat(getComputedStyle(logo.firstChild).fontSize)
      restingCentres().forEach((centre, i) => {
        const el = shys[i]
        const pos = positions[i]
        const dx = (centre.x - pointer.x) / em + pos.x
        const dy = (centre.y - pointer.y) / em + pos.y
        const dist = Math.hypot(dx, dy) || 1
        if (dist > RADIUS) return
        const strength = (1 - dist / RADIUS) ** 2
        pos.x += dx / dist * strength * PUSH
        pos.y += dy / dist * strength * PUSH
        pos.r = clamp(pos.r + Math.sign(dx) * strength * ROTATE, MAX_ROTATE)
        // keep letter in a circle close to starting position
        const drift = Math.hypot(pos.x, pos.y)
        if (drift > MAX_PUSH) {
          pos.x *= MAX_PUSH / drift
          pos.y *= MAX_PUSH / drift
        }
        el.style.setProperty('--x', `${pos.x}em`)
        el.style.setProperty('--y', `${pos.y}em`)
        el.style.setProperty('--r', `${pos.r}deg`)
      })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onMove = e => {
      pointer = { x: e.clientX, y: e.clientY }
      schedule()
    }

    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={styles.logo} ref={logoRef}>
      <h1>
        <div className={styles.ibm}><Letters text="Ingrid Berger Myhre" /></div>
        <div className={styles.ff}><Letters text="Foot Forward" /></div>
      </h1>
    </div>
  )
}
