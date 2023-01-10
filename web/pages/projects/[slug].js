import groq from 'groq'
import client from '../../client'
import Link from 'next/link'
import Head from 'next/head'
import Layout, {siteTitle} from '../../components/Layout'
import DateList from '../../components/DateList'
import QuoteList from '../../components/QuoteList'
import Image from '../../components/Image'
import ImageGallery from '../../components/ImageGallery'
import {PortableText} from '@portabletext/react'

export default function Project ({data}) {
  return (
    <Layout palette={data.color.hex} home={data.home}>
      <Head>
        <title>{data.title} by {siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="page page--project">
        <h1 className="project-title">
          <span>{data.title}</span>
          <span className="project-year">{new Date(data.premiereDate).getFullYear()}</span>
        </h1>
        {data.image && <Image image={data.image} />}
        <p className="lead project-lead">{data.intro}</p>
        {data.body && <div className="project-body"><PortableText value={data.body} /></div>}
        {data.credits && <div className="project-credits"><PortableText value={data.credits} /></div>}
        {data.dates && <DateList dates={data.dates} />}
        {data.quotes && <QuoteList quotes={data.quotes} />}
        {data.imageGallery && <ImageGallery gallery={data.imageGallery} />}
      </section>
    </Layout>
  )
}

const query = groq`*[_type == "project" && slug.current == $slug][0]{
  ...,
  'home': *[_type == "home"][0]
}`

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "project" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const data = await client.fetch(query, { slug })
  return {
    props: { data }
  }
}
