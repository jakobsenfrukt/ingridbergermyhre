import styles from './videoList.module.scss'

export default function VideoList ({ videos }) {
  return (
    <div className={styles.videos}>
      <h2>Videos</h2>
      <ul>
        {videos.length > 0 && videos.map(
          (video, index) => (
              <li key={`video-${index}`} className={styles.video}>
                <h3>{video.title}</h3>
                {video.description && <p>{video.description}</p>}
                <a href={video.url}>
                  <span>Watch {video.title}</span>
                </a>
              </li>
            )
        )}
      </ul>
    </div>
  )
}