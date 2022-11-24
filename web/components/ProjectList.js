import { useState } from 'react'
import Link from 'next/link'
import styles from './projectList.module.scss'

export default function ProjectList ({ projects }) {
  const [limit, setLimit] = useState(10);
  function increaseLimit(){
    setLimit(limit + 10);
  }
  return (
    <section className={styles.projects}>
      <ul>
      {projects.length > 0 && projects.slice(0, limit).map(
        ({ _id, title = '', slug = '', date = '', intro, image }) =>
          slug && (
            <li key={_id}>
              {/*image && <figure className={styles.thumb}>
                <img
                  src={urlFor(image)
                    .width(400)
                    .height(400)
                    .url()}
                  alt={image.alt}
                />
                  </figure>*/}
              <div>
                <p className="date">{new Date(date).toDateString()}</p>
                <h2>{title}</h2>
                {intro && <p>{intro}</p>}
                <Link href="/projects/[slug]" as={`/projects/${slug.current}`}>
                  <span>More info</span>
                </Link>
              </div>
            </li>
          )
      )}
      {projects.length > limit && <button className={styles.showmore} onClick={increaseLimit}>Load more projects</button>}
     </ul>
    </section>
  )
}