import styles from './animatedLetter.module.scss'

export default function AnimatedLetter ({ letter, width, inview }) {
  return (
    <span className={`${styles.animatedLetter} ${styles[width]}`} data-inview={inview}>{letter}</span>
  )
}