import styles from './upcoming.module.scss'

export default function Upcoming ({ projects }) {
  const upcomingProjects = projects.slice(0, 2);
  let limit = 5;
  function isUpcoming(rawDate) {
    var now = new Date();
    var date = new Date(rawDate);

    if (date > now) {
      return true
    }
    return false
  }

  //console.log(upcomingProjects)

  const upcomingDates = upcomingProjects[0].dates;

  return (
    <div className={styles.upcoming}>
      <h2>Upcoming</h2>
      <ul>
        {upcomingDates.length > 0 && upcomingDates.slice(0, limit).map(
          ({date, monthOnly, venue, city, url}) =>
            date && (
              <li key={date} className={styles.upcoming}>
                {monthOnly ? <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span> : <span className={styles.date}>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                <span className={styles.title}>Panflutes and Paperwork</span>
                {venue && city && <span className={styles.venue}>{venue}, {city}</span>}
                {url && <a href={url} target="_blank"><span>Get tickets</span></a>}
              </li>
            )
            )}
      </ul>
    </div>
  )
}