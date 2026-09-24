import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './projectItem.module.scss'
import Image from './Image'
import AnimatedTitleSmall from './AnimatedTitleSmall'
import { useInView } from 'react-intersection-observer'


export default function ProjectItem ({ project, small }) {
  const { ref: observer, inView: ProjectIsInView } = useInView({ triggerOnce: false })
  const { ref: gradientObserver, inView: ProjectGradientIsInView } = useInView({ triggerOnce: false })

  useEffect(() => {
    if (ProjectGradientIsInView) {
      document.getElementById("layout").style.setProperty('--color-palette', project.color.hex)
    }
  })

  return (
    <li className={`projectItem ${styles.project} ${styles[project.font]}`} style={{ '--color-palette': project.color.hex }} data-small={small} data-inview={ProjectIsInView}>
      <div className={styles.image}>
        {project.image && <Image image={project.image} />}
      </div>
      <h2 className={project.font}>
        <AnimatedTitleSmall content={project.title} width={project.font} />
        <span className={styles.year}>{new Date(project.premiereDate).getFullYear()}</span>
        {project.research && <span className={styles.research}>Research</span>}
      </h2>
      {project.intro && <p>{project.intro}</p>}
      <div className={styles.observer} ref={observer}></div>
      <div className={styles.gradientObserver} ref={gradientObserver}></div>
      <Link href="/projects/[slug]" as={`/projects/${project.slug.current}`}>
        <a aria-label={"More info about " + project.title}></a>
      </Link>
    </li>
  )
}