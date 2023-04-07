import styles from './animatedTitle.module.scss'
import { useInView } from 'react-intersection-observer'
import AnimatedLetter from './AnimatedLetter'

export default function AnimatedTitle ({ content, width }) {
  const { ref: observer, inView: isInView } = useInView({ triggerOnce: false })

  return (
    <div className={`${styles.animatedTitle} ${styles[width]}`} data-inview={isInView} key={content}>
      {content.length > 0 && content.split("").map(
        (letter, index) =>
          (
            <AnimatedLetter key={index} letter={letter} width={width} inview={isInView} />
          )
      )}
      <div className={styles.observer} ref={observer}></div>
    </div>
  )
}