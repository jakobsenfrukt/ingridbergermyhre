import groq from 'groq'
import client from '../../client'
import Link from 'next/link'
import Head from 'next/head'
import Layout, {siteTitle} from '../../components/Layout'
import DateList from '../../components/DateList'
import QuoteList from '../../components/QuoteList'
import Image from '../../components/Image'
import ImageGallery from '../../components/ImageGallery'
import VideoList from '../../components/VideoList'
import AnimatedTitle from '../../components/AnimatedTitle'
import {PortableText} from '@portabletext/react'

export default function Project ({data}) {
  const pageTitle = data.title + " by " + siteTitle
  const photographers = function() {
    let photographerString;
    if (data.image.credit) {
      photographerString = data.image.credit
    }
    if (data.imageGallery) {
      for (let i = 0; i < data.imageGallery.images.length; i++) {
        if (data.imageGallery.images[i].credit && photographerString && !photographerString.includes(data.imageGallery.images[i].credit)) {
          photographerString = photographerString + ", " + data.imageGallery.images[i].credit
        }
      }
    }
    return photographerString
  }

  return (
    <Layout palette={data.color.hex} home={data.home} projects={data.projects}>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={data.intro} />
      </Head>

      <div className="project-hero">
        {data.image && <Image image={data.image} />}
        <h1 className="project-title">
          <AnimatedTitle content={data.title} width={data.font} />
          <span className="project-year">{new Date(data.premiereDate).getFullYear()}</span>
          {data.research && <span className="label label--research">Research</span>}
        </h1>
      </div>
      <section className="page page--project">
        <div className="project-text">
          <p className="lead">{data.intro}</p>
          {data.body && <div className="project-body"><PortableText value={data.body} /></div>}
          {data.credits && <div className="project-credits"><PortableText value={data.credits} /></div>}
        </div>
        <div className="project-videos">
          {data.videos && <VideoList videos={data.videos} />}
        </div>
        <div className="project-dates">
          {data.dates && <DateList dates={data.dates} />}
        </div>
        <div className="project-quotes">
          {data.quotes && <QuoteList quotes={data.quotes} />}
        </div>
        <div className="project-gallery">
          {data.imageGallery && <ImageGallery gallery={data.imageGallery} />}
        </div>
        <div className="project-logos">
          {photographers() && <p className="photographers">Photos by: {photographers()}</p>}
          <ul>
            {data.logos && data.logos.length > 0 && data.logos.map(
              (logo) =>
                logo && (
                  <li key={logo.title}>
                    <Image image={logo} />
                  </li>
                )
            )}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

const query = groq`*[_type == "project" && slug.current == $slug && archive != true][0]{
  ...,
  'home': *[_type == "home"][0],
  'projects': *[_type == "project" && archive != true] | order(premiereDate desc),
}`

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "project" && defined(slug.current) && archive != true][].slug.current`
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
