import styles from './newsletter.module.scss';

export default function Newsletter({ content }) {
  return (
    <section className={styles.newsletter}>
      <h1>Newsletter</h1>
      <p>{content.text}</p>
      <a href="https://ingrid-14.kit.com/e4cc6c3349" target="_blank">Sign up to my newsletter <span className={styles.icon}>&rarr;</span></a>
    </section>
  )
}