import Head from 'next/head';
import styles from './layout.module.scss';
import Upcoming from './Upcoming';
import Contact from './Contact'
import Newsletter from "./Newsletter";
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';
import Header from './Header';
import Cursor from './Cursor';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export const siteTitle = 'Ingrid Berger Myhre';

export default function Layout({ children, palette, home, projects, settings, favicon }) {

  return (
    <div id="layout" className={styles.layout} style={{ '--color-palette': palette }}>
      <Head>
        <title>{siteTitle}</title>
        {favicon ? (
          <link rel="icon" href={urlFor(favicon).url()} type="image/svg+xml" />
        ) : (
          <link rel="icon" href="/favicon.ico" />
        )}
        <meta name="description" content={home.intro} />
      </Head>

      <Header />

      <main className={styles.main}>{children}</main>

      <footer id="contact" className={styles.footer}>
        <Newsletter content={settings.newsletter} />
        <Contact content={settings.contact} />
        <div className={styles.upcoming}>
          <Upcoming projects={projects} />
        </div>
      </footer>

      <Cursor />
    </div>
  );
}