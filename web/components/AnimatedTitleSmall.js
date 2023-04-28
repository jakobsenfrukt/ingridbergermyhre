import styles from './animatedTitle.module.scss'

export default function AnimatedTitleSmall ({ content, width }) {

  return (
    <div className={`${styles.animatedTitle} ${styles[width]} ${styles.small}`} key={content}>
      {/* content.length > 0 && content.split("").map(
        (letter, index) =>
          (
            <span className={`animatedLetter ${width}`} key={index}><span>{letter}</span></span>
          )
          ) */}

      {content.length > 0 && content.split(" ").map(
        (word, index) => (
          <div className="animatedWord" key={index}>{word.split("").map(
            (letter, index) =>
              (
                <span className={`animatedLetter ${width}`} key={index}><span>{letter}</span></span>
              )
              )}</div>
        )
      )}
    </div>
  )
}