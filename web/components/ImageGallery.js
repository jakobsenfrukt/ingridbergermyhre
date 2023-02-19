import styles from './imageGallery.module.scss'
import Image from './Image'

export default function ImageGallery ({ gallery }) {
  return (
    <div className={styles.gallery}>
      <ul>
        {gallery.images.length > 0 && gallery.images.map(
          (image, index) => (
              <li key={`image-${index}`} className={styles[image.width]}>
                <Image image={image} showCredit />
              </li>
            )
        )}
      </ul>
    </div>
  )
}