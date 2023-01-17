import styles from './dateList.module.scss'

export default function DateList ({ dates }) {
  function isUpcoming(rawDate) {
    var now = new Date();
    var date = new Date(rawDate);

    if (date > now) {
      return true
    }
    return false
  }

  const upcomingDates = [...dates].sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  }).filter(i => isUpcoming(i.date));
  const previousDates = [...dates].sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  }).filter(i => !isUpcoming(i.date));

  return (
    <div className={styles.dates}>
      {upcomingDates.length > 0 && (<div><h2>Upcoming</h2>
      <ul>
        {upcomingDates.map(
          ({date, monthOnly, venue, city, status, url}, index) =>
            date && (
              <li key={index} className={styles.upcoming}>
                {monthOnly ? <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span> : <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                {venue && <span className={styles.venue}>{venue}, </span>}
                <span className={styles.city}>{city}</span>
                {status && status !== 'default' && <span className={styles.status} data-status={status}>{status}</span>}
                {url && isUpcoming(date) && status !== 'cancelled' && <a href={url} target="_blank">Visit website</a>}
              </li>
            )
        )}
      </ul></div>)}
      {previousDates.length > 0 && (<div><h2>Previously</h2>
      <ul>
        {previousDates.length > 0 && previousDates.map(
          ({date, monthOnly, venue, city, status}, index) =>
            date && (
              <li key={index} className={styles.passed}>
                {monthOnly ? <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span> : <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                {venue && <span className={styles.venue}>{venue}, </span>}
                <span className={styles.city}>{city}</span>
                {status && status !== 'default' && <span className={styles.status} data-status={status}>{status}</span>}
              </li>
            )
        )}
      </ul></div>)}
    </div>
  )
}