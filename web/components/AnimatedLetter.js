import styles from './animatedLetter.module.scss'

export default function AnimatedLetter ({ letter, width, inview }) {
  return (
    <span className="animatedLetter" data-inview={inview}>{letter}</span>
  )
}