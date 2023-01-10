import styles from './quoteList.module.scss'

export default function QuoteList ({ quotes }) {
  return (
    <div className={styles.quotes}>
      <h2>Reviews & mentions</h2>
      <ul>
        {quotes.length > 0 && quotes.map(
          ({text, name, source, sourceUrl}) =>
            text && (
              <li key={name}>
                <p className={styles.text}>{text}</p>
                {name}
                {source}
                {sourceUrl}
              </li>
            )
        )}
      </ul>
    </div>
  )
}