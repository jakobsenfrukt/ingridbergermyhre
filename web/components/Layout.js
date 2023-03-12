import { useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.scss';
import Upcoming from './Upcoming';
import Contact from './Contact'
import {PortableText} from '@portabletext/react'

export const siteTitle = 'Ingrid Berger Myhre';

export default function Layout({ children, palette, home, projects }) {
  const [showMenu, setShowMenu] = useState(false);
  function toggleMenu(){
    setShowMenu(!showMenu);
  }
  function closeMenu(){
    setShowMenu(false);
  }

  return (
    <div id="layout" className={styles.layout} style={{ '--color-palette': palette }}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={home.intro} />
      </Head>

      <header id="header" className={styles.header}>
        <Link href="/" className={styles.logo}><h1><span>Ingrid</span> <span>Berger</span> <span>Myhre</span></h1></Link>
        <nav className={styles.siteNav}>
          <button onClick={toggleMenu} data-label="Show menu" data-show={showMenu}>
            <span></span>
          </button>
          <ul data-show={showMenu}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="#contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer id="contact" className={styles.footer}>
        <Contact content={home.contact} />
        <div className={styles.upcoming}>
          <Upcoming projects={projects} />
        </div>
      </footer>
    </div>
  );
}