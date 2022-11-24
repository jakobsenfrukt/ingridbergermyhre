import { useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.scss';

export const siteTitle = 'Ingrid Berger Myhre';

export default function Layout({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  function toggleMenu(){
    setShowMenu(!showMenu);
  }

  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>

      <header className={styles.header}>
        <Link href="/" className={styles.logo}><h1>{siteTitle}</h1></Link>
        <nav>
          <button onClick={toggleMenu} data-label="Show menu">
            {showMenu ? (<span>&times;</span>) : (<span>=</span>)}
          </button>
          <ul data-show={showMenu}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        This is a footer<br />
        with some contact info<br />
        or something like that
      </footer>
    </div>
  );
}