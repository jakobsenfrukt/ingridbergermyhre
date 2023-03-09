import styles from './quoteList.module.scss'

export default function QuoteList ({ quotes }) {
  return (
    <div className={styles.quotes}>
      <ul className={styles.quotelist}>
        {quotes.length > 0 && quotes.map(
          ({text, name, source, sourceUrl}, index) =>
            text && (
              <li className={styles.quote} key={`quote-${index}`}>
                <p className={styles.text}>{text}</p>
                <span className={styles.name}>{name}</span>
                <a className={styles.source} href={sourceUrl}>{source}</a>
              </li>
            )
        )}
      </ul>
    </div>
  )
}