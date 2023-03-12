import Link from 'next/link';
import styles from './contact.module.scss';

export default function Contact({ content }) {
  return (
    <section className={styles.contact}>
      <h1>Contact</h1>
      <p>{content.text}</p>
      {content.links && <ul>
        {content.links.length > 0 && content.links.map(
          (link, index) =>
            link.email ? (
              <li key={`link-${index}`}>
                <h2>{link.title}</h2>
                <a href={`mailto:${link.email}`} target="_blank">{link.email}</a>
              </li>
            )
            : (
              <li key={`link-${index}`}>
                <h2>{link.title}</h2>
                <a href={link.url} target="_blank">{link.linkText}</a>
              </li>
            )
        )}
      </ul>
    }
    </section>
  )
}