import styles from './upcoming.module.scss'

export default function Upcoming ({ dates }) {
  function isUpcoming(rawDate) {
    var now = new Date();
    var date = new Date(rawDate);

    if (date > now) {
      return true
    }
    return false
  }
  return (
    <div className={styles.upcoming}>
      <h2>Upcoming</h2>
      <ul>
        <li>date</li><li>date</li><li>date</li><li>date</li><li>date</li>
        {/*dates.length > 0 && dates.map(
          ({date, monthOnly, venue, city, url}) =>
            date && (
              <li key={date} className={`${isUpcoming(date) ? styles.upcoming : styles.passed}`}>
                {monthOnly ? <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span> : <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                {venue && <span className={styles.venue}>{venue}, </span>}
                <span className={styles.city}>{city}</span>
                {url && <a href={url} target="_blank">Visit website</a>}
              </li>
            )
            )*/}
      </ul>
    </div>
  )
}