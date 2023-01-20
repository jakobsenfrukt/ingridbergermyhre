import { useState } from 'react'
import Link from 'next/link'
import styles from './projectList.module.scss'
import Image from './Image'
import ProjectItem from './ProjectItem'

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
            <ProjectItem key={project._id} project={project} />
          )
      )}
      {projects.length > limit && <button className={styles.showmore} onClick={increaseLimit}>Load more projects</button>}
     </ul>
    </section>
  )
}