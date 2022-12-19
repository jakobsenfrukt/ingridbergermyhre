import groq from 'groq'
import client from '../client'
import Head from 'next/head'
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';

const About = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>{data.title} {siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        {data.intro && <p className="lead">
          {data.intro}
        </p>}


<svg viewBox="0 0 700 700" width="700" height="700" opacity="1"><defs><linearGradient gradientTransform="rotate(129, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="hsl(19, 76%, 61%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(290, 56%, 81%)" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.005 0.005" numOctaves="1" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feGaussianBlur stdDeviation="75 100" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
  <feBlend mode="overlay" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
</filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.fetch(groq`*[_type == "about"][0]`)
  return {
    props: { data }
  }
}

export default About;
