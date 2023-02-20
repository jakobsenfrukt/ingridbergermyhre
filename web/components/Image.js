import styles from './imageGallery.module.scss'
import { useInView } from 'react-intersection-observer'

import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

export default function Image ({ image, showCredit }) {
  const { ref: observer, inView: IsInView } = useInView({ triggerOnce: false })

  return (
    <figure data-inview={IsInView} className={styles.image}>
      <div className={styles.observer} ref={observer}></div>
      <img
        src={urlFor(image)
          .width(1920)
          .url()}
        alt={image.alt}
      />
      {showCredit && image.credit && <figcaption className={styles.caption}>Photo: {image.credit}</figcaption>}
    </figure>
  )
}