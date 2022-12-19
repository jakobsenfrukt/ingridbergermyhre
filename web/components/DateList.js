import styles from './dateList.module.scss'

export default function DateList ({ dates }) {
  return (
    <div className={styles.dates}>
      <h2>Dates</h2>
      <ul>
        {dates.length > 0 && dates.map(
          ({date, monthOnly, venue, city, url}) =>
            date && (
              <li key={date}>
                {monthOnly ? <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span> : <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                {venue && <span className={styles.venue}>{venue}, </span>}
                <span className={styles.city}>{city}</span>
                {url && <a href={url} target="_blank">Visit website</a>}
              </li>
            )
        )}
      </ul>
    </div>
  )
}