import Link from 'next/link'
import styles from './header.module.scss'
import { useState } from 'react';
import Logo from './Logo';

export default function Header({}) {
  const [showMenu, setShowMenu] = useState(false);
  function toggleMenu(){
    setShowMenu(!showMenu);
  }
  function closeMenu(){
    setShowMenu(false);
  }

  return (
    <header id="header" className={styles.header}>
      <Link href="/"><a>
        <Logo />
      </a></Link>
      <nav className={styles.siteNav}>
        <button className={styles.toggleMenu} onClick={toggleMenu} data-label="Show menu" data-show={showMenu}>
          <span></span>
        </button>
        <ul className={styles.navLinks} data-show={showMenu}>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}