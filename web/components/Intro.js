import Link from 'next/link'
import styles from './intro.module.scss'

export default function Intro ({ text }) {
  return (
    <section className={styles.intro}>
      <p className="lead">{text}</p>
    </section>
  )
}