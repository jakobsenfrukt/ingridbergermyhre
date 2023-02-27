import groq from 'groq'
import client from '../client'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import Image from '../components/Image'
import {PortableText} from '@portabletext/react'

const About = ({ data }) => {
  return (
    <Layout home={data.home} projects={data.projects}>
      <Head>
        <title>About Ingrid Berger Myhre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        {data.intro && <p className="lead">
          {data.intro}
        </p>}
        <div className="about-content">
          {data.image && <Image image={data.image} showCredit />}
          <div>{data.body && <PortableText value={data.body} />}</div>
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
  }`)
  return {
    props: { data }
  }
}

export default About;
