import styles from './animatedTitle.module.scss'
import { useInView } from 'react-intersection-observer'

export default function AnimatedTitleSmall ({ content, width }) {
  const { ref: observer, inView: isInView } = useInView({ triggerOnce: false })

  return (
    <div className={`animatedTitle ${styles.animatedTitle} ${styles[width]} ${styles.small}`} key={content} data-inview={isInView}>
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