import styles from './upcoming.module.scss'
import Link from 'next/link'
import { isUpcoming } from './DateList.js'

export default function Upcoming({ projects }) {
  let limit = 5;


  const upcomingDates = projects.map(project => project.dates.map(date => ({
    date: date,
    title: project.title,
    slug: project.slug
  }))).flat()
    .filter(i => isUpcoming(i.date.date))
    .sort((a, b) => (new Date(a.date.date) - new Date(b.date.date)))

  return (
    <div className={styles.upcoming}>
      <h2>Upcoming</h2>
      <ul>
        {upcomingDates.length > 0 && upcomingDates.slice(0, limit).map(
          (event) =>
            event.date && (
              <li key={event.date} className={styles.upcoming}>
                {event.date.monthOnly ? <span className={styles.date}>{new Date(event.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span> : <span className={styles.date}>{new Date(event.date.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                <span className={styles.title}>{event.title}</span>
                {event.date.venue && event.date.city && <span className={styles.venue}>{event.date.venue}, {event.date.city}</span>}
                {event.slug && <Link href="/projects/[slug]" as={`/projects/${event.slug.current}`}><span>Get tickets</span></Link>}
              </li>
            )
        )}
      </ul>
    </div>
  )
}