import groq from 'groq'
import client from '../client'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import Image from '../components/Image'
import QuoteList from '../components/QuoteList'
import {PortableText} from '@portabletext/react'

const About = ({ data }) => {
  return (
    <Layout palette={data.color.hex} home={data.home} projects={data.projects} settings={data.settings}>
      <Head>
        <title>About Ingrid Berger Myhre</title>
        <meta name="description" content={data.intro} />
      </Head>

      <section>
        {data.intro && <p className="lead">
          {data.intro}
        </p>}
        <div className="about-content">
          {data.image && <Image image={data.image} showCredit />}
          <div>{data.body && <PortableText value={data.body} />}</div>
        </div>
        <div className="about-quotes">
          {data.quotes && <QuoteList quotes={data.quotes} />}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.fetch(groq`*[_type == "about"][0] {
    ...,
    'home': *[_type == "home"][0],
    'projects': *[_type == "project" && archive != true] | order(premiereDate desc),
    'settings': *[_type == "settings"][0]{ favicon },
  }`)
  return {
    props: { data }
  }
}

export default About;
