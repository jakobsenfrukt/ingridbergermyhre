import styles from './imageGallery.module.scss'

import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

export default function Image ({ image, showCredit }) {
  return (
    <figure>
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