import styles from './animatedTitle.module.scss'
import { useInView } from 'react-intersection-observer'
import AnimatedLetter from './AnimatedLetter'

export default function AnimatedTitle ({ content, width }) {
  const { ref: observer, inView: isInView } = useInView({ triggerOnce: false })

  return (
    <div className={`animatedTitle ${styles.animatedTitle} ${styles[width]}`} data-inview={isInView} key={content}>
      {content.length > 0 && content.split(" ").map(
        (word, index) => (
          <div className="animatedWord" key={index}>{word.split("").map(
            (letter, index) =>
              (
                <span className={`animatedLetter ${width}`} key={index}>{letter}</span>
              )
              )}</div>
        )
      )}
      <span className={styles.observer} ref={observer}></span>
    </div>
  )
}