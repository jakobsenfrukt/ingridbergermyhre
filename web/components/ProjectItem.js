import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './projectItem.module.scss'
import Image from './Image'
import AnimatedTitleSmall from './AnimatedTitleSmall'
import { useInView } from 'react-intersection-observer'


export default function ProjectList ({ project }) {
  const { ref: observer, inView: ProjectIsInView } = useInView({ triggerOnce: false })
  const { ref: gradientObserver, inView: ProjectGradientIsInView } = useInView({ triggerOnce: false })

  useEffect(() => {
    if (ProjectGradientIsInView) {
      document.body.style.setProperty('--color-palette', project.color.hex)
      //document.getElementById('header').style.setProperty('background-color', project.color.hex)
    }
  })

  return (
    <li className={`${styles.project} ${styles[project.font]}`} style={{ '--color-palette': project.color.hex }} data-inview={ProjectIsInView}>
      {project.image && <Image image={project.image} />}
      <h2 className={project.font}>
        <AnimatedTitleSmall content={project.title} width={project.font} />
        <span className={styles.year}>{new Date(project.premiereDate).getFullYear()}</span>
        {project.research && <span className={styles.research}>Research</span>}
      </h2>
      {project.intro && <p>{project.intro}</p>}
      <div className={styles.observer} ref={observer}></div>
      <div className={styles.gradientObserver} ref={gradientObserver}></div>
      <Link href="/projects/[slug]" as={`/projects/${project.slug.current}`}>
        <span>More info</span>
      </Link>
    </li>
  )
}