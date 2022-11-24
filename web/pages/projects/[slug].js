import groq from 'groq'
import client from '../../client'
import Link from 'next/link'
import Head from 'next/head'
import Layout, {siteTitle} from '../../components/Layout'

export default function Article ({data}) {
  console.log(data)
  return (
    <Layout>
      <Head>
        <title>{data.title} by {siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="page page--project">
        <h1 className="page__title">{data.title}</h1>
        {/*image && <figure className="page__image">
          <img
            src={urlFor(image)
              .width(1200)
              .url()}
            alt={image.alt}
          />
            </figure>*/}
        <p className="page__meta">{new Date(data.date).toDateString()}</p>
        <p className="lead">{data.intro}</p>
      </section>

      <style jsx>{`
        .page__meta {
          font-size: 0.8rem;
        }
      `}</style>
    </Layout>
  )
}

const query = groq`*[_type == "project" && slug.current == $slug][0]{
  ...
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
