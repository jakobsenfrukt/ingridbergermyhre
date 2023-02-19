import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './projectItem.module.scss'
import Image from './Image'
import { useInView } from 'react-intersection-observer'


export default function ProjectList ({ project }) {
  const { ref: observer, inView: ProjectIsInView } = useInView({ triggerOnce: false })

  useEffect(() => {
    if (ProjectIsInView) {
      document.body.style.setProperty('--color-palette', project.color.hex)
    }
  })

  return (
    <li className={styles.project} style={{ '--color-palette': project.color.hex }} data-inview={ProjectIsInView}>
      {project.image && <Image image={project.image} />}
      <h2 className={project.font}>
        <span>{project.title}</span>
        <span className={styles.year}>{new Date(project.premiereDate).getFullYear()}</span>
        {project.research && <span className={styles.research}>Research</span>}
      </h2>
      {project.intro && <p>{project.intro}</p>}
      <div className={styles.observer} ref={observer}></div>
      <Link href="/projects/[slug]" as={`/projects/${project.slug.current}`}>
        <span>More info</span>
      </Link>
    </li>
  )
}