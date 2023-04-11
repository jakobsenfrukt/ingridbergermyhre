import styles from './animatedTitle.module.scss'
import { useInView } from 'react-intersection-observer'
import AnimatedLetter from './AnimatedLetter'

export default function AnimatedTitleSmall ({ content, width }) {
  const { ref: observer, inView: isInView } = useInView({ triggerOnce: false })

  return (
    <div className={`${styles.animatedTitle} ${styles[width]} ${styles.small}`} data-inview={isInView} key={content}>
      {content.length > 0 && content.split("").map(
        (letter, index) =>
          (
            <span className={`animatedLetter ${width}`} key={index}><span>{letter}</span></span>
          )
      )}
      <div className={styles.observer} ref={observer}></div>
    </div>
  )
}