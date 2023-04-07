import styles from './imageGallery.module.scss'
import { useInView } from 'react-intersection-observer'

/* testing */
import Img from 'next/future/image';
import { useNextSanityImage } from 'next-sanity-image';

import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

export default function Image ({ image, showCredit }) {
  const { ref: observer, inView: IsInView } = useInView({ triggerOnce: false })

  /* testing */
  const imageProps = useNextSanityImage(client, image);

  return (
    <figure 
      data-inview={IsInView} 
      className={styles.image} 
    >
      <div className={styles.observer} ref={observer}></div>
      {/*<img
        src={urlFor(image)
          .width(1920)
          .url()}
        alt={image.alt}
        loading="lazy"
        />*/}

      <Img
        {...imageProps}
        alt={image.alt}
      />


      {showCredit && image.credit && <figcaption className={styles.caption}>Photo: {image.credit}</figcaption>}
    </figure>
  )
}