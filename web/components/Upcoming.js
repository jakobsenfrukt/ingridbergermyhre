import { useState } from "react";
import styles from './upcoming.module.scss'
import Link from 'next/link'
import { isUpcoming } from './DateList.js'

export default function Upcoming({ projects, limit }) {
  const upcomingDates = projects.filter(i => !i.hideUpcoming).map(project => project.dates.map(date => ({
    date: date,
    title: project.title,
    slug: project.slug,
    color: project.color
  }))).flat()
    .filter(i => isUpcoming(i.date.date))
    .filter(i => i.date.status !== 'in-residency')
    .sort((a, b) => (new Date(a.date.date) - new Date(b.date.date)))

  const [maxLimit, setMaxLimit] = useState(limit);
  function showAll(){
    setMaxLimit(1000);
  }

  function collapse(){
    setMaxLimit(limit);
  }

  function replaceHyphens(string) {
    var newString = string.replace(/-/g, ' ')
    return newString
  }

  return (
    <div className={styles.upcoming}>
      <h2>Upcoming</h2>
      <ul>
        {upcomingDates.length > 0 && upcomingDates.slice(0, maxLimit).map(
          (event, index) =>
            event.date && (
              <li key={event.title + index} className={styles.upcoming} style={{ '--color-palette': event.color.hex }}>
                <div className={styles.date}>
                  {event.date.monthOnly ? <span className={styles.date}>{new Date(event.date.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span> : <span className={styles.date}>{new Date(event.date.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}

                  {event.date.status && event.date.status === 'cancelled' && <span className={styles.status} data-status={event.date.status}>{replaceHyphens(event.date.status)}</span>}
                </div>
                <span className={styles.title}>{event.title}</span>
                {event.date.venue && event.date.city && <span className={styles.venue}>{event.date.venue}, {event.date.city}</span>}
                {event.slug && <Link href="/projects/[slug]" as={`/projects/${event.slug.current}`}><a><span>More info</span></a></Link>}
              </li>
            )
        )}
      </ul>
      {maxLimit && maxLimit < upcomingDates.length && <button onClick={showAll}>&darr; &nbsp; Show full tour list &nbsp; &darr;</button>}
      {maxLimit === 1000 && <button onClick={collapse}>&uarr; &nbsp; Hide full tour list &nbsp; &uarr;</button>}
    </div>
  )
}