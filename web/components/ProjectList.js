import { useState } from 'react'
import Link from 'next/link'
import styles from './projectList.module.scss'
import Image from './Image'

export default function ProjectList ({ projects }) {
  const [limit, setLimit] = useState(10);
  function increaseLimit(){
    setLimit(limit + 10);
  }
  return (
    <section className={styles.projects}>
      <ul>
      {projects.length > 0 && projects.slice(0, limit).map(
        (project) =>
          project.slug && (
            <li key={project._id}>
              {project.image && <Image image={project.image} />}
              <div className={styles.text}>
                <h2>{project.title}</h2>
                {project.intro && <p>{project.intro}</p>}
                <Link href="/projects/[slug]" as={`/projects/${project.slug.current}`}>
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