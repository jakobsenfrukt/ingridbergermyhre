//import styles from './image.module.scss'

import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

export default function Image ({ image }) {
  return (
    <figure>
      <img
        src={urlFor(image)
          .width(1920)
          .url()}
        alt={image.alt}
      />
    </figure>
  )
}