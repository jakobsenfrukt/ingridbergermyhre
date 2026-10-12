import styles from './logo.module.scss'
import { useState } from 'react';

function Letters({ text }) {
  return text.split(' ').map((word, i) => (
    <span key={i} className={styles.word}>
      {[...word].map((letter, j) => (
        <span
          key={j}
          className={[styles.letter, styles[letter.toLowerCase()]].filter(Boolean).join(' ')}
        >
          {letter}
        </span>
      ))}
    </span>
  ))
}

export default function Logo({ }) {

  return (
    <div className={styles.logo}>
      <h1>
        <div className={styles.ibm}><Letters text="Ingrid Berger Myhre" /></div>
        <div className={styles.ff}><Letters text="Foot Forward" /></div>
      </h1>
    </div>
  )
}
