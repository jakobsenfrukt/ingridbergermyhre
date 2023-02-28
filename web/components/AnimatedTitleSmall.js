import styles from './animatedTitle.module.scss'
import { useInView } from 'react-intersection-observer'

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function style(width) {
  if (width === 'narrow') {
    return {
      transitionDelay: `${random(0.2, 0.6)}s`,
      transitionDuration: `${random(1, 3)}s`,
      fontVariationSettings: `
        'wght' 400, /* 100	to 1000 */
        'wdth' 25, /* 25 to 151 */
        'opsz' 10, /* 8 to 144 */
        'GRAD' 0, /* -200 to 150 */
        'slnt' 0, /* -10 to 0 */
        'XTRA' 420, /* 323 to 603 */
        'XOPQ' 90, /* 27 to 175 */
        'YOPQ' 68, /* 25 to 135 */
        'YTLC' ${random(416, 500)}, /* 416 to 570 - lowercase height */
        'YTUC' ${random(528, 660)}, /* 528 to 760 - uppercase height */
        'YTAS' ${random(649, 700)}, /* 649 to 854 - ascender height */
        'YTDE' ${random(-305, -200)}, /* -305 to -98 - descender height */
        'YTFI' 600; /* 560 to 788 */
      `
    }
  }
  if (width === 'normal') {
    return {
      transitionDelay: `${random(0.2, 0.6)}s`,
      transitionDuration: `${random(1, 3)}s`,
      fontVariationSettings: `
        'wght' 400, /* 100	to 1000 */
        'wdth' 76, /* 25 to 151 */
        'opsz' 10, /* 8 to 144 */
        'GRAD' 0, /* -200 to 150 */
        'slnt' 0, /* -10 to 0 */
        'XTRA' 520, /* 323 to 603 */
        'XOPQ' 90, /* 27 to 175 */
        'YOPQ' 68, /* 25 to 135 */
        'YTLC' ${random(416, 500)}, /* 416 to 570 - lowercase height */
        'YTUC' ${random(528, 660)}, /* 528 to 760 - uppercase height */
        'YTAS' ${random(649, 700)}, /* 649 to 854 - ascender height */
        'YTDE' ${random(-305, -200)}, /* -305 to -98 - descender height */
        'YTFI' 600; /* 560 to 788 */
      `
    }
  }
  if (width === 'wide') {
    return {
      transitionDelay: `${random(0.2, 0.6)}s`,
      transitionDuration: `${random(1, 3)}s`,
      fontVariationSettings: `
        'wght' 400, /* 100	to 1000 */
        'wdth' 151, /* 25 to 151 */
        'opsz' 10, /* 8 to 144 */
        'GRAD' 0, /* -200 to 150 */
        'slnt' 0, /* -10 to 0 */
        'XTRA' 603, /* 323 to 603 */
        'XOPQ' 90, /* 27 to 175 */
        'YOPQ' 68, /* 25 to 135 */
        'YTLC' ${random(416, 500)}, /* 416 to 570 - lowercase height */
        'YTUC' ${random(528, 660)}, /* 528 to 760 - uppercase height */
        'YTAS' ${random(649, 700)}, /* 649 to 854 - ascender height */
        'YTDE' ${random(-305, -200)}, /* -305 to -98 - descender height */
        'YTFI' 600; /* 560 to 788 */
      `
    }
  }
}

export default function AnimatedTitleSmall ({ content, width }) {
  const { ref: observer, inView: isInView } = useInView({ triggerOnce: false })

  return (
    <div className={`${styles.animatedTitle} ${styles[width]} ${styles.small}`} data-inview={isInView} key={content}>
      {content.length > 0 && content.split("").map(
        (letter, index) =>
          (
            <span key={index} style={style(width)}>{letter}</span>
          )
      )}
      <div className={styles.observer} ref={observer}></div>
    </div>
  )
}