import { useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.scss';
import Upcoming from './Upcoming';
import Contact from './Contact'
import {PortableText} from '@portabletext/react'
import Newsletter from "./Newsletter";
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export const siteTitle = 'Ingrid Berger Myhre';

export default function Layout({ children, palette, home, projects, settings }) {
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
        {settings?.favicon ? (
          <link rel="icon" href={urlFor(settings.favicon).url()} type="image/svg+xml" />
        ) : (
          <link rel="icon" href="/favicon.ico" />
        )}
        <meta name="description" content={home.intro} />
      </Head>

      <header id="header" className={styles.header}>
        <Link href="/"><a className={styles.logo}><h1><span>Ingrid</span> <span>Berger</span> <span>Myhre</span></h1></a></Link>
        <nav className={styles.siteNav}>
          <button onClick={toggleMenu} data-label="Show menu" data-show={showMenu}>
            <span></span>
          </button>
          <ul data-show={showMenu}>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer id="contact" className={styles.footer}>
        <Newsletter content={settings.newsletter} />
        <Contact content={settings.contact} />
        <div className={styles.upcoming}>
          <Upcoming projects={projects} />
        </div>
      </footer>
    </div>
  );
}