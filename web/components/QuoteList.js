import styles from './quoteList.module.scss'

export default function QuoteList ({ quotes }) {
  return (
    <div className={styles.quotes}>
      <h2>Reviews & mentions</h2>
      <ul className={styles.quotelist}>
        {quotes.length > 0 && quotes.map(
          ({text, name, source, sourceUrl}) =>
            text && (
              <li className={styles.quote} key={name}>
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