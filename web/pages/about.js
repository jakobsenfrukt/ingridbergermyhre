import groq from 'groq'
import client from '../client'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import {PortableText} from '@portabletext/react'

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
        {data.body && <PortableText value={data.body} />}
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
