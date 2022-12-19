import styles from './imageGallery.module.scss'
import Image from './Image'

export default function ImageGallery ({ gallery }) {
  return (
    <div className={styles.gallery}>
      <ul>
        {gallery.images.length > 0 && gallery.images.map(
          (image) => (
              <li key={image}>
                <Image image={image} />
              </li>
            )
        )}
      </ul>
    </div>
  )
}