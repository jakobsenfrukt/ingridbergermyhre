import { useState, useEffect } from 'react'
import styles from './dateList.module.scss'

export function isUpcoming(rawDate) {
  var now = new Date().setHours(0, 0, 0, 0);
  var date = new Date(rawDate).setHours(0, 0, 0, 0);

  if (date >= now) {
    return true
  }
  return false
}

export default function DateList({ dates }) {
  const upcomingDates = [...dates].sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  }).filter(i => isUpcoming(i.date));
  const previousDates = [...dates].sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  }).filter(i => !isUpcoming(i.date));

  const datesCount = upcomingDates.length + previousDates.length;

  const [upcomingLimit, setUpcomingLimit] = useState(6);
  const [previousLimit, setPreviousLimit] = useState(6);

  function showMoreUpcoming() {
    setUpcomingLimit(upcomingLimit + 6)
  }
  function showMorePrevious() {
    setPreviousLimit(previousLimit + 6)
  }

  function collapseUpcoming() {
    setUpcomingLimit(6)
  }
  function collapsePrevious() {
    setPreviousLimit(6)
  }

  function replaceHyphens(string) {
    var newString = string.replace(/-/g, ' ')
    return newString
  }


  return (
    <div className={styles.dates}>
      {upcomingDates.length > 0 && (<div><h2>Upcoming</h2>
        <ul>
          {upcomingDates.slice(0, upcomingLimit).map(
            ({ date, monthOnly, venue, city, status, url }, index) =>
              date && (
                <li key={index} className={styles.upcoming}>
                  <div className={styles.date}>
                    {monthOnly ? <span>{new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span> : <span>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}

                    {status && status !== 'default' && <span className={styles.status} data-status={status}>{replaceHyphens(status)}</span>}
                  </div>
                  {venue && <span className={styles.venue}>{venue}, </span>}
                  <span className={styles.city}>{city}</span>
                  {url && isUpcoming(date) && status !== 'cancelled' && <a href={url} target="_blank">
                    <svg className={styles.linkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                      <title>
                        Visit website
                      </title>
                      <path fill="currentColor" d="M6 1h5v5L8.86 3.85 4.7 8 4 7.3l4.15-4.16L6 1Z M2 3h2v1H2v6h6V8h1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
                    </svg>
                  </a>}
                </li>
              )
          )}
        </ul>
        {upcomingDates.length > upcomingLimit && <button onClick={showMoreUpcoming} className={styles.showMore}>Show more ({upcomingLimit}/{upcomingDates.length})</button>}
        {upcomingDates.length > 10 && upcomingDates.length < upcomingLimit && <button onClick={collapseUpcoming} className={styles.showLess}>Show less</button>}
        </div>)}
      {previousDates.length > 0 && (<div><h2>Previously</h2>
        <ul>
          {previousDates.slice(0, previousLimit).map(
            ({ date, monthOnly, venue, city, status }, index) =>
              date && (
                <li key={index} className={styles.passed}>
                  <div className={styles.date}>
                    {monthOnly ? <span>{new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span> : <span>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}

                    {status && status !== 'default' && <span className={styles.status} data-status={status}>{replaceHyphens(status)}</span>}
                  </div>
                  {venue && <span className={styles.venue}>{venue}, </span>}
                  <span className={styles.city}>{city}</span>
                </li>
              )
          )}
        </ul>
        {previousDates.length > previousLimit && <button onClick={showMorePrevious} className={styles.showMore}>Show more ({previousLimit}/{previousDates.length})</button>}
        {previousDates.length > 10 && previousDates.length < previousLimit && <button onClick={collapsePrevious} className={styles.showLess}>Show less</button>}
        </div>)}
    </div>
  )
}