import styles from './animatedTitle.module.scss'
import { useInView } from 'react-intersection-observer'


export default function AnimatedTitle ({ content, width }) {
  const { ref: observer, inView: isInView } = useInView({ triggerOnce: false })

  return (
    <div className={`${styles.animatedTitle} ${styles[width]}`} data-inview={isInView}>
      {content.length > 0 && content.split("").map(
        (letter) =>
          (
            <span>{letter}</span>
          )
      )}
      <div className={styles.observer} ref={observer}></div>
    </div>
  )
}